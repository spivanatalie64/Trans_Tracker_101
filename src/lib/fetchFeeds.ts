import Parser from 'rss-parser';
import { sources, RssSource } from '@/config/sources';

export interface FeedItem {
  id: string;
  title: string;
  link: string;
  pubDate: string;
  isoDate?: string;
  source: RssSource;
  snippet?: string;
}

const parser = new Parser({
  customFields: {
    item: ['description', 'summary', 'content:encoded', 'content'],
  },
});

export async function fetchAllFeeds(): Promise<FeedItem[]> {
  const allItems: FeedItem[] = [];

  // Fetch all feeds in parallel with strict caching and timeouts
  const fetchPromises = sources.map(async (source) => {
    try {
      // 1. Set a strict 8-second timeout so a slow news site doesn't bottleneck our app
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);

      // 2. Use Next.js native fetch for aggressive data caching
      const response = await fetch(source.url, {
        signal: controller.signal,
        next: { revalidate: 3600 }, // Cache this specific fetch for 1 hour
        headers: {
          'User-Agent': 'TransTracker101/1.0',
          'Accept': 'application/rss+xml, application/xml, text/xml',
        }
      });
      
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // 3. Parse the cached XML text
      const xmlData = await response.text();
      const feed = await parser.parseString(xmlData);
      
      // 4. Extract only the 5 newest items per feed to save memory
      const items = feed.items.slice(0, 5).map((item) => {
        let rawSnippet = item.summary || item.description || item['content:encoded'] || item.content || '';
        let cleanSnippet = rawSnippet.replace(/<\/?[^>]+(>|$)/g, '').trim();
        cleanSnippet = cleanSnippet.replace(/&nbsp;/g, ' ').replace(/&#8217;/g, "'").replace(/&#8220;/g, '"').replace(/&#8221;/g, '"');
        
        if (cleanSnippet.length > 200) {
          cleanSnippet = cleanSnippet.substring(0, 200) + '...';
        }

        return {
          id: `${source.id}-${item.guid || item.link || Math.random().toString()}`,
          title: item.title || 'Untitled',
          link: item.link || source.website,
          pubDate: item.pubDate || new Date().toISOString(),
          isoDate: item.isoDate || new Date(item.pubDate || Date.now()).toISOString(),
          source: source,
          snippet: cleanSnippet,
        };
      });

      return items;
    } catch (error) {
      // Silently fail for individual feeds so the rest of the site stays fast and up
      // console.error(`Skipping ${source.name} due to timeout/error`);
      return [];
    }
  });

  const results = await Promise.all(fetchPromises);
  
  // Flatten array of arrays
  results.forEach(items => allItems.push(...items));

  // Sort by date descending (newest first)
  const sortedItems = allItems.sort((a, b) => {
    const dateA = new Date(a.isoDate || a.pubDate).getTime();
    const dateB = new Date(b.isoDate || b.pubDate).getTime();
    return dateB - dateA;
  });

  // 5. MAXIMUM PERFORMANCE: Only return the absolute top 60 newest articles to the browser.
  // Sending 700+ articles to the DOM would freeze the browser. 60 guarantees instant Time-To-Interactive.
  return sortedItems.slice(0, 60);
}

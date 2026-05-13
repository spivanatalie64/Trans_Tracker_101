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
      
      // Keywords to strictly filter for Transgender / LGBTQ+ legislation and news
      const transKeywords = /\b(trans|transgender|transsexual|transphobi[ca]|gender|gender-affirming|gender-fluid|non-binary|nonbinary|enby|pronouns|drag ban|drag queen|drag performers|lgbt|lgbtq|lgbtqia|queer|sex characteristics)\b/i;

      // 4. Extract, normalize, and STRICTLY FILTER items
      const items = feed.items
        .map((item) => {
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
        })
        .filter((item) => {
          // If the source is exclusively a trans-focused source (like Erin In The Morning), keep everything.
          // Otherwise, strictly check the title and snippet against our regex.
          if (source.id === 'erininthemorn' || source.id === 'assignedmedia' || source.id === 'tlc' || source.id === 'a4te') {
            return true;
          }
          return transKeywords.test(item.title) || transKeywords.test(item.snippet || '');
        })
        // No limit per feed — return all filtered matches

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

  return sortedItems;
}

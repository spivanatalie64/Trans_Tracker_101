import { Readability } from '@mozilla/readability';
import { JSDOM } from 'jsdom';
import DOMPurify from 'isomorphic-dompurify';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, AlertTriangle } from 'lucide-react';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

async function fetchAndParseArticle(url: string) {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
      },
      // 10-second timeout for fetching the article
      signal: AbortSignal.timeout(10000)
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status}`);
    }

    const html = await response.text();
    
    // Parse the HTML using JSDOM
    const doc = new JSDOM(html, { url });
    
    // Use Mozilla's Readability library to strip out all ads, popups, sidebars, and navs
    const reader = new Readability(doc.window.document);
    const article = reader.parse();

    if (!article) {
      throw new Error('Readability failed to parse the article');
    }

    // Sanitize the HTML strictly to prevent any scripts/XSS from running
    const cleanHtml = DOMPurify.sanitize(article.content || '', {
      USE_PROFILES: { html: true },
      FORBID_TAGS: ['script', 'iframe', 'style', 'object', 'embed'],
      FORBID_ATTR: ['style', 'class']
    });

    return {
      title: article.title,
      byline: article.byline,
      content: cleanHtml,
      siteName: article.siteName,
      excerpt: article.excerpt,
    };
  } catch (error) {
    console.error('Error in Reader View:', error);
    return null;
  }
}

export default async function ReadPage({
  searchParams,
}: {
  searchParams: Promise<{ url?: string }>
}) {
  const { url } = await searchParams;

  if (!url) {
    notFound();
  }

  const decodedUrl = decodeURIComponent(url);
  const article = await fetchAndParseArticle(decodedUrl);

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20">
      {/* Reader Nav Header */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-10 shadow-sm">
        <div className="max-w-3xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Feed
          </Link>
          <a 
            href={decodedUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
            title="Open original article"
          >
            Original <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </header>

      {/* Reader Content */}
      <article className="max-w-3xl mx-auto px-4 py-8 sm:py-12">
        {!article ? (
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-6 text-center">
            <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Could not load Reader View</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Some websites heavily restrict automated fetching to enforce paywalls or prevent ad-blockers. 
            </p>
            <a 
              href={decodedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-full shadow-sm transition-colors"
            >
              Read Original Article <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        ) : (
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 sm:p-10">
            <header className="mb-8 border-b border-slate-100 dark:border-slate-800 pb-8">
              <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white leading-tight mb-4">
                {article.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                {article.siteName && (
                  <span className="font-semibold text-indigo-600 dark:text-indigo-400">{article.siteName}</span>
                )}
                {article.byline && (
                  <span>By {article.byline.trim()}</span>
                )}
              </div>
            </header>

            {/* Prose Content Container */}
            <div 
              className="prose prose-slate dark:prose-invert max-w-none prose-lg
                         prose-a:text-indigo-600 dark:prose-a:text-indigo-400 prose-a:no-underline hover:prose-a:underline
                         prose-img:rounded-xl prose-img:shadow-sm"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </div>
        )}
      </article>
    </main>
  );
}

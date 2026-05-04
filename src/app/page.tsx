import { fetchAllFeeds } from '@/lib/fetchFeeds';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { ExternalLink, ShieldAlert, Newspaper, Scale, Landmark } from 'lucide-react';
import { SourceCategory } from '@/config/sources';
import { Sprungles } from '@/components/Sprungles';

// Define how often this page should re-fetch RSS feeds in the background (in seconds)
export const revalidate = 3600; // Every 1 hour

function getCategoryIcon(category: SourceCategory) {
  switch (category) {
    case 'LGBTQ+ News':
      return <Newspaper className="w-4 h-4" />;
    case 'Legal & Advocacy':
      return <Scale className="w-4 h-4" />;
    case 'State Independent News':
      return <Landmark className="w-4 h-4" />;
    case 'General Politics':
      return <ShieldAlert className="w-4 h-4" />;
  }
}

function getCategoryColor(category: SourceCategory) {
  switch (category) {
    case 'LGBTQ+ News':
      return 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300 border-pink-200 dark:border-pink-800';
    case 'Legal & Advocacy':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200 dark:border-blue-800';
    case 'State Independent News':
      return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 border-amber-200 dark:border-amber-800';
    case 'General Politics':
      return 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700';
  }
}

export default async function Home() {
  const allNews = await fetchAllFeeds();

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Header */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">Trans_Tracker_101</h1>
          </div>
          <nav>
            <Link href="/sources" className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">
              View Sources
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <div className="mb-8">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">Latest Updates</h2>
          <p className="mt-2 text-lg text-slate-600 dark:text-slate-400">Tracking legislation, civil rights battles, and news across {allNews.length} recent articles.</p>
        </div>

        {/* Masonry-style Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allNews.map((item) => (
            <article 
              key={item.id} 
              className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-md transition-shadow flex flex-col"
            >
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${getCategoryColor(item.source.category)}`}>
                    {getCategoryIcon(item.source.category)}
                    {item.source.category}
                  </span>
                  <time className="text-xs text-slate-500 dark:text-slate-400">
                    {formatDistanceToNow(new Date(item.isoDate || item.pubDate), { addSuffix: true })}
                  </time>
                </div>
                
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2 leading-tight">
                  <Link href={`/read?url=${encodeURIComponent(item.link)}`} className="hover:text-indigo-600 dark:hover:text-indigo-400">
                    {item.title}
                  </Link>
                </h3>
                
                {item.snippet && (
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-3 flex-1">
                    {item.snippet}
                  </p>
                )}
                
                <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <a 
                    href={item.source.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-medium text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                  >
                    {item.source.name}
                  </a>
                  <Link 
                    href={`/read?url=${encodeURIComponent(item.link)}`}
                    className="inline-flex items-center gap-1 text-xs font-medium text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 bg-indigo-50 dark:bg-indigo-900/30 px-3 py-1.5 rounded-full"
                  >
                    Read Clean <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
        
        {allNews.length === 0 && (
          <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
            <Newspaper className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900 dark:text-white">No updates found</h3>
            <p className="text-slate-500">We couldn't fetch the latest news feeds right now.</p>
          </div>
        )}

      </div>

      <Sprungles />
    </main>
  );
}

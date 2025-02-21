"use client"

import Link from 'next/link';
import { useState, useEffect } from 'react';

interface Article {
  id: string;
  title: string;
  author: string;
  summary: string;
  engagement: {
    views: number;
    comments: number;
    credibility: number;
    shares?: number;
  };
  timestamp: string;
  tags: string[];
  type?: 'investigation' | 'opinion' | 'report';
  fullContent?: string;
}

export function MainFeed() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [opinions, setOpinions] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch('/api/articles');
        if (!response.ok) throw new Error('Failed to fetch content');
        const data = await response.json();
        setArticles(data.articles);
        setOpinions(data.opinions);
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load content');
        setIsLoading(false);
      }
    };

    fetchContent();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-ink-gray dark:text-paper-gray">Loading content...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-editorial-red">{error}</div>
      </div>
    );
  }

  if (!articles.length && !opinions.length) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-ink-gray dark:text-paper-gray">No content found</div>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* News Section */}
      <div className="newspaper-grid">
        <div className="col-span-12">
          <div className="flex justify-between items-center border-b-3 border-ink-blue dark:border-paper-white pb-4 mb-8">
            <h2 className="font-playfair text-3xl font-bold">Titelseite</h2>
            <div className="flex space-x-2">
              <button className="px-4 py-2 border-2 border-ink-blue dark:border-paper-white font-source-serif text-sm uppercase tracking-wider hover:bg-ink-blue hover:text-paper-white dark:hover:bg-paper-white dark:hover:text-ink-blue transition-colors">
                Neueste
              </button>
              <button className="px-4 py-2 border-2 border-ink-blue dark:border-paper-white font-source-serif text-sm uppercase tracking-wider hover:bg-ink-blue hover:text-paper-white dark:hover:bg-paper-white dark:hover:text-ink-blue transition-colors">
                Trending
              </button>
              <button className="px-4 py-2 border-2 border-ink-blue dark:border-paper-white font-source-serif text-sm uppercase tracking-wider hover:bg-ink-blue hover:text-paper-white dark:hover:bg-paper-white dark:hover:text-ink-blue transition-colors">
                Verifiziert
              </button>
            </div>
          </div>
        </div>

        {/* Main Articles Column */}
        <div className="col-span-12 md:col-span-8 space-y-8">
          {articles.slice(0, 2).map((article) => (
            <article key={article.id} className="article-card p-8">
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <Link
                      href={`/journalist/${article.author.toLowerCase().replace(' ', '-')}`}
                      className="byline hover:text-editorial-red"
                    >
                      {article.author}
                    </Link>
                    <span className="text-ink-gray dark:text-paper-gray">•</span>
                    <time className="text-sm text-ink-gray dark:text-paper-gray">
                      {article.timestamp}
                    </time>
                  </div>
                  <span className={`px-3 py-1 text-xs border-2 ${
                    article.type === 'investigation'
                      ? 'border-editorial-red text-editorial-red'
                      : article.type === 'opinion'
                      ? 'border-highlight-yellow text-ink-gray'
                      : 'border-ink-gray text-ink-gray'
                  } uppercase tracking-wider`}>
                    {article.type}
                  </span>
                </div>
                
                <Link href={`/article/${article.id}`}>
                  <h3 className="headline hover:text-editorial-red transition-colors">
                    {article.title}
                  </h3>
                </Link>
                
                <div className="newspaper-column">
                  <p className="subheadline mb-6">
                    {article.summary}
                  </p>
                  <div className="prose dark:prose-invert">
                    {article.fullContent?.split('\n\n').slice(0, 3).map((paragraph, index) => (
                      <p key={index} className={index === 0 ? 'drop-cap' : ''}>
                        {paragraph}
                      </p>
                    ))}
                    <Link 
                      href={`/article/${article.id}`}
                      className="inline-block mt-4 text-editorial-red hover:text-editorial-red/90"
                    >
                      Weiterlesen →
                    </Link>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-paper-gray dark:border-ink-gray">
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map((tag) => (
                      <Link
                        key={tag}
                        href={`/topic/${tag.toLowerCase()}`}
                        className="text-xs px-3 py-1 border border-ink-gray dark:border-paper-gray font-source-serif uppercase tracking-wider hover:bg-ink-blue hover:text-paper-white dark:hover:bg-paper-white dark:hover:text-ink-blue transition-colors"
                      >
                        {tag}
                      </Link>
                    ))}
                  </div>

                  <div className="flex items-center space-x-6 text-sm text-ink-gray dark:text-paper-gray">
                    <div className="flex items-center">
                      <span className="text-editorial-red font-medium">
                        {article.engagement.credibility}%
                      </span>
                      <span className="ml-1">verifiziert</span>
                    </div>
                    <span>{article.engagement.views.toLocaleString()} Leser</span>
                    <span>{article.engagement.comments} Kommentare</span>
                    {article.engagement.shares && (
                      <span>{article.engagement.shares} Shares</span>
                    )}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Secondary Articles */}
        <div className="col-span-12 md:col-span-4 space-y-8">
          {articles.slice(2).map((article) => (
            <article
              key={article.id}
              className="article-card p-6"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Link
                      href={`/journalist/${article.author.toLowerCase().replace(' ', '-')}`}
                      className="byline hover:text-editorial-red"
                    >
                      {article.author}
                    </Link>
                    <span className="text-ink-gray dark:text-paper-gray">•</span>
                    <time className="text-sm text-ink-gray dark:text-paper-gray">
                      {article.timestamp}
                    </time>
                  </div>
                  <span className={`px-2 py-0.5 text-xs border ${
                    article.type === 'investigation'
                      ? 'border-editorial-red text-editorial-red'
                      : article.type === 'opinion'
                      ? 'border-highlight-yellow text-ink-gray'
                      : 'border-ink-gray text-ink-gray'
                  } uppercase tracking-wider`}>
                    {article.type}
                  </span>
                </div>
                
                <Link href={`/article/${article.id}`}>
                  <h3 className="font-playfair text-xl font-bold hover:text-editorial-red transition-colors">
                    {article.title}
                  </h3>
                </Link>
                
                <p className="text-ink-gray dark:text-paper-gray">
                  {article.summary}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-paper-gray dark:border-ink-gray">
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map((tag) => (
                      <Link
                        key={tag}
                        href={`/topic/${tag.toLowerCase()}`}
                        className="text-xs px-2 py-0.5 border border-ink-gray dark:border-paper-gray font-source-serif uppercase tracking-wider hover:bg-ink-blue hover:text-paper-white dark:hover:bg-paper-white dark:hover:text-ink-blue transition-colors"
                      >
                        {tag}
                      </Link>
                    ))}
                  </div>

                  <div className="text-sm text-editorial-red font-medium">
                    {article.engagement.credibility}%
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Opinions Section */}
      <div className="newspaper-grid">
        <div className="col-span-12">
          <div className="flex justify-between items-center border-b-3 border-ink-blue dark:border-paper-white pb-4 mb-8">
            <h2 className="font-playfair text-3xl font-bold">Meinungen</h2>
            <Link
              href="/opinions"
              className="px-4 py-2 border-2 border-ink-blue dark:border-paper-white font-source-serif text-sm uppercase tracking-wider hover:bg-ink-blue hover:text-paper-white dark:hover:bg-paper-white dark:hover:text-ink-blue transition-colors"
            >
              Alle Meinungen
            </Link>
          </div>
        </div>

        <div className="col-span-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {opinions.slice(0, 6).map((opinion) => (
            <article
              key={opinion.id}
              className="article-card p-6"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Link
                    href={`/journalist/${opinion.author.toLowerCase().replace(' ', '-')}`}
                    className="byline hover:text-editorial-red"
                  >
                    {opinion.author}
                  </Link>
                  <time className="text-sm text-ink-gray dark:text-paper-gray">
                    {opinion.timestamp}
                  </time>
                </div>
                
                <Link href={`/article/${opinion.id}`}>
                  <h3 className="font-playfair text-xl font-bold hover:text-editorial-red transition-colors">
                    {opinion.title}
                  </h3>
                </Link>

                <div className="flex items-center justify-between pt-4 border-t border-paper-gray dark:border-ink-gray">
                  <div className="flex items-center space-x-4 text-sm text-ink-gray dark:text-paper-gray">
                    <span>{opinion.engagement.comments} Kommentare</span>
                  </div>
                  <div className="text-sm text-editorial-red font-medium">
                    {opinion.engagement.credibility}%
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
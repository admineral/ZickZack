// HoverCard.js
import React from 'react';
import Link from 'next/link';

export default function HoverCard({ orb }) {
  return (
    <div 
      className="absolute p-6 bg-paper-white dark:bg-ink-blue border-2 border-ink-blue dark:border-paper-white rounded-none shadow-2xl text-ink-blue dark:text-paper-white article-card"
      style={{ 
        zIndex: 999999,
        width: '400px',
        right: '-420px',
        top: '50%',
        transform: 'translateY(-50%)',
        position: 'absolute',
        pointerEvents: 'all'
      }}
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link
              href={`/journalist/${orb.author?.toLowerCase().replace(' ', '-')}`}
              className="byline hover:text-editorial-red"
            >
              {orb.author}
            </Link>
            <span className="text-ink-gray dark:text-paper-gray">•</span>
            <time className="text-sm text-ink-gray dark:text-paper-gray">
              {orb.timestamp}
            </time>
          </div>
          {orb.type && (
            <span className={`px-3 py-1 text-xs border-2 ${
              orb.type === 'investigation'
                ? 'border-editorial-red text-editorial-red'
                : orb.type === 'opinion'
                ? 'border-highlight-yellow text-ink-gray'
                : 'border-ink-gray text-ink-gray'
            } uppercase tracking-wider`}>
              {orb.type}
            </span>
          )}
        </div>

        <Link href={`/article/${orb.id}`}>
          <h3 className="font-playfair text-2xl font-bold leading-tight hover:text-editorial-red transition-colors">
            {orb.headline}
          </h3>
        </Link>

        {orb.summary && (
          <p className="text-ink-gray dark:text-paper-gray font-source-serif">
            {orb.summary}
          </p>
        )}

        <div className="flex items-center justify-between pt-4 border-t border-paper-gray dark:border-ink-gray">
          <div className="flex flex-wrap gap-2">
            {orb.tags?.map((tag) => (
              <Link
                key={tag}
                href={`/topic/${tag.toLowerCase()}`}
                className="text-xs px-3 py-1 border border-ink-gray dark:border-paper-gray font-source-serif uppercase tracking-wider hover:bg-ink-blue hover:text-paper-white dark:hover:bg-paper-white dark:hover:text-ink-blue transition-colors"
              >
                {tag}
              </Link>
            ))}
          </div>

          {orb.engagement && (
            <div className="flex items-center space-x-4 text-sm text-ink-gray dark:text-paper-gray">
              <div className="flex items-center">
                <span className="text-editorial-red font-medium">
                  {orb.engagement.credibility}%
                </span>
                <span className="ml-1">verifiziert</span>
              </div>
              {orb.engagement.views && (
                <span>{orb.engagement.views.toLocaleString()} Leser</span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
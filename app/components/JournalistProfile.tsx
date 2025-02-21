'use client';

import React from 'react';
import Link from 'next/link';

interface JournalistStats {
  totalArticles: number;
  totalViews: number;
  avgCredibility: number;
  followers: number;
  investigations: number;
}

interface Article {
  id: string;
  title: string;
  summary: string;
  timestamp: string;
  engagement: {
    views: number;
    comments: number;
    credibility: number;
  };
  tags: string[];
}

interface JournalistProfileProps {
  name: string;
  bio: string;
  stats: JournalistStats;
  recentArticles: Article[];
  specialties: string[];
}

export function JournalistProfile({
  name,
  bio,
  stats,
  recentArticles,
  specialties,
}: JournalistProfileProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Profile Info */}
        <div className="md:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center text-4xl mb-4">
                {name[0]}
              </div>
              <h1 className="text-2xl font-bold mb-2">{name}</h1>
              <p className="text-gray-600 dark:text-gray-400 text-center mb-6">
                {bio}
              </p>
              <button className="w-full bg-blue-500 text-white rounded-lg py-2 px-4 hover:bg-blue-600">
                Follow Journalist
              </button>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">Expertise</h3>
              <div className="flex flex-wrap gap-2">
                {specialties.map((specialty) => (
                  <span
                    key={specialty}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm mt-6">
            <h3 className="text-lg font-semibold mb-4">Statistics</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Average Credibility</span>
                  <span className="text-green-500">{stats.avgCredibility}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-500"
                    style={{ width: `${stats.avgCredibility}%` }}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="text-2xl font-bold">{stats.totalArticles}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Articles</div>
                </div>
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="text-2xl font-bold">{stats.investigations}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Investigations</div>
                </div>
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="text-2xl font-bold">{stats.followers.toLocaleString()}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Followers</div>
                </div>
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="text-2xl font-bold">{(stats.totalViews / 1000).toFixed(1)}K</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Total Views</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Articles Feed */}
        <div className="md:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-6">Recent Articles</h2>
            <div className="space-y-6">
              {recentArticles.map((article) => (
                <article
                  key={article.id}
                  className="border-b border-gray-200 dark:border-gray-700 last:border-0 pb-6 last:pb-0"
                >
                  <Link href={`/article/${article.id}`}>
                    <h3 className="text-lg font-semibold mb-2 hover:text-blue-600 dark:hover:text-blue-400">
                      {article.title}
                    </h3>
                  </Link>
                  <p className="text-gray-600 dark:text-gray-400 mb-3">
                    {article.summary}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <time>{article.timestamp}</time>
                      <span>•</span>
                      <span>{article.engagement.views.toLocaleString()} views</span>
                      <span>•</span>
                      <span className="text-green-500">{article.engagement.credibility}% credibility</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {article.tags.map((tag) => (
                        <Link
                          key={tag}
                          href={`/topic/${tag.toLowerCase()}`}
                          className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600"
                        >
                          #{tag}
                        </Link>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
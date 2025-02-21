'use client';

import * as React from 'react';
import Link from 'next/link';
import { CommentSection } from './CommentSection';
import { ArticleToolbar } from './ArticleToolbar';
import { ReadingProgress } from './ReadingProgress';

interface Comment {
  id: string;
  author: {
    name: string;
    credibility: number;
    isVerified: boolean;
  };
  content: string;
  timestamp: string;
  upvotes: number;
  downvotes: number;
  replies: Comment[];
}

interface ArticleViewProps {
  article: {
    id: string;
    title: string;
    author: string;
    content: string;
    summary: string;
    engagement: {
      views: number;
      comments: number;
      credibility: number;
      shares: number;
    };
    timestamp: string;
    tags: string[];
    sources: string[];
    comments: Comment[];
  };
}

export function ArticleView({ article }: ArticleViewProps) {
  const [activeTab, setActiveTab] = React.useState<'article' | 'discussion' | 'sources'>('article');
  const [showMetrics] = React.useState(true);
  const [isBookmarked, setIsBookmarked] = React.useState(false);
  const [isFollowing, setIsFollowing] = React.useState(false);

  // Extract table of contents from article content
  const tableOfContents = [
    { id: 'introduction', title: 'Einleitung', level: 1 },
    { id: 'investigation', title: 'Die Untersuchung', level: 1 },
    { id: 'facts', title: 'Die Fakten', level: 1 },
  ];

  // Estimate reading time (rough calculation: 200 words per minute)
  const wordCount = article.content.split(/\s+/).length;
  const estimatedReadingTime = Math.ceil(wordCount / 200);

  const handleBookmark = React.useCallback(() => {
    setIsBookmarked(!isBookmarked);
    // TODO: Implement bookmark functionality
  }, [isBookmarked]);

  const handleShare = React.useCallback(() => {
    const shareData = {
      title: article.title,
      text: article.summary,
      url: window.location.href
    };

    if (navigator.share && navigator.canShare(shareData)) {
      navigator.share(shareData).catch((error) => console.log('Error sharing:', error));
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(window.location.href)
        .then(() => alert('Link copied to clipboard!'))
        .catch((error) => console.log('Error copying to clipboard:', error));
    }
  }, [article.title, article.summary]);

  const handleFollow = React.useCallback(() => {
    setIsFollowing(!isFollowing);
    // TODO: Implement follow functionality
  }, [isFollowing]);

  const handleReport = React.useCallback(() => {
    // TODO: Implement report functionality
  }, []);

  const renderTags = () => article.tags.map(tag => 
    React.createElement(Link, {
      key: tag,
      href: `/topic/${tag.toLowerCase()}`,
      className: 'text-xs px-2 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full hover:bg-blue-100 dark:hover:bg-blue-800/30'
    }, `#${tag}`)
  );

  const renderMetrics = () => React.createElement('div', { className: 'w-64 shrink-0' },
    React.createElement('div', { className: 'sticky top-24 space-y-6' },
      React.createElement('div', { className: 'bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm' },
        [
          React.createElement('h3', { key: 'title', className: 'text-lg font-semibold mb-4' }, 'Article Metrics'),
          React.createElement('div', { key: 'metrics', className: 'space-y-4' }, [
            React.createElement('div', { key: 'credibility' }, [
              React.createElement('div', { key: 'credibility-header', className: 'flex justify-between text-sm mb-1' }, [
                React.createElement('span', { key: 'label' }, 'Credibility Score'),
                React.createElement('span', { key: 'value', className: 'text-green-500' }, `${article.engagement.credibility}%`)
              ]),
              React.createElement('div', { key: 'credibility-bar', className: 'h-2 bg-gray-200 rounded-full overflow-hidden' },
                React.createElement('div', {
                  key: 'credibility-progress',
                  className: 'h-full bg-green-500',
                  style: { width: `${article.engagement.credibility}%` }
                })
              )
            ])
          ])
        ]
      )
    )
  );

  const mainContent = [
    React.createElement('div', {
      key: 'header',
      className: 'border-b border-gray-200 dark:border-gray-700 pb-6 mb-6'
    }, [
      React.createElement('h1', { key: 'title', className: 'text-4xl font-bold mb-4' }, article.title),
      React.createElement('div', { key: 'tags', className: 'flex items-center gap-2 mb-2' }, renderTags()),
      React.createElement('div', {
        key: 'meta',
        className: 'flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400'
      }, [
        React.createElement(Link, {
          key: 'author',
          href: `/journalist/${article.author.toLowerCase().replace(' ', '-')}`,
          className: 'flex items-center gap-2 font-medium hover:text-gray-900 dark:hover:text-white'
        }, [
          React.createElement('div', {
            key: 'avatar',
            className: 'w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center'
          }, article.author[0]),
          React.createElement('span', { key: 'name' }, article.author)
        ]),
        React.createElement('span', { key: 'dot1' }, '•'),
        React.createElement('time', { key: 'time' }, article.timestamp),
        React.createElement('span', { key: 'dot2' }, '•'),
        React.createElement('span', { key: 'views' }, `${article.engagement.views.toLocaleString()} views`),
        React.createElement('span', { key: 'dot3' }, '•'),
        React.createElement('span', { key: 'readTime' }, `${estimatedReadingTime} min read`)
      ])
    ]),
    React.createElement('div', {
      key: 'tabs',
      className: 'flex border-b border-gray-200 dark:border-gray-700 mb-6'
    }, ['article', 'discussion', 'sources'].map(tab => 
      React.createElement('button', {
        key: tab,
        onClick: () => setActiveTab(tab as 'article' | 'discussion' | 'sources'),
        className: `px-4 py-2 ${
          activeTab === tab
            ? 'border-b-2 border-blue-500 text-blue-600'
            : 'text-gray-600 dark:text-gray-400'
        }`
      }, tab === 'discussion' ? `${tab} (${article.comments.length})` : tab)
    )),
    React.createElement('div', {
      key: 'tabContent',
      className: 'prose dark:prose-invert max-w-none'
    }, [
      activeTab === 'article' && React.createElement('div', {
        key: 'article',
        dangerouslySetInnerHTML: { __html: article.content }
      }),
      activeTab === 'discussion' && React.createElement(CommentSection, {
        key: 'discussion',
        comments: article.comments
      }),
      activeTab === 'sources' && React.createElement('div', {
        key: 'sources',
        className: 'space-y-4'
      }, [
        React.createElement('p', {
          key: 'intro',
          className: 'text-gray-600 dark:text-gray-400 mb-6'
        }, 'Alle Quellen werden von unserem Fact-Checking-Team überprüft und archiviert.'),
        ...article.sources.map((source, i) => 
          React.createElement('div', {
            key: `source-${i}`,
            className: 'bg-gray-50 dark:bg-gray-800 p-4 rounded-lg'
          }, [
            React.createElement('div', {
              key: `links-${i}`,
              className: 'flex items-center justify-between'
            }, [
              React.createElement('a', {
                key: `original-${i}`,
                href: source,
                target: '_blank',
                rel: 'noopener noreferrer',
                className: 'text-blue-500 hover:text-blue-600'
              }, source),
              React.createElement(Link, {
                key: `verify-${i}`,
                href: `/sources/${encodeURIComponent(source)}`,
                className: 'text-sm bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 px-3 py-1 rounded-full hover:bg-green-100 dark:hover:bg-green-800/30'
              }, 'Verify Source')
            ])
          ])
        )
      ].filter(Boolean))
    ].filter(Boolean))
  ];

  return React.createElement('div', { className: 'relative max-w-7xl mx-auto' }, [
    React.createElement(ArticleToolbar, {
      key: 'toolbar',
      onBookmark: handleBookmark,
      onShare: handleShare,
      onFollow: handleFollow,
      onReport: handleReport,
      isBookmarked,
      isFollowing
    }),
    React.createElement(ReadingProgress, {
      key: 'progress',
      tableOfContents,
      estimatedReadingTime
    }),
    React.createElement('div', {
      key: 'content',
      className: 'flex gap-6'
    }, [
      React.createElement('div', { 
        key: 'main', 
        className: 'flex-1 max-w-3xl' 
      }, mainContent),
      showMetrics && React.createElement('div', { 
        key: 'metrics', 
        className: 'w-64 shrink-0' 
      }, renderMetrics())
    ].filter(Boolean))
  ]);
} 
'use client';

import React, { useState } from 'react';

interface ArticleToolbarProps {
  onBookmark: () => void;
  onShare: () => void;
  onFollow: () => void;
  onReport: () => void;
  isBookmarked?: boolean;
  isFollowing?: boolean;
}

export function ArticleToolbar({
  onBookmark,
  onShare,
  onFollow,
  onReport,
  isBookmarked = false,
  isFollowing = false,
}: ArticleToolbarProps) {
  const [showShareMenu, setShowShareMenu] = useState(false);

  return (
    <div className="fixed left-4 top-1/2 -translate-y-1/2 flex flex-col gap-3 bg-white dark:bg-gray-800 p-2 rounded-lg shadow-lg">
      <button
        onClick={onBookmark}
        className={`p-2 rounded-lg transition-colors ${
          isBookmarked
            ? 'text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20'
            : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700'
        }`}
        title={isBookmarked ? 'Remove from bookmarks' : 'Add to bookmarks'}
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
        </svg>
      </button>

      <div className="relative">
        <button
          onClick={() => {
            setShowShareMenu(!showShareMenu);
            onShare();
          }}
          className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
          title="Share article"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
          </svg>
        </button>

        {showShareMenu && (
          <div className="absolute left-full ml-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-2 min-w-48">
            <div className="flex flex-col gap-2">
              <button className="flex items-center gap-2 p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                Email
              </button>
              <button className="flex items-center gap-2 p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13.601 2.326A7.854 7.854 0 0010 1.5c-4.142 0-7.5 3.358-7.5 7.5 0 4.142 3.358 7.5 7.5 7.5 4.142 0 7.5-3.358 7.5-7.5 0-1.325-.34-2.569-.937-3.674l1.62-1.62a.75.75 0 00-1.061-1.06l-1.62 1.62a7.854 7.854 0 00-3.674-.937z" />
                </svg>
                Copy Link
              </button>
              <button className="flex items-center gap-2 p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M15 2H5a3 3 0 00-3 3v10a3 3 0 003 3h10a3 3 0 003-3V5a3 3 0 00-3-3zm1 13a1 1 0 01-1 1H5a1 1 0 01-1-1V5a1 1 0 011-1h10a1 1 0 011 1v10z" />
                </svg>
                Print
              </button>
            </div>
          </div>
        )}
      </div>

      <button
        onClick={onFollow}
        className={`p-2 rounded-lg transition-colors ${
          isFollowing
            ? 'text-blue-500 bg-blue-50 dark:bg-blue-900/20'
            : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700'
        }`}
        title={isFollowing ? 'Unfollow author' : 'Follow author'}
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
        </svg>
      </button>

      <button
        onClick={onReport}
        className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
        title="Report issue"
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  );
} 
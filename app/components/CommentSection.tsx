'use client';

import React, { useState } from 'react';
import Link from 'next/link';

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

interface CommentSectionProps {
  comments: Comment[];
}

function CommentComponent({ comment, depth = 0 }: { comment: Comment; depth?: number }) {
  const [isReplying, setIsReplying] = useState(false);
  const [showReplies, setShowReplies] = useState(true);

  return (
    <div
      className={`${
        depth > 0 ? 'ml-8 border-l-2 border-gray-200 dark:border-gray-700 pl-4' : ''
      }`}
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center space-x-2">
            <Link
              href={`/user/${comment.author.name.toLowerCase().replace(' ', '-')}`}
              className="font-medium hover:text-blue-600 dark:hover:text-blue-400"
            >
              {comment.author.name}
            </Link>
            {comment.author.isVerified && (
              <span className="text-blue-500" title="Verified Contributor">
                ✓
              </span>
            )}
            <div className="flex items-center space-x-1 text-sm">
              <span className="text-gray-500">•</span>
              <span className={`${
                comment.author.credibility >= 80 ? 'text-green-500' :
                comment.author.credibility >= 60 ? 'text-yellow-500' : 'text-red-500'
              }`}>
                {comment.author.credibility}% credibility
              </span>
            </div>
          </div>
          <time className="text-sm text-gray-500">{comment.timestamp}</time>
        </div>

        <p className="text-gray-700 dark:text-gray-300 mb-3">{comment.content}</p>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <button className="text-gray-500 hover:text-blue-500">
              ↑ {comment.upvotes}
            </button>
            <button className="text-gray-500 hover:text-red-500">
              ↓ {comment.downvotes}
            </button>
          </div>
          <button
            onClick={() => setIsReplying(!isReplying)}
            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          >
            Reply
          </button>
        </div>

        {isReplying && (
          <div className="mt-4">
            <textarea
              placeholder="Write a reply..."
              className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900"
              rows={3}
            />
            <div className="flex justify-end space-x-2 mt-2">
              <button
                onClick={() => setIsReplying(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                Post Reply
              </button>
            </div>
          </div>
        )}
      </div>

      {comment.replies.length > 0 && (
        <div className="ml-4">
          <button
            onClick={() => setShowReplies(!showReplies)}
            className="text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 mb-2"
          >
            {showReplies ? 'Hide' : 'Show'} {comment.replies.length} replies
          </button>
          {showReplies && (
            <div className="space-y-4">
              {comment.replies.map((reply) => (
                <CommentComponent
                  key={reply.id}
                  comment={reply}
                  depth={depth + 1}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

type SortOption = 'recent' | 'credibility' | 'votes';

export function CommentSection({ comments }: CommentSectionProps) {
  const [sortBy, setSortBy] = React.useState<SortOption>('recent');

  const sortedComments = [...comments].sort((a, b) => {
    switch (sortBy) {
      case 'credibility':
        return b.author.credibility - a.author.credibility;
      case 'votes':
        return (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes);
      default:
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    }
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Discussion ({comments.length})</h3>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="text-sm border border-gray-200 dark:border-gray-700 rounded-lg px-2 py-1 bg-white dark:bg-gray-800"
          >
            <option value="recent">Most Recent</option>
            <option value="credibility">Highest Credibility</option>
            <option value="votes">Most Voted</option>
          </select>
        </div>
      </div>

      <div className="mb-6">
        <textarea
          placeholder="Add to the discussion..."
          className="w-full p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
          rows={4}
        />
        <div className="flex justify-end mt-2">
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Post Comment
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {sortedComments.map((comment) => (
          <CommentComponent key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
} 
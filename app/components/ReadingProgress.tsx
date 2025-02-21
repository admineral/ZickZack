'use client';

import React, { useState, useEffect } from 'react';

interface TableOfContentsItem {
  id: string;
  title: string;
  level: number;
}

interface ReadingProgressProps {
  tableOfContents: TableOfContentsItem[];
  estimatedReadingTime: number;
}

export function ReadingProgress({ tableOfContents, estimatedReadingTime }: ReadingProgressProps) {
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const updateProgress = () => {
      const scrolled = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrolled / height) * 100;
      setProgress(Math.min(100, Math.max(0, progress)));

      // Update active section
      const sections = tableOfContents.map(item => document.getElementById(item.id));
      const current = sections.find((section, index) => {
        if (!section) return false;
        const nextSection = sections[index + 1];
        const rect = section.getBoundingClientRect();
        return rect.top <= 100 && (!nextSection || nextSection.getBoundingClientRect().top > 100);
      });

      if (current) {
        setActiveSection(current.id);
      }
    };

    window.addEventListener('scroll', updateProgress);
    return () => window.removeEventListener('scroll', updateProgress);
  }, [tableOfContents]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="fixed right-4 top-24 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-500">Reading Progress</span>
          <span className="text-sm font-medium">{Math.round(progress)}%</span>
        </div>
        <div className="h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
          </svg>
          <span>{estimatedReadingTime} min read</span>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-semibold mb-2">Table of Contents</h4>
        <nav className="space-y-1">
          {tableOfContents.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`w-full text-left text-sm py-1 px-2 rounded-lg transition-colors ${
                activeSection === item.id
                  ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
              style={{ paddingLeft: `${item.level * 0.5}rem` }}
            >
              {item.title}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
} 
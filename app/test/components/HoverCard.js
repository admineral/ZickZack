// HoverCard.js
import React from 'react';

export default function HoverCard({ orb }) {
  return (
    <div 
      className="absolute p-4 bg-paper-white dark:bg-ink-blue border-2 border-paper-gray dark:border-ink-gray rounded-none shadow-2xl transform transition-transform duration-500 text-ink-blue dark:text-paper-white"
      style={{ 
        zIndex: 99999,
        width: '400px',
        right: '-420px',
        top: '50%',
        transform: 'translateY(-50%)',
        position: 'absolute',
        pointerEvents: 'none'
      }}
    >
      <h3 className="font-playfair text-2xl font-bold leading-tight">{orb.headline}</h3>
    </div>
  );
}
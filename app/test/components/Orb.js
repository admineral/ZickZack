import { motion } from 'framer-motion';
import React from 'react';
import HoverCard from './HoverCard';
import './Orb.css'; // Import the CSS file

export default function Orb({ animation, orb, zIndex }) {
  const orbSize = orb.type === 'investigation' ? 24 : orb.type === 'opinion' ? 20 : 16;
  
  return (
    <motion.div
      className="orb" // Use the class name for styling
      style={{
        width: `${orbSize}px`,
        height: `${orbSize}px`,
        top: '50%',
        left: '50%',
        translateX: '-50%',
        translateY: '-50%',
        zIndex: zIndex || 1,
        position: 'absolute',
        borderColor: orb.type === 'investigation' 
          ? 'var(--editorial-red)' 
          : orb.type === 'opinion'
          ? 'var(--highlight-yellow)'
          : 'var(--ink-gray)',
        borderWidth: '2px'
      }}
      initial={{ x: animation.x[0], y: animation.y[0] }}
      animate={animation}
      whileHover={{
        scale: 1.15,
        transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] }
      }}
    >
      <div className="hover-card">
        <HoverCard orb={orb} />
      </div>
    </motion.div>
  );
}
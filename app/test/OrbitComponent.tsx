"use client"

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Orbit from './components/Orbit';
import { mapArticlesToOrbs, orbits } from './components/orbsData';
import { fetchAndCacheArticles } from '../data/articlesData';

export default function OrbitAnimation() {
  const [orbsData, setOrbsData] = useState([[], [], []]);
  const [isManuallyHovering, setIsManuallyHovering] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    async function fetchData() {
      const articles = await fetchAndCacheArticles();
      const mappedOrbs = mapArticlesToOrbs(articles);
      setOrbsData(mappedOrbs);
    }
    fetchData();
  }, []);

  // Setup manual hover detection
  useEffect(() => {
    const handleMouseEnter = () => setIsManuallyHovering(true);
    const handleMouseLeave = () => setIsManuallyHovering(false);

    const orbs = document.querySelectorAll('.orb');
    orbs.forEach(orb => {
      orb.addEventListener('mouseenter', handleMouseEnter);
      orb.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      orbs.forEach(orb => {
        orb.removeEventListener('mouseenter', handleMouseEnter);
        orb.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, [orbsData]); // Re-add listeners when orbsData changes

  useEffect(() => {
    if (!isManuallyHovering) {
      const showRandomHoverCard = () => {
        // First, reset all orbs and cards
        const orbs = document.querySelectorAll('.orb');
        orbs.forEach(orb => {
          (orb as HTMLElement).style.zIndex = '1';
          const hoverCard = orb.querySelector('.hover-card');
          if (hoverCard) {
            hoverCard.classList.remove('show');
            (hoverCard as HTMLElement).style.zIndex = '';
          }
        });

        if (orbs.length > 0) {
          const randomIndex = Math.floor(Math.random() * orbs.length);
          const selectedOrb = orbs[randomIndex];
          
          // Set high z-index for the selected orb
          (selectedOrb as HTMLElement).style.zIndex = '99999';
          
          const hoverCard = selectedOrb.querySelector('.hover-card');
          if (hoverCard) {
            hoverCard.classList.add('show');
            // Ensure hover card is above everything
            (hoverCard as HTMLElement).style.zIndex = '999999';
          }
        }
      };

      // Initial delay before starting
      timeoutRef.current = setTimeout(showRandomHoverCard, 2000);
      
      // Regular interval for subsequent shows
      intervalRef.current = setInterval(showRandomHoverCard, 5000);

      return () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        if (intervalRef.current) clearInterval(intervalRef.current);
        
        // Only reset cards if we're not manually hovering
        if (!isManuallyHovering) {
          const orbs = document.querySelectorAll('.orb');
          orbs.forEach(orb => {
            (orb as HTMLElement).style.zIndex = '1';
            const hoverCard = orb.querySelector('.hover-card');
            if (hoverCard) {
              hoverCard.classList.remove('show');
              (hoverCard as HTMLElement).style.zIndex = '';
            }
          });
        }
      };
    }
  }, [isManuallyHovering]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 2 }} style={{ position: 'relative', zIndex: 30 }}>
      <div className="relative w-[600px] h-[600px] bg-paper-white dark:bg-ink-blue rounded-full" style={{ margin: 'auto' }}>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24" style={{ zIndex: 0 }}>
          <Image 
            src="/image-removebg-preview-4.png" 
            alt="Edelweiss" 
            width={96}
            height={96}
            className="object-contain"
          />
        </div>
        {orbits.map((size, index) => (
          <Orbit
            key={index}
            size={size}
            index={index}
            totalOrbits={orbits.length}
            orbs={orbsData[index]}
          />
        ))}
      </div>
    </motion.div>
  );
}
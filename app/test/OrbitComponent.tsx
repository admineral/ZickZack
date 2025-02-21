"use client"

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Orbit from './components/Orbit';
import { mapArticlesToOrbs, orbits } from './components/orbsData';
import { fetchAndCacheArticles } from '../data/articlesData';

export default function OrbitAnimation() {
  const [orbsData, setOrbsData] = useState([[], [], []]);
  const [isAutomatic, setIsAutomatic] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const articles = await fetchAndCacheArticles();
      const mappedOrbs = mapArticlesToOrbs(articles);
      setOrbsData(mappedOrbs);
    }
    fetchData();
  }, []);

  useEffect(() => {
    // Setup the automatic display if it's enabled
    if (isAutomatic) {
      const showRandomHoverCard = () => {
        // Logic to show a random hover card
        const orbs = document.querySelectorAll('.orb');
        orbs.forEach(orb => {
          const hoverCard = orb.querySelector('.hover-card');
          if (hoverCard) {
            hoverCard.classList.remove('show');
          }
        });

        if (orbs.length > 0) {
          const randomIndex = Math.floor(Math.random() * orbs.length);
          const selectedOrb = orbs[randomIndex];
          const hoverCard = selectedOrb.querySelector('.hover-card');
          if (hoverCard) {
            hoverCard.classList.add('show');
          }
        }
      };

      showRandomHoverCard();
      const intervalId = setInterval(showRandomHoverCard, 10000);

      return () => clearInterval(intervalId);
    }
  }, [isAutomatic]);

  const toggleAutomaticMode = () => {
    setIsAutomatic(!isAutomatic); // Toggle the automatic mode
  
    // If turning off the automatic mode, also hide any visible hover cards
    if (isAutomatic) {
      const visibleHoverCards = document.querySelectorAll('.hover-card.show');
      visibleHoverCards.forEach(card => {
        card.classList.remove('show');
      });
    }
  };

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
      <button 
        onClick={toggleAutomaticMode} 
        className="fixed bottom-5 right-5 z-50 px-4 py-2 bg-editorial-red text-paper-white rounded-none hover:bg-editorial-red/90 transition-colors font-source-serif text-sm uppercase tracking-wider"
      >
        {isAutomatic ? 'Automatisch: An' : 'Automatisch: Aus'}
      </button>
    </motion.div>
  );
}
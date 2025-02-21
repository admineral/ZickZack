import React, { memo } from 'react';
import Orb from './Orb';

interface OrbData {
  id: string;
  title: string;
  description: string;
  link: string;
  type?: 'investigation' | 'opinion' | 'report';
  author?: string;
  timestamp?: string;
  tags?: string[];
  engagement?: {
    views?: number;
    credibility?: number;
    comments?: number;
  };
}

interface OrbitProps {
  size: number;
  index: number;
  totalOrbits: number;
  orbs: OrbData[];
}

const Orbit = memo(({ size, index, totalOrbits, orbs }: OrbitProps) => {
  const calculateOrbitPath = (angle: number, offset: number = 0) => {
    const radius = size; // Keep radius constant
    const actualAngle = angle + offset;
    return {
      x: Math.round(Math.cos(actualAngle) * radius * 100) / 100,
      y: Math.round(Math.sin(actualAngle) * radius * 100) / 100
    };
  };

  const offset = (index * 2 * Math.PI) / totalOrbits;
  const segmentSize = 2 * Math.PI / orbs.length;
  const minDistance = 0.15;

  return (
    <>
      {orbs.map((orb, orbIndex) => {
        const segmentStart = orbIndex * segmentSize;
        const orbOffset = segmentStart + minDistance + (Math.random() * (segmentSize - 2 * minDistance));
        
        // Generate precise animation keyframes
        const steps = 36; // One keyframe every 10 degrees
        const animation = {
          x: Array.from({ length: steps + 1 }, (_, i) => {
            const angle = (i * (2 * Math.PI)) / steps;
            return calculateOrbitPath(angle, offset + orbOffset).x;
          }),
          y: Array.from({ length: steps + 1 }, (_, i) => {
            const angle = (i * (2 * Math.PI)) / steps;
            return calculateOrbitPath(angle, offset + orbOffset).y;
          }),
          transition: {
            repeat: Infinity,
            repeatType: "loop",
            duration: size * 0.5,
            ease: "linear",
            delay: index * 0.8,
            times: Array.from({ length: steps + 1 }, (_, i) => i / steps)
          }
        };

        const orbZIndex = Math.max(1, 10 - index);

        return <Orb key={orbIndex} animation={animation} orb={orb} zIndex={orbZIndex} />;
      })}
    </>
  );
});

Orbit.displayName = 'Orbit';
export default Orbit;
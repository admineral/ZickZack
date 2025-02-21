import React, { memo } from 'react';
import Orb from './Orb';

interface OrbData {
  id: string;
  title: string;
  description: string;
  link: string;
}

interface OrbitProps {
  size: number;
  index: number;
  totalOrbits: number;
  orbs: OrbData[];
}

const Orbit = memo(({ size, index, totalOrbits, orbs }: OrbitProps) => {
  const calculateOrbitPath = (angle: number, offset: number = 0) => ({
    x: Math.cos(angle + offset) * size,
    y: Math.sin(angle + offset) * size
  });

  const offset = (index * 2 * Math.PI) / totalOrbits;
  const segmentSize = 2 * Math.PI / orbs.length; // Size of each segment
  const minDistance = 0.1; // Minimum distance from the edges of the segment

  return (
    <>
      <div
        className="absolute border rounded-full"
        style={{
          width: size * 2,
          height: size * 2,
          top: '50%',
          left: '50%',
          transform: `translate(-50%, -50%)`,
          zIndex: 0,
          borderColor: 'var(--ink-gray)',
          borderWidth: '1px'
        }}
      />
      {orbs.map((orb, orbIndex) => {
        const segmentStart = orbIndex * segmentSize; // Start of the segment
        const orbOffset = segmentStart + minDistance + Math.random() * (segmentSize - 2 * minDistance); // Random position within the segment

        const animation = {
          x: Array.from({ length: 360 / 10 + 1 }, (_, i) => calculateOrbitPath((i * 10) * Math.PI / 180, offset + orbOffset).x),
          y: Array.from({ length: 360 / 10 + 1 }, (_, i) => calculateOrbitPath((i * 10) * Math.PI / 180, offset + orbOffset).y),
          transition: {
            repeat: Infinity, 
            repeatType: "loop", 
            duration: size * 0.4, 
            ease: "linear",
            delay: index * 0.5
          }
        };

        // Assign decreasing z-index for outer orbits to prevent overlap
        const orbZIndex = Math.max(1, 10 - index);

        return <Orb key={orbIndex} animation={animation} orb={orb} zIndex={orbZIndex} />;
      })}
    </>
  );
});
Orbit.displayName = 'Orbit';
export default Orbit;
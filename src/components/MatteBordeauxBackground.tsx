import { motion } from 'motion/react';
import React, { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  color: string;
}

export const MatteBordeauxBackground: React.FC = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    // Glowing golden and ruby embers
    const p: Particle[] = Array.from({ length: 24 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3.5 + 2,
      duration: 12 + Math.random() * 16,
      delay: Math.random() * -20,
      color: i % 3 === 0 ? 'rgba(251, 191, 36, 0.6)' : i % 3 === 1 ? 'rgba(244, 63, 94, 0.65)' : 'rgba(254, 205, 211, 0.55)',
    }));
    setParticles(p);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* 1. Deep Matte Bordeaux Velvet Base Gradient */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 30%, #360714 0%, #22040c 50%, #130206 100%)',
        }}
      />

      {/* Subtle velvety vignette around edges */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(10,1,3,0.85)_100%)]" />

      {/* Interactive soft ambient mouse glow */}
      <div 
        className="absolute w-[600px] h-[600px] rounded-full blur-[140px] opacity-20 transition-all duration-700 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(225, 29, 72, 0.5) 0%, rgba(136, 19, 55, 0.15) 60%, transparent 80%)',
          left: `calc(${mousePos.x}% - 300px)`,
          top: `calc(${mousePos.y}% - 300px)`,
        }}
      />

      {/* 2. FLOATING SPARKLING EMBERS / FIREFLIES */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: `${p.x}%`,
            bottom: '-5%',
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
          }}
          animate={{
            y: ['0vh', '-115vh'],
            x: [0, (p.id % 2 === 0 ? 35 : -35), (p.id % 2 === 0 ? -25 : 25), 0],
            opacity: [0, 0.9, 0.7, 0],
            scale: [0.6, 1.2, 0.9, 0.4],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Subtle fine matte grain overlay for matte velvet touch */}
      <div 
        className="absolute inset-0 opacity-[0.035] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
};

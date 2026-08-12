'use client';

// Ambient floating background particles (bubbles / squiggles / dots).
// Randomised client-side after mount to avoid SSR hydration mismatch.

import React from 'react';

type Particle = {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  kind: 'bubble' | 'squiggle' | 'dot';
  opacity: number;
};

export default function BackgroundParticles() {
  const [particles, setParticles] = React.useState<Particle[]>([]);

  React.useEffect(() => {
    setParticles(
      Array.from({ length: 14 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * -25,
        duration: 22 + Math.random() * 18,
        size: 16 + Math.random() * 28,
        kind: Math.random() < 0.5 ? 'bubble' : Math.random() < 0.5 ? 'squiggle' : 'dot',
        opacity: 0.18 + Math.random() * 0.18,
      }))
    );
  }, []);

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 1, overflow: 'hidden' }}>
      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            left: `${p.left}%`,
            bottom: -100,
            width: p.size,
            height: p.size,
            animation: `floatUp ${p.duration}s linear ${p.delay}s infinite`,
            opacity: p.opacity,
          }}
        >
          {p.kind === 'bubble' && (
            <svg viewBox="0 0 40 40" width="100%" height="100%">
              <circle cx="20" cy="20" r="14" fill="none" stroke="white" strokeWidth="2.5" />
              <circle cx="14" cy="14" r="3" fill="white" />
            </svg>
          )}
          {p.kind === 'squiggle' && (
            <svg viewBox="0 0 40 40" width="100%" height="100%">
              <path d="M5 20 Q 12 10, 20 20 T 35 20" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            </svg>
          )}
          {p.kind === 'dot' && (
            <svg viewBox="0 0 40 40" width="100%" height="100%">
              <circle cx="20" cy="20" r="5" fill="white" />
              <circle cx="32" cy="14" r="2.5" fill="white" />
              <circle cx="10" cy="30" r="2" fill="white" />
            </svg>
          )}
        </div>
      ))}
    </div>
  );
}

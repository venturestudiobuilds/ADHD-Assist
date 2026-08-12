'use client';

// Decorative hero thought bubbles scattered either side of the maze stage.
// Clicking one swaps its text for a fresh thought. Hidden ≤1380px via CSS.

import React from 'react';
import { HERO_THOUGHTS, BUBBLE_POSITIONS } from '@/lib/content';

type Pos = (typeof BUBBLE_POSITIONS)[number];

function ThoughtBubble({
  text,
  pos,
  onClick,
}: {
  text: string;
  pos: Pos;
  onClick: () => void;
}) {
  const left = 'left' in pos ? pos.left : undefined;
  const right = 'right' in pos ? pos.right : undefined;
  return (
    <div
      className={`thought-bubble tb-side tb-${pos.size}`}
      style={
        {
          position: 'absolute',
          top: pos.top,
          left: left !== undefined ? left : 'auto',
          right: right !== undefined ? right : 'auto',
          '--rot': `${pos.rot}deg`,
          '--delay': `${pos.delay}s`,
          pointerEvents: 'auto',
        } as React.CSSProperties
      }
    >
      <button type="button" onClick={onClick} className="thought-bubble-inner" aria-label={`Thought: ${text}`}>
        <span>{text}</span>
        <span className={`tb-tail tb-tail-big ${left !== undefined ? 'tail-right' : 'tail-left'}`} />
        <span className={`tb-tail tb-tail-small ${left !== undefined ? 'tail-right' : 'tail-left'}`} />
      </button>
    </div>
  );
}

export default function ThoughtBubbles() {
  // Deterministic initial assignment (avoids SSR hydration mismatch);
  // shuffle only happens on click.
  const [thoughts, setThoughts] = React.useState<string[]>(() =>
    BUBBLE_POSITIONS.map((_, i) => HERO_THOUGHTS[i % HERO_THOUGHTS.length])
  );

  const swap = (idx: number) => {
    setThoughts((cur) => {
      const next = [...cur];
      const available = HERO_THOUGHTS.filter((t) => !next.includes(t));
      if (available.length) {
        next[idx] = available[Math.floor(Math.random() * available.length)];
      } else {
        const others = HERO_THOUGHTS.filter((t) => t !== cur[idx]);
        next[idx] = others[Math.floor(Math.random() * others.length)];
      }
      return next;
    });
  };

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 3 }}>
      {BUBBLE_POSITIONS.map((pos, i) => (
        <ThoughtBubble key={i} pos={pos} text={thoughts[i]} onClick={() => swap(i)} />
      ))}
    </div>
  );
}

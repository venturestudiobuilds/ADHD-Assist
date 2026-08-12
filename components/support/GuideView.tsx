'use client';

// Expanded free-guidance view — fills the "Start where you are" panel when a
// "Read on site" item is clicked. Renders the guide's content blocks with a
// back control to return to the situation overview.

import React from 'react';
import { getGuide, type GuideBlock } from '@/lib/guides';

function Block({ block }: { block: GuideBlock }) {
  switch (block.type) {
    case 'p':
      return <p className="guide-view-p">{block.text}</p>;
    case 'h':
      return <h4 className="guide-view-h">{block.text}</h4>;
    case 'list':
      return (
        <ul className="guide-view-list">
          {block.items.map((it, i) => (
            <li key={i}>{it}</li>
          ))}
        </ul>
      );
    case 'script':
      return (
        <div className="script-card" style={{ marginBottom: 12 }}>
          <div className="script-label">{block.label}</div>
          <div className="script-text">{block.text}</div>
        </div>
      );
    case 'note':
      return <div className="guide-view-note">{block.text}</div>;
    default:
      return null;
  }
}

export default function GuideView({
  slug,
  onBack,
  situationTitle,
}: {
  slug: string;
  onBack: () => void;
  situationTitle: string;
}) {
  const guide = getGuide(slug);
  const headingRef = React.useRef<HTMLHeadingElement>(null);

  // Move focus to the guide heading so keyboard/screen-reader users land on
  // the new content; also keeps the panel top in view on mobile.
  React.useEffect(() => {
    headingRef.current?.focus({ preventScroll: false });
  }, [slug]);

  if (!guide) return null;

  return (
    <div className="swyu-panel-inner guide-view">
      <button type="button" className="guide-view-back" onClick={onBack}>
        <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 6 L9 12 L15 18" />
        </svg>
        Back to &ldquo;{situationTitle}&rdquo;
      </button>

      <div className="swyu-panel-eyebrow" style={{ marginTop: 18 }}>
        Free guidance
      </div>
      <h3 className="swyu-panel-title guide-view-title" tabIndex={-1} ref={headingRef}>
        {guide.title}
      </h3>

      <div className="guide-view-body">
        {guide.blocks.map((b, i) => (
          <Block key={i} block={b} />
        ))}
      </div>

      <button type="button" className="guide-view-back guide-view-back-bottom" onClick={onBack}>
        <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 6 L9 12 L15 18" />
        </svg>
        Back to overview
      </button>
    </div>
  );
}

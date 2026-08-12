'use client';

// Friendly "note from the maker" that opens from the top-nav About item.
// Desktop: hover to open. Touch: tap to toggle (with a close button).

import React from 'react';
import { useRouter } from 'next/navigation';
import { LANDING } from '@/lib/content';

export default function AboutNav() {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [isTouch, setIsTouch] = React.useState(false);
  const wrapRef = React.useRef<HTMLDivElement>(null);
  const closeTimer = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  React.useEffect(() => {
    setIsTouch(window.matchMedia('(hover: none), (pointer: coarse)').matches);
  }, []);

  // Close on outside click / tap and on Escape.
  React.useEffect(() => {
    if (!open) return undefined;
    const onDoc = (e: MouseEvent | TouchEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('touchstart', onDoc, { passive: true });
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('touchstart', onDoc);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const openNow = () => {
    clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const closeSoon = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(false), 160);
  };
  const hoverProps = isTouch
    ? {}
    : { onMouseEnter: openNow, onMouseLeave: closeSoon, onFocus: openNow, onBlur: closeSoon };

  const goSupport = () => {
    setOpen(false);
    router.push('/support');
  };

  return (
    <div ref={wrapRef} className="about-nav" {...hoverProps}>
      <button
        type="button"
        className="about-trigger"
        aria-expanded={open}
        aria-haspopup="dialog"
        onClick={() => setOpen((o) => !o)}
      >
        {LANDING.navAbout}
      </button>

      <div className={`about-card ${open ? 'open' : ''}`} role="dialog" aria-label="About ADHD Assist">
        {isTouch && (
          <button type="button" className="about-close" aria-label="Close" onClick={() => setOpen(false)}>
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
              <path d="M6 6 L18 18 M18 6 L6 18" />
            </svg>
          </button>
        )}
        <div className="about-card-eyebrow">{LANDING.about.eyebrow}</div>
        <h3 className="about-card-title">{LANDING.about.title}</h3>
        <p className="about-card-body">{LANDING.about.body}</p>
        <p className="about-card-signoff">{LANDING.about.signoff}</p>
        <button type="button" className="about-card-cta" onClick={goSupport}>
          {LANDING.about.cta}
        </button>
      </div>
    </div>
  );
}

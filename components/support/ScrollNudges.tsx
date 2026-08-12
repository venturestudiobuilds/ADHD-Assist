'use client';

// ScrollNudges — gentle, scroll-triggered supportive thought bubbles.
// One at a time, fades in / holds / fades out, each section fires once.
// Decorative only (aria-hidden); page works perfectly without it.

import React from 'react';
import { createPortal } from 'react-dom';
import { NUDGE_MESSAGES } from '@/lib/content';

export default function ScrollNudges() {
  const [active, setActive] = React.useState<{ text: string; phase: 'in' | 'out' } | null>(null);
  const [mounted, setMounted] = React.useState(false);
  const queueRef = React.useRef<string[]>([]);
  const shownRef = React.useRef(new Set<string>());
  const busyRef = React.useRef(false);
  const timersRef = React.useRef<ReturnType<typeof setTimeout>[]>([]);

  React.useEffect(() => setMounted(true), []);

  const pump = React.useCallback(() => {
    if (busyRef.current) return;
    const text = queueRef.current.shift();
    if (!text) return;
    busyRef.current = true;
    setActive({ text, phase: 'in' });

    const HOLD = 4200; // visible time
    const OUT = 650; // fade-out duration
    const GAP = 1100; // calm pause before the next one

    timersRef.current.push(
      setTimeout(() => {
        setActive({ text, phase: 'out' });
      }, HOLD)
    );
    timersRef.current.push(
      setTimeout(() => {
        setActive(null);
        busyRef.current = false;
        pump();
      }, HOLD + OUT + GAP)
    );
  }, []);

  React.useEffect(() => {
    const els = Array.from(document.querySelectorAll('[data-nudge]'));
    if (!els.length) return undefined;

    let lastRun = 0;
    let trailing: ReturnType<typeof setTimeout>;
    const check = () => {
      lastRun = Date.now();
      const vh = window.innerHeight;
      // Trigger when a section sits within the central reading band.
      els.forEach((el) => {
        const key = el.getAttribute('data-nudge');
        if (!key || shownRef.current.has(key)) return;
        const text = NUDGE_MESSAGES[key];
        if (!text) return;
        const r = el.getBoundingClientRect();
        const inBand = r.top < vh * 0.6 && r.bottom > vh * 0.35;
        if (inBand) {
          shownRef.current.add(key); // each section nudges only once
          // Keep the train short: at most one bubble waiting behind the
          // active one, so fast scrolling never triggers a long backlog.
          if (queueRef.current.length < 1) {
            queueRef.current.push(text);
            pump();
          }
        }
      });
    };
    const onScroll = () => {
      const now = Date.now();
      const since = now - lastRun;
      if (since >= 120) {
        check();
      } else {
        clearTimeout(trailing);
        trailing = setTimeout(check, 120 - since);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    // Catch whatever section is already in view on arrival (e.g. the hero),
    // re-checking a couple of times in case the page is mid entrance-fade.
    const t1 = setTimeout(check, 500);
    const t2 = setTimeout(check, 1100);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      clearTimeout(trailing);
      clearTimeout(t1);
      clearTimeout(t2);
      timersRef.current.forEach(clearTimeout);
      timersRef.current = [];
    };
  }, [pump]);

  if (!mounted) return null;

  // Portal to <body> so the fixed bubble anchors to the viewport, immune to
  // the entrance-transform on .support-page (a transformed ancestor would
  // otherwise become its containing block).
  return createPortal(
    <div className="scroll-nudge-bubble-wrap" aria-hidden="true">
      {active && (
        <div className={`scroll-nudge-bubble ${active.phase === 'out' ? 'is-out' : 'is-in'}`}>
          <span className="snb-mark">✦</span>
          <span>{active.text}</span>
          <span className="snb-tail snb-tail-1" />
          <span className="snb-tail snb-tail-2" />
        </div>
      )}
    </div>,
    document.body
  );
}

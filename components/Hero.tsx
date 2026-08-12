'use client';

// Landing screen — "WHICH WAY NOW?" hero with the circular maze metaphor
// and a clear CTA through to the support hub.

import React from 'react';
import { useRouter } from 'next/navigation';
import Maze from '@/components/Maze';
import AboutNav from '@/components/AboutNav';
import ThoughtBubbles from '@/components/ThoughtBubbles';
import BackgroundParticles from '@/components/BackgroundParticles';
import { LANDING } from '@/lib/content';

export default function Hero() {
  const router = useRouter();
  const [engaged, setEngaged] = React.useState(false);
  const onSupport = () => router.push('/support');

  return (
    <div style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
      <BackgroundParticles />

      <div
        className="fade-in"
        style={{
          minHeight: '100vh',
          background: 'var(--bg)',
          padding: '24px 24px 80px',
          position: 'relative',
          zIndex: 2,
        }}
      >
        {/* Top brand bar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            maxWidth: 1200,
            margin: '0 auto 28px',
          }}
        >
          <div className="brand-pill">
            <div className="brand-dot" />
            ADHD&nbsp;ASSIST
          </div>
          <div
            className="hero-nav-right"
            style={{
              display: 'flex',
              gap: 14,
              alignItems: 'center',
              fontSize: 13,
              fontWeight: 700,
              color: 'var(--ink)',
              flexWrap: 'wrap',
              justifyContent: 'flex-end',
            }}
          >
            <AboutNav />
            <span className="hero-nav-resources" style={{ opacity: 0.7, cursor: 'default' }}>
              {LANDING.navResources}
            </span>
            <button className="back-btn" style={{ padding: '8px 14px', fontSize: 13 }} onClick={onSupport}>
              {LANDING.navSupport}
            </button>
          </div>
        </div>

        {/* Hero stage */}
        <div style={{ maxWidth: 1080, margin: '0 auto', position: 'relative' }}>
          {/* Thought bubbles scattered around the stage */}
          <ThoughtBubbles />

          {/* Hero headline — bold, two-line, sits above the maze. */}
          <div
            style={{
              position: 'relative',
              marginBottom: 24,
              textAlign: 'center',
              pointerEvents: 'none',
              padding: '4px 0',
            }}
          >
            <div
              style={{
                fontFamily: "'Archivo Black', sans-serif",
                fontWeight: 900,
                color: 'var(--coral)',
                WebkitTextStroke: '3px var(--ink)',
                fontSize: 'clamp(40px, 10.5vw, 156px)',
                letterSpacing: '-0.045em',
                lineHeight: 0.88,
                textShadow: '0 7px 0 rgba(31, 95, 107, 0.15)',
                display: 'inline-block',
                textAlign: 'left',
              }}
            >
              <div>{LANDING.headlineLine1}</div>
              <div style={{ marginTop: '-0.04em' }}>
                {LANDING.headlineLine2}
                <span style={{ color: 'var(--ink)', WebkitTextStroke: '0', display: 'inline' }}>?</span>
              </div>
            </div>
          </div>

          {/* Stage card */}
          <div className="stage-card" style={{ padding: 'clamp(20px, 3vw, 32px)', position: 'relative' }}>
            {/* Scene label */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
                marginBottom: 18,
                padding: '0 4px',
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 800,
                  letterSpacing: '0.18em',
                  color: 'var(--ink)',
                  opacity: 0.55,
                }}
              >
                {LANDING.sceneLabel}
              </div>
            </div>

            {/* Maze */}
            <div style={{ maxWidth: 900, margin: '0 auto' }}>
              <Maze onEngage={() => setEngaged(true)} />
            </div>
          </div>

          {/* Sub copy */}
          <div style={{ marginTop: 48, padding: '0 16px' }}>
            <div className="sub-copy">
              {LANDING.subCopyLead}
              <span style={{ color: 'var(--coral)' }}>{LANDING.subCopyAccent}</span>
            </div>
          </div>

          {/* CTA section */}
          <div style={{ marginTop: 36, textAlign: 'center', padding: '0 16px' }}>
            <div
              style={{
                fontSize: 'clamp(16px, 1.6vw, 19px)',
                color: 'var(--ink)',
                fontWeight: 700,
                maxWidth: 560,
                margin: '0 auto 22px',
                lineHeight: 1.55,
              }}
            >
              {LANDING.supportLine1}
              <br />
              {LANDING.supportLine2}
            </div>
            <div
              className={`cta-cluster ${engaged ? 'is-engaged' : ''}`}
              style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}
            >
              <button className={`cta-button ${engaged ? 'cta-button-nudge' : ''}`} onClick={onSupport}>
                {LANDING.primaryCta}
              </button>
              {engaged && <div className="cta-reassure">{LANDING.reassurance}</div>}
            </div>
          </div>
        </div>

        <div style={{ height: 40 }} />
      </div>
    </div>
  );
}

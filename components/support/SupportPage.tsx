'use client';

// Support hub - Hero → Start where you are → Support map at a glance →
//               Downloads → Final CTA → Disclaimer.

import React from 'react';
import Link from 'next/link';
import StartWhereYouAre from '@/components/support/StartWhereYouAre';
import ScrollNudges from '@/components/support/ScrollNudges';
import ProductCard from '@/components/support/ProductCard';
import GuideView from '@/components/support/GuideView';
import BackgroundParticles from '@/components/BackgroundParticles';
import SiteFooter from '@/components/SiteFooter';
import { COPY, JOURNEY, WORRIES } from '@/lib/content';
import { PRODUCTS } from '@/lib/products';
import { getGuide } from '@/lib/guides';

function clamp(v: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, v));
}

export default function SupportPage() {
  const [activeStage, setActiveStage] = React.useState(1);
  const heroRef = React.useRef<HTMLElement>(null);

  // Scroll-driven worry scatter
  React.useEffect(() => {
    const onScroll = () => {
      const hero = heroRef.current;
      if (!hero) return;
      const rect = hero.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh * 0.7;
      const end = vh * 0.1;
      const p = clamp((start - rect.bottom) / (start - end), 0, 1);
      document.documentElement.style.setProperty('--worry-progress', String(p));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  // Reveal sections + track active stage for the side path
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in-view');
            const s = (e.target as HTMLElement).dataset.stage;
            if (s) setActiveStage(Number(s));
          }
        });
      },
      { rootMargin: '-30% 0px -30% 0px', threshold: 0 }
    );
    document.querySelectorAll('[data-reveal], [data-stage]').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (sel: string) => {
    const el = document.querySelector(sel);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
      <BackgroundParticles />

      <div
        className="fade-in support-page"
        style={{
          minHeight: '100vh',
          background: 'var(--bg)',
          paddingBottom: 80,
          position: 'relative',
          zIndex: 2,
        }}
      >
        {/* Top bar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            maxWidth: 1200,
            margin: '0 auto',
            padding: '24px 24px 8px',
          }}
        >
          <div className="brand-pill">
            <div className="brand-dot" /> {COPY.brand}
          </div>
          <Link href="/" className="back-btn" style={{ textDecoration: 'none' }}>
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 6 L9 12 L15 18" />
            </svg>
            {COPY.backToMaze}
          </Link>
        </div>

        <JourneyProgress active={activeStage} />

        <ScrollNudges />

        {/* HERO */}
        <section
          ref={heroRef}
          data-nudge="hero"
          className="support-hero"
          style={{
            position: 'relative',
            maxWidth: 1080,
            margin: '0 auto',
            padding: '48px 24px 200px',
          }}
        >
          <div style={{ position: 'relative', zIndex: 2, maxWidth: 720 }}>
            <div className="hero-eyebrow">{COPY.hero.eyebrow}</div>
            <h1
              style={{
                fontFamily: "'Archivo Black', sans-serif",
                fontSize: 'clamp(40px, 8vw, 96px)',
                letterSpacing: '-0.04em',
                lineHeight: 0.95,
                margin: '0 0 24px',
                color: 'var(--ink)',
                textWrap: 'pretty',
              }}
            >
              {COPY.hero.titleLead}
              <br />
              <span style={{ color: 'var(--coral)' }}>{COPY.hero.titleAccent}</span>
            </h1>
            <p
              style={{
                fontSize: 'clamp(18px, 1.9vw, 22px)',
                color: 'var(--ink)',
                opacity: 0.85,
                lineHeight: 1.45,
                margin: '0 0 14px',
                fontWeight: 600,
                maxWidth: 600,
                textWrap: 'pretty',
              }}
            >
              {COPY.hero.body}
            </p>
            <p
              style={{
                fontSize: 14,
                color: 'var(--ink)',
                opacity: 0.6,
                lineHeight: 1.5,
                margin: '0 0 30px',
                maxWidth: 600,
                fontWeight: 500,
              }}
            >
              {COPY.hero.note}
            </p>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <button className="cta-button" onClick={() => scrollTo('#start-here')}>
                {COPY.hero.primaryCta}
              </button>
              <button className="cta-button cta-button-ghost" onClick={() => scrollTo('#downloads')}>
                {COPY.hero.secondaryCta}
              </button>
            </div>
          </div>

          <div className="worry-layer" aria-hidden="true">
            {WORRIES.map((w, i) => (
              <div
                key={i}
                className="worry"
                style={
                  {
                    '--wx': `${w.x}px`,
                    '--wy': `${w.y}px`,
                    '--wrot': `${w.rot}deg`,
                    '--wi': i,
                    width: w.w,
                  } as React.CSSProperties
                }
              >
                <div className="worry-inner">{w.text}</div>
              </div>
            ))}
          </div>

          <div className="scroll-nudge" aria-hidden="true">
            <span>{COPY.hero.scrollNudge}</span>
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5 L12 19 M6 13 L12 19 L18 13" />
            </svg>
          </div>
        </section>

        {/* 1. START WHERE YOU ARE */}
        <SectionHeader
          id="start-here"
          eyebrow={COPY.sections.start.eyebrow}
          title={COPY.sections.start.title}
          sub={COPY.sections.start.sub}
        />
        <div className="section-shell" data-reveal data-nudge="start">
          <StartWhereYouAre />
        </div>

        {/* 2. SUPPORT MAP AT A GLANCE */}
        <SectionHeader eyebrow={COPY.sections.map.eyebrow} title={COPY.sections.map.title} sub={COPY.sections.map.sub} />
        <div className="section-shell journey-shell" data-nudge="map">
          {JOURNEY.map((j) => (
            <JourneyStage key={j.n} stage={j} />
          ))}
        </div>

        {/* 3. DOWNLOADS */}
        <SectionHeader
          id="downloads"
          eyebrow={COPY.sections.downloads.eyebrow}
          title={COPY.sections.downloads.title}
          sub={COPY.sections.downloads.sub}
        />
        <div className="section-shell" data-reveal data-nudge="downloads">
          <div className="product-grid">
            {PRODUCTS.map((p, i) => (
              <ProductCard key={p.slug} product={p} index={i} />
            ))}
          </div>
        </div>

        {/* 4. FINAL CTA */}
        <section data-nudge="cta" style={{ maxWidth: 760, margin: '96px auto 0', padding: '0 24px', textAlign: 'center' }}>
          <div
            style={{
              background: 'white',
              border: '3px solid var(--ink)',
              borderRadius: 28,
              padding: '44px 32px',
              boxShadow: '0 14px 0 var(--ink), 0 22px 36px rgba(31, 95, 107, 0.18)',
            }}
          >
            <div
              style={{
                fontFamily: "'Archivo Black', sans-serif",
                fontSize: 'clamp(28px, 4vw, 44px)',
                letterSpacing: '-0.03em',
                lineHeight: 1.05,
                color: 'var(--ink)',
                marginBottom: 22,
                textWrap: 'pretty',
              }}
            >
              {COPY.finalCta.titleLead}
              <br />
              <span style={{ color: 'var(--coral)' }}>{COPY.finalCta.titleAccent}</span>
            </div>
            <p style={{ color: 'var(--ink)', opacity: 0.75, fontSize: 16, lineHeight: 1.5, maxWidth: 520, margin: '0 auto 26px' }}>
              {COPY.finalCta.body}
            </p>
            <div style={{ display: 'inline-flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
              <button className="cta-button" onClick={() => scrollTo('#start-here')}>
                {COPY.finalCta.primaryCta}
              </button>
              <button className="cta-button cta-button-ghost" onClick={() => scrollTo('#downloads')}>
                {COPY.finalCta.secondaryCta}
              </button>
            </div>
          </div>
        </section>

        {/* 5. DISCLAIMER */}
        <div style={{ maxWidth: 820, margin: '64px auto 0', padding: '0 24px' }}>
          <div className="disclaimer" style={{ textAlign: 'left' }}>
            <strong style={{ color: 'var(--ink)', fontSize: 14, letterSpacing: '0.02em' }}>{COPY.disclaimerStrong}</strong>
            {COPY.disclaimerBody}
          </div>
        </div>

        <div style={{ marginTop: 24 }}>
          <SiteFooter />
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------------
// Shared bits
// ----------------------------------------------------------------------------

function SectionHeader({ id, eyebrow, title, sub }: { id?: string; eyebrow: string; title: string; sub: string }) {
  return (
    <header id={id} className="section-header" data-reveal>
      <div className="section-eyebrow">
        <span className="section-dot" />
        {eyebrow}
      </div>
      <h2 className="section-title">{title}</h2>
      <p className="section-sub">{sub}</p>
    </header>
  );
}

function JourneyStage({ stage }: { stage: { n: number; title: string; read: string[]; downloads: string[] } }) {
  const [openGuide, setOpenGuide] = React.useState<string | null>(null);

  return (
    <div className="journey-stage" data-stage={stage.n} data-reveal>
      <div className="journey-stage-num">0{stage.n}</div>
      <div className="journey-stage-body">
        <h3 className="journey-stage-title">{stage.title}</h3>
        <div className="journey-cols">
          <div>
            <div className="journey-col-label">Read on site</div>
            <ul className="swyu-read-list">
              {stage.read.map((slug) => {
                const guide = getGuide(slug);
                if (!guide) return null;
                const isOpen = openGuide === slug;
                return (
                  <li key={slug}>
                    <button
                      type="button"
                      className={`swyu-read-item ${isOpen ? 'is-open' : ''}`}
                      onClick={() => setOpenGuide(isOpen ? null : slug)}
                      aria-expanded={isOpen}
                    >
                      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 6 L15 12 L9 18" />
                      </svg>
                      {guide.title}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
          <div>
            <div className="journey-col-label">Downloads</div>
            <div className="tool-chip-row">
              {stage.downloads.map((t) => (
                <span key={t} className="tool-chip">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {openGuide && (
          <div className="journey-guide-card" key={openGuide}>
            <GuideView
              slug={openGuide}
              onBack={() => setOpenGuide(null)}
              backLabel={`Close - back to “${stage.title}”`}
            />
          </div>
        )}
      </div>
    </div>
  );
}

function JourneyProgress({ active }: { active: number }) {
  const steps = [
    { n: 1, label: 'Start' },
    { n: 2, label: 'Evidence' },
    { n: 3, label: 'Waiting' },
    { n: 4, label: 'Admin' },
  ];
  return (
    <aside className="progress-path" aria-hidden="true">
      <div className="pp-line">
        <div
          className="pp-line-fill"
          style={{ '--fill': `${((active - 1) / (steps.length - 1)) * 100}%` } as React.CSSProperties}
        />
      </div>
      {steps.map((s) => (
        <div key={s.n} className={`pp-step ${active >= s.n ? 'reached' : ''} ${active === s.n ? 'current' : ''}`}>
          <div className="pp-dot">
            {active > s.n ? (
              <svg viewBox="0 0 14 14" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 7 L6 10 L11 4" />
              </svg>
            ) : (
              <span>{s.n}</span>
            )}
          </div>
          <div className="pp-label">{s.label}</div>
        </div>
      ))}
    </aside>
  );
}

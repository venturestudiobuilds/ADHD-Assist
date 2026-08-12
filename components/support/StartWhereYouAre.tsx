'use client';

// "Start where you are" — interactive situation picker with reveal panel.
// Clicking a "Read on site" item expands the free guidance for that item to
// fill the panel; a back button returns to the situation overview.

import React from 'react';
import PhaseIcon from '@/components/support/PhaseIcon';
import GuideView from '@/components/support/GuideView';
import { SITUATIONS } from '@/lib/content';
import { getGuide } from '@/lib/guides';

export default function StartWhereYouAre() {
  const [selectedId, setSelectedId] = React.useState(SITUATIONS[0].id);
  const [openGuide, setOpenGuide] = React.useState<string | null>(null);
  const current = SITUATIONS.find((s) => s.id === selectedId) ?? SITUATIONS[0];

  const selectSituation = (id: string) => {
    setSelectedId(id);
    setOpenGuide(null); // switching situation always returns to the overview
  };

  return (
    <div className="swyu">
      <div className="swyu-list">
        {SITUATIONS.map((s, i) => (
          <button
            key={s.id}
            className={`situation-card ${selectedId === s.id ? 'active' : ''}`}
            onClick={() => selectSituation(s.id)}
            style={{ '--ci': i } as React.CSSProperties}
          >
            <div className="situation-letter">{s.letter}</div>
            <div className="situation-icon">
              <PhaseIcon kind={s.icon} />
            </div>
            <div className="situation-card-text">
              <div className="situation-card-title">{s.title}</div>
            </div>
            <svg className="situation-chev" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 6 L15 12 L9 18" />
            </svg>
          </button>
        ))}
      </div>

      <div className="swyu-panel" data-nudge="reveal">
        {openGuide ? (
          <GuideView
            key={openGuide}
            slug={openGuide}
            onBack={() => setOpenGuide(null)}
            backLabel={`Back to “${current.title}”`}
          />
        ) : (
          <div className="swyu-panel-inner" key={current.id}>
            <div className="swyu-panel-header">
              <div className="swyu-panel-letter">{current.letter}</div>
              <div>
                <div className="swyu-panel-eyebrow">You&rsquo;re here</div>
                <h3 className="swyu-panel-title">{current.title}</h3>
              </div>
            </div>
            <p className="swyu-panel-blurb">{current.blurb}</p>

            <div className="swyu-panel-section">
              <div className="swyu-section-label">
                <span className="swyu-section-dot" />
                Read on site
              </div>
              <ul className="swyu-read-list">
                {current.read.map((slug) => {
                  const guide = getGuide(slug);
                  if (!guide) return null;
                  return (
                    <li key={slug}>
                      <button
                        type="button"
                        className="swyu-read-item"
                        onClick={() => setOpenGuide(slug)}
                        aria-expanded={false}
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

            <div className="swyu-panel-section">
              <div className="swyu-section-label">
                <span className="swyu-section-dot swyu-section-dot-alt" />
                If you want it laid out for you
              </div>
              <div className="tool-chip-row">
                {current.downloads.map((d) => (
                  <span key={d} className="tool-chip tool-chip-download">
                    {d}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

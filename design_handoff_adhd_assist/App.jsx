// App.jsx — root component for ADHD Assist landing page
// Hero with dense maze + simulated /support page

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "brainSpeed": 1.0,
  "palette": ["#CFEFED", "#F5F1E8", "#FF6B6B", "#FFB3C1", "#1F5F6B"],
  "difficulty": "normal",
  "particles": true,
  "distractions": true,
  "parallax": 1.0,
  "tone": "funny"
}/*EDITMODE-END*/;

// [bg, stage, accent (coral/orange), brain, ink]
const PALETTES = [
  ['#CFEFED', '#F5F1E8', '#FF6B6B', '#FFB3C1', '#1F5F6B'], // aqua bg + cream tiles (default)
  ['#F5F1E8', '#CFEFED', '#FF6B6B', '#FFB3C1', '#1F5F6B'], // cream bg + aqua tiles
  ['#CFEFED', '#F5F1E8', '#FFA94D', '#FFD9B0', '#1F5F6B'], // aqua + warm orange
  ['#1F5F6B', '#2C7280', '#FF6B6B', '#FFB3C1', '#F5F1E8'], // deep petrol (dark)
];

function applyPalette(p) {
  const [bg, stage, accent, brain, ink] = p;
  const root = document.documentElement;
  root.style.setProperty('--bg', bg);
  root.style.setProperty('--bg-deep', shade(bg, -8));
  root.style.setProperty('--stage', stage);
  root.style.setProperty('--floor', stage);
  root.style.setProperty('--floor-2', shade(stage, -10));
  root.style.setProperty('--coral', accent);
  root.style.setProperty('--wall', accent);
  root.style.setProperty('--wall-shade', shade(accent, -18));
  root.style.setProperty('--wall-deep', shade(accent, -32));
  root.style.setProperty('--brain', brain);
  root.style.setProperty('--brain-line', shade(brain, -30));
  root.style.setProperty('--ink', ink);
  root.style.setProperty('--ink-soft', shade(ink, ink === '#F5F1E8' ? -20 : 18));
}

function shade(hex, amt) {
  const h = hex.replace('#', '');
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  const adj = (v) => {
    const t = amt > 0 ? 255 : 0;
    return Math.round(v + (t - v) * Math.abs(amt) / 100);
  };
  const toHex = (v) => v.toString(16).padStart(2, '0');
  return '#' + toHex(adj(r)) + toHex(adj(g)) + toHex(adj(b));
}

function App() {
  const [t, setTweak] = window.useTweaks(TWEAK_DEFAULTS);
  const [page, setPage] = React.useState('hero');
  const [mazeSeed, setMazeSeed] = React.useState(7);

  React.useEffect(() => { applyPalette(t.palette); }, [t.palette]);

  return (
    <div style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
      {t.particles && <window.BackgroundParticles />}

      {page === 'hero' && (
        <Hero
          tweaks={t}
          onSupport={() => { setPage('support'); window.scrollTo(0, 0); }}
          mazeSeed={mazeSeed}
        />
      )}
      {page === 'support' && (
        <window.Support onBack={() => { setPage('hero'); window.scrollTo(0, 0); }} />
      )}

      <window.TweaksPanel>
        <window.TweakSection label="Maze" />
        <window.TweakSlider
          label="Brain speed"
          value={t.brainSpeed}
          min={0.4}
          max={2.2}
          step={0.1}
          unit="×"
          onChange={(v) => setTweak('brainSpeed', v)}
        />
        <window.TweakRadio
          label="Difficulty"
          value={t.difficulty}
          options={['easy', 'normal', 'hard']}
          onChange={(v) => setTweak('difficulty', v)}
        />
        <window.TweakSlider
          label="Tilt / parallax"
          value={t.parallax}
          min={0}
          max={2.5}
          step={0.1}
          unit="×"
          onChange={(v) => setTweak('parallax', v)}
        />
        <window.TweakButton
          label="New maze layout"
          onClick={() => { setMazeSeed(Math.floor(Math.random() * 9999)); }}
        />

        <window.TweakSection label="Vibe" />
        <window.TweakColor
          label="Palette"
          value={t.palette}
          options={PALETTES}
          onChange={(v) => setTweak('palette', v)}
        />
        <window.TweakRadio
          label="Message tone"
          value={t.tone}
          options={['funny', 'gentle', 'blunt']}
          onChange={(v) => setTweak('tone', v)}
        />
        <window.TweakToggle
          label="Background particles"
          value={t.particles}
          onChange={(v) => setTweak('particles', v)}
        />
        <window.TweakToggle
          label="Thought bubbles"
          value={t.distractions}
          onChange={(v) => setTweak('distractions', v)}
        />
      </window.TweaksPanel>
    </div>
  );
}

// Friendly "note from the maker" that opens from the top-nav About item.
// Desktop: hover to open. Touch: tap to toggle (with a close button).
function AboutNav({ onSupport }) {
  const [open, setOpen] = React.useState(false);
  const [isTouch, setIsTouch] = React.useState(false);
  const wrapRef = React.useRef(null);
  const closeTimer = React.useRef(null);

  React.useEffect(() => {
    setIsTouch(window.matchMedia('(hover: none), (pointer: coarse)').matches);
  }, []);

  // Close on outside click / tap and on Escape.
  React.useEffect(() => {
    if (!open) return undefined;
    const onDoc = (e) => { if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false); };
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('touchstart', onDoc, { passive: true });
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('touchstart', onDoc);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const openNow = () => { clearTimeout(closeTimer.current); setOpen(true); };
  const closeSoon = () => { clearTimeout(closeTimer.current); closeTimer.current = setTimeout(() => setOpen(false), 160); };
  const hoverProps = isTouch ? {} : { onMouseEnter: openNow, onMouseLeave: closeSoon, onFocus: openNow, onBlur: closeSoon };

  return (
    <div ref={wrapRef} className="about-nav" {...hoverProps}>
      <button
        type="button"
        className="about-trigger"
        aria-expanded={open}
        aria-haspopup="dialog"
        onClick={() => setOpen((o) => !o)}
      >
        About
      </button>

      <div className={`about-card ${open ? 'open' : ''}`} role="dialog" aria-label="About ADHD Assist">
        {isTouch && (
          <button type="button" className="about-close" aria-label="Close" onClick={() => setOpen(false)}>
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
              <path d="M6 6 L18 18 M18 6 L6 18" />
            </svg>
          </button>
        )}
        <div className="about-card-eyebrow">A note from the maker</div>
        <h3 className="about-card-title">Built by someone who gets the maze.</h3>
        <p className="about-card-body">
          I made ADHD Assist because getting support can feel like trying to explain your whole
          brain while your brain has left the meeting. This site is here to make the next step
          feel smaller, clearer, and less lonely.
        </p>
        <p className="about-card-signoff">No perfect plan required. Just one useful step.</p>
        <button
          type="button"
          className="about-card-cta"
          onClick={() => { setOpen(false); onSupport(); }}
        >
          Find support
        </button>
      </div>
    </div>
  );
}

function Hero({ tweaks, onSupport, mazeSeed }) {
  const [engaged, setEngaged] = React.useState(false);
  return (
    <div className="fade-in" style={{
      minHeight: '100vh',
      background: 'var(--bg)',
      padding: '24px 24px 80px',
      position: 'relative',
      zIndex: 2,
    }}>
      {/* Top brand bar */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: 1200,
        margin: '0 auto 28px',
      }}>
        <div className="brand-pill">
          <div className="brand-dot" />
          ADHD&nbsp;ASSIST
        </div>
        <div className="hero-nav-right" style={{ display: 'flex', gap: 14, alignItems: 'center', fontSize: 13, fontWeight: 700, color: 'var(--ink)', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
          <AboutNav onSupport={onSupport} />
          <span className="hero-nav-resources" style={{ opacity: 0.7, cursor: 'default' }}>Resources</span>
          <button
            className="back-btn"
            style={{ padding: '8px 14px', fontSize: 13 }}
            onClick={onSupport}
          >
            Get support →
          </button>
        </div>
      </div>

      {/* Hero stage */}
      <div style={{
        maxWidth: 1080,
        margin: '0 auto',
        position: 'relative',
      }}>
        {/* Thought bubbles scattered around the stage */}
        {tweaks.distractions && <window.ThoughtBubbles />}
        {/* Hero headline — bold, two-line, sits above the maze. */}
        <div style={{
          position: 'relative',
          marginBottom: 24,
          textAlign: 'center',
          pointerEvents: 'none',
          padding: '4px 0',
        }}>
          <div style={{
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
          }}>
            <div>WHICH&nbsp;WAY</div>
            <div style={{ marginTop: '-0.04em' }}>
              NOW
              <span style={{ color: 'var(--ink)', WebkitTextStroke: '0', display: 'inline' }}>?</span>
            </div>
          </div>
        </div>

        {/* Stage card */}
        <div className="stage-card" style={{
          padding: 'clamp(20px, 3vw, 32px)',
          position: 'relative',
        }}>
          {/* Scene labels */}
          <div style={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            marginBottom: 18,
            padding: '0 4px',
          }}>
            <div style={{
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: '0.18em',
              color: 'var(--ink)',
              opacity: 0.55,
            }}>
              ◆ SCENE 01 - THE MAZE
            </div>
          </div>

          {/* Maze */}
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <window.Maze
              tweaks={tweaks}
              mazeSeed={mazeSeed}
              onEngage={() => setEngaged(true)}
            />
          </div>
        </div>

        {/* Sub copy */}
        <div style={{ marginTop: 48, padding: '0 16px' }}>
          <div className="sub-copy">
            ADHD can make every route feel like{' '}
            <span style={{ color: 'var(--coral)' }}>another thought.</span>
          </div>
        </div>

        {/* CTA section */}
        <div style={{ marginTop: 36, textAlign: 'center', padding: '0 16px' }}>
          <div style={{
            fontSize: 'clamp(16px, 1.6vw, 19px)',
            color: 'var(--ink)',
            fontWeight: 700,
            maxWidth: 560,
            margin: '0 auto 22px',
            lineHeight: 1.55,
          }}>
            You don't need to solve the maze.<br />
            You just need one useful next step.
          </div>
          <div className={`cta-cluster ${engaged ? 'is-engaged' : ''}`} style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
            <button
              className={`cta-button ${engaged ? 'cta-button-nudge' : ''}`}
              onClick={onSupport}
            >
              Get ADHD support
            </button>
            {engaged && (
              <div className="cta-reassure">
                You don't have to keep circling this alone.
              </div>
            )}
          </div>
        </div>
      </div>

      <div style={{ height: 40 }} />
    </div>
  );
}

window.App = App;

// Support.jsx — Calm support hub.
// Sections: Hero → Start where you are → Support map at a glance →
//           Downloads → Final CTA → Disclaimer.

// ============================================================================
// Page data
// ============================================================================

const WORRIES = [
  { text: 'What route do I choose?',  x: -60,  y: -80, rot: -5, w: 180 },
  { text: 'What if I freeze?',        x: 10,   y: 50,  rot: 4,  w: 130 },
  { text: 'What do I say to the GP?', x: -80,  y: 180, rot: -4, w: 190 },
  { text: 'How do I explain it?',     x: 0,    y: 300, rot: 4,  w: 170 },
  { text: 'What if I wait months?',   x: -735, y: 400, rot: 5,  w: 185 },
  { text: 'What happens next?',       x: -500, y: 460, rot: -5, w: 160 },
  { text: 'Childhood examples?',      x: -260, y: 400, rot: 4,  w: 160 },
  { text: 'How do I keep track?',     x: -15,  y: 450, rot: -4, w: 165 },
];

// "Start where you are" — situation cards + reveal panel
const SITUATIONS = [
  {
    id: 'a', letter: 'A', icon: 'lightbulb',
    title: 'I think I might have ADHD',
    blurb: "You're noticing the pattern. Maybe for the first time, maybe for the hundredth.",
    read: [
      'What ADHD can look like',
      'Common signs and patterns',
      'UK support links and charities',
      'Understanding assessment options',
    ],
    downloads: ['Symptom Evidence Starter', 'Mini Diagnosis Prep Pack'],
  },
  {
    id: 'b', letter: 'B', icon: 'compass',
    title: "I haven't spoken to my GP yet",
    blurb: 'You\'re ready to do something about it, but the appointment hasn\'t happened.',
    read: [
      'Preparing for your GP appointment',
      'What examples to collect',
      'What to say if you freeze',
    ],
    downloads: ['GP Appointment Prep Sheet', 'Phone Script Bank', 'Symptom Evidence Builder'],
  },
  {
    id: 'c', letter: 'C', icon: 'clipboard',
    title: 'I have a GP appointment booked',
    blurb: 'Walk in with the few things written down that turn 8 minutes into something useful.',
    read: [
      'GP appointment guide',
      'Top 3 struggles to write down',
      'Example wording',
    ],
    downloads: ['GP Summary Template', 'Appointment Prep Kit', 'One-Page Evidence Summary'],
  },
  {
    id: 'd', letter: 'D', icon: 'refresh',
    title: "I've been referred and I'm waiting",
    blurb: 'The hardest stage, because it can quietly delete itself if you don\'t track it.',
    read: [
      'While-you-wait guidance',
      'How to keep track of referral / admin',
      'Overwhelm support',
    ],
    downloads: ['Weekly Survival Planner', 'Admin Tracker', 'Referral Status Tracker'],
  },
  {
    id: 'e', letter: 'E', icon: 'table',
    title: "I'm comparing providers",
    blurb: 'You have options. The right one depends on cost, waits, follow-up, and shared care.',
    read: [
      'Provider questions',
      'Cost considerations',
      'What to check before choosing',
    ],
    downloads: ['Provider Comparison Tracker', 'Private Cost Planner'],
  },
  {
    id: 'f', letter: 'F', icon: 'pill',
    title: "I'm starting medication / titration",
    blurb: 'Track it cleanly now so review appointments aren\'t guesswork later.',
    read: [
      'What to track',
      'Questions to ask',
      'Shared care overview',
      'This is preparation, not medical advice',
    ],
    downloads: ['Medication / Titration Notes', 'Shared Care Questions', 'Appointment Log'],
  },
];

// Compact 4-stage support map
const JOURNEY = [
  {
    n: 1, title: 'Start Here',
    read: ['Route explainer', 'What to do first'],
    downloads: ['GP Appointment Prep Sheet', 'Phone Script Bank'],
  },
  {
    n: 2, title: 'Prepare Your Evidence',
    read: ['Symptom evidence starter', 'What examples count?'],
    downloads: ['Full Evidence Builder', 'Childhood & Adult Worksheet', 'Referral Evidence Summary'],
  },
  {
    n: 3, title: 'While You Wait',
    read: ['Waiting survival tips', 'Overwhelm support'],
    downloads: ['Weekly Survival Planner', 'Admin Tracker', 'Referral Status Tracker'],
  },
  {
    n: 4, title: 'Serious Admin',
    read: ['Provider questions', 'Shared care overview'],
    downloads: ['Provider Comparison Spreadsheet', 'Medication / Titration Notes', 'Private Cost Planner'],
  },
];

const PRODUCTS = [
  {
    label: 'Free starter', highlight: false,
    title: 'Mini Starter Pack',
    desc: 'A taste of everything, enough to get you to your GP appointment.',
    items: ['Mini route explainer', 'GP prep starter', 'Brain-freeze script', 'Symptom evidence starter', 'One overwhelm prompt'],
    cta: 'Download free',
  },
  {
    label: 'Starter Pack', highlight: false,
    title: 'GP Appointment Prep Kit',
    desc: 'Everything you need for the GP step, printed and ready.',
    items: ['GP prep sheet', 'Phone scripts', 'Online form wording', 'Appointment summary template', 'Follow-up checklist'],
    cta: 'View pack',
  },
  {
    label: 'Complete Pack', highlight: true,
    title: 'Full Diagnosis Prep & Survival Pack',
    desc: 'The whole thing, from suspicion to titration. Most people start here.',
    items: ['Evidence builder', 'Childhood / adult worksheet', 'Provider tracker', 'Referral tracker', 'Weekly survival planner', 'AI prompt pack', 'Shared care questions'],
    cta: 'View pack',
  },
  {
    label: 'Tracker Pack', highlight: false,
    title: 'Admin Dashboard Add-On',
    desc: 'For people who want a real tracking system. Editable spreadsheet or Notion.',
    items: ['Provider comparison tracker', 'Referral status tracker', 'Appointment log', 'Medication / titration notes', 'Document checklist'],
    cta: 'View pack',
  },
];

// ============================================================================
// Editable page copy — single source of truth for all prose on the support
// hub. Edit these strings (or the SITUATIONS / JOURNEY / PRODUCTS data above)
// without touching layout/JSX. Treat values as placeholders to be replaced.
// ============================================================================

const COPY = {
  brand: 'ADHD ASSIST',
  backToMaze: 'Back to maze',
  hero: {
    eyebrow: '✦ ADHD support hub',
    titleLead: 'Find your way',
    titleAccent: 'through.',
    body: "You don't need to solve the whole maze today. Start with one useful step, "
      + "one clear explanation, or one script you can actually use when your brain goes blank.",
    note: 'Guidance is available directly on this page. Optional downloads are the same '
      + 'content, just laid out and ready to print or fill in.',
    primaryCta: 'Start with the guidance →',
    secondaryCta: 'View the downloads',
    scrollNudge: 'Scroll - chaos becomes clear',
  },
  sections: {
    start: {
      eyebrow: 'Start where you are',
      title: 'Pick the situation that sounds closest',
      sub: "We'll show the most useful guidance first, then the optional downloads if you want them.",
    },
    map: {
      eyebrow: 'Support map',
      title: 'At a glance',
      sub: 'Skim the route. Open the bit that matches where you are.',
    },
    downloads: {
      eyebrow: 'Downloads',
      title: 'Download the ready-made tools',
      sub: "The guidance is here whenever you need it. If you'd rather have the templates, "
        + 'scripts and trackers already laid out for you, you can download the ready-made packs below.',
    },
  },
  productFlag: 'Most start here',
  finalCta: {
    titleLead: "You don't have to do everything today.",
    titleAccent: "Pick the stage you're in.",
    body: "Read one guide. Or download the tool that makes the next step easier. That's the whole point.",
    primaryCta: 'Start with the guidance →',
    secondaryCta: 'View the downloads',
  },
  disclaimerStrong: 'Educational only.',
  disclaimerBody: ' This website and any downloads are for education, organisation and appointment '
    + 'preparation only. They are not medical advice, not a diagnostic tool, and not a replacement for '
    + 'assessment or support from a qualified healthcare professional. ADHD can only be diagnosed by an '
    + 'appropriately qualified clinician. If you are worried about your health, medication, safety, or '
    + 'mental health, contact your GP, NHS 111, emergency services, or an appropriate crisis support service.',
  footer: 'MADE WITH PATIENCE · FOR PEOPLE WHO LOST THEIRS',
};

// ============================================================================
// Icons
// ============================================================================

function PhaseIcon({ kind }) {
  const stroke = 'var(--ink)';
  const fill = 'var(--coral)';
  const sw = 2.2;
  switch (kind) {
    case 'compass':
      return (<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M15 9 L12 14 L9 15 L12 10 Z" fill={fill} stroke="none" />
        <circle cx="12" cy="12" r="1.2" fill={stroke} stroke="none" />
      </svg>);
    case 'clipboard':
      return (<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="4" width="14" height="17" rx="2" />
        <rect x="9" y="2" width="6" height="4" rx="1" fill={fill} />
        <line x1="8" y1="11" x2="16" y2="11" /><line x1="8" y1="15" x2="13" y2="15" />
      </svg>);
    case 'refresh':
      return (<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 12 a9 9 0 0 1 15 -6.7 L21 7" /><path d="M21 4 v3 h-3" />
        <path d="M21 12 a9 9 0 0 1 -15 6.7 L3 17" /><path d="M3 20 v-3 h3" />
      </svg>);
    case 'table':
      return (<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <line x1="3" y1="10" x2="21" y2="10" /><line x1="3" y1="14" x2="21" y2="14" />
        <line x1="9" y1="5" x2="9" y2="19" /><line x1="15" y1="5" x2="15" y2="19" />
        <rect x="9.5" y="10.5" width="5" height="3" fill={fill} stroke="none" />
      </svg>);
    case 'pill':
      return (<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
        <g transform="rotate(-30 12 12)">
          <rect x="2" y="9" width="20" height="6" rx="3" />
          <rect x="2" y="9" width="10" height="6" rx="3" fill={fill} fillOpacity="0.4" stroke="none" />
          <line x1="12" y1="9" x2="12" y2="15" />
        </g>
      </svg>);
    case 'lightbulb':
      return (<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 18 h6 M10 21 h4" />
        <path d="M12 3 a6 6 0 0 0 -4 10 c1 1 1.5 2 1.5 3 v1 h5 v-1 c0 -1 0.5 -2 1.5 -3 a6 6 0 0 0 -4 -10 z" fill={fill} fillOpacity="0.3" />
      </svg>);
    default: return null;
  }
}

// ============================================================================
// Support page
// ============================================================================

function Support({ onBack }) {
  const [activeStage, setActiveStage] = React.useState(1);
  const heroRef = React.useRef(null);

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
            const s = e.target.dataset.stage;
            if (s) setActiveStage(Number(s));
          }
        });
      },
      { rootMargin: '-30% 0px -30% 0px', threshold: 0 }
    );
    document.querySelectorAll('[data-reveal], [data-stage]').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (sel) => {
    const el = document.querySelector(sel);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="fade-in support-page" style={{
      minHeight: '100vh',
      background: 'var(--bg)',
      paddingBottom: 80,
      position: 'relative',
      zIndex: 2,
    }}>
      {/* Top bar */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        maxWidth: 1200, margin: '0 auto', padding: '24px 24px 8px',
      }}>
        <div className="brand-pill"><div className="brand-dot" /> {COPY.brand}</div>
        <button className="back-btn" onClick={onBack}>
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 6 L9 12 L15 18" />
          </svg>
          {COPY.backToMaze}
        </button>
      </div>

      <JourneyProgress active={activeStage} />

      <ScrollNudges />

      {/* HERO */}
      <section ref={heroRef} data-nudge="hero" className="support-hero" style={{
        position: 'relative', maxWidth: 1080, margin: '0 auto',
        padding: '48px 24px 200px',
      }}>
        <div style={{ position: 'relative', zIndex: 2, maxWidth: 720 }}>
          <div className="hero-eyebrow">{COPY.hero.eyebrow}</div>
          <h1 style={{
            fontFamily: "'Archivo Black', sans-serif",
            fontSize: 'clamp(40px, 8vw, 96px)',
            letterSpacing: '-0.04em', lineHeight: 0.95,
            margin: '0 0 24px', color: 'var(--ink)', textWrap: 'pretty',
          }}>
            {COPY.hero.titleLead}<br />
            <span style={{ color: 'var(--coral)' }}>{COPY.hero.titleAccent}</span>
          </h1>
          <p style={{
            fontSize: 'clamp(18px, 1.9vw, 22px)', color: 'var(--ink)', opacity: 0.85,
            lineHeight: 1.45, margin: '0 0 14px', fontWeight: 600,
            maxWidth: 600, textWrap: 'pretty',
          }}>
            {COPY.hero.body}
          </p>
          <p style={{
            fontSize: 14, color: 'var(--ink)', opacity: 0.6,
            lineHeight: 1.5, margin: '0 0 30px', maxWidth: 600,
            fontWeight: 500,
          }}>
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
            <div key={i} className="worry"
              style={{
                '--wx': `${w.x}px`,
                '--wy': `${w.y}px`,
                '--wrot': `${w.rot}deg`,
                '--wi': i,
                width: w.w,
              }}
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
      <SectionHeader
        eyebrow={COPY.sections.map.eyebrow}
        title={COPY.sections.map.title}
        sub={COPY.sections.map.sub}
      />
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
            <div key={p.title} className={`product-card ${p.highlight ? 'product-card-featured' : ''}`} style={{ '--ci': i }}>
              {p.highlight && <div className="product-flag">{COPY.productFlag}</div>}
              <div className={`tag ${p.label.toLowerCase().includes('free') ? 'tag-free' : 'tag-paid'}`}>{p.label}</div>
              <h3 className="product-title">{p.title}</h3>
              <p className="product-desc">{p.desc}</p>
              <ul className="product-list">
                {p.items.map((it) => (
                  <li key={it}>
                    <svg viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 8 L7 12 L13 4" />
                    </svg>
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
              <button className={`product-cta ${p.highlight ? 'product-cta-primary' : ''}`}>
                {p.cta}
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 6 L15 12 L9 18" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 4. FINAL CTA */}
      <section data-nudge="cta" style={{ maxWidth: 760, margin: '96px auto 0', padding: '0 24px', textAlign: 'center' }}>
        <div style={{
          background: 'white', border: '3px solid var(--ink)', borderRadius: 28,
          padding: '44px 32px',
          boxShadow: '0 14px 0 var(--ink), 0 22px 36px rgba(31, 95, 107, 0.18)',
        }}>
          <div style={{
            fontFamily: "'Archivo Black', sans-serif",
            fontSize: 'clamp(28px, 4vw, 44px)',
            letterSpacing: '-0.03em', lineHeight: 1.05,
            color: 'var(--ink)', marginBottom: 22, textWrap: 'pretty',
          }}>
            {COPY.finalCta.titleLead}<br />
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

      <div style={{
        textAlign: 'center', marginTop: 48,
        opacity: 0.55, fontSize: 12, fontWeight: 600,
        color: 'var(--ink)', letterSpacing: '0.08em',
      }}>
        {COPY.footer}
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------------
// Start Where You Are — interactive situation picker
// ----------------------------------------------------------------------------

function StartWhereYouAre() {
  const [selectedId, setSelectedId] = React.useState(SITUATIONS[0].id);
  const current = SITUATIONS.find((s) => s.id === selectedId);

  return (
    <div className="swyu">
      <div className="swyu-list">
        {SITUATIONS.map((s, i) => (
          <button
            key={s.id}
            className={`situation-card ${selectedId === s.id ? 'active' : ''}`}
            onClick={() => setSelectedId(s.id)}
            style={{ '--ci': i }}
          >
            <div className="situation-letter">{s.letter}</div>
            <div className="situation-icon"><PhaseIcon kind={s.icon} /></div>
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
        <div className="swyu-panel-inner" key={current.id}>
          <div className="swyu-panel-header">
            <div className="swyu-panel-letter">{current.letter}</div>
            <div>
              <div className="swyu-panel-eyebrow">You're here</div>
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
              {current.read.map((r) => (
                <li key={r}>
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 6 L15 12 L9 18" />
                  </svg>
                  {r}
                </li>
              ))}
            </ul>
          </div>

          <div className="swyu-panel-section">
            <div className="swyu-section-label">
              <span className="swyu-section-dot swyu-section-dot-alt" />
              If you want it laid out for you
            </div>
            <div className="tool-chip-row">
              {current.downloads.map((d) => (
                <span key={d} className="tool-chip tool-chip-download">{d}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------------
// Shared bits
// ----------------------------------------------------------------------------

function SectionHeader({ id, eyebrow, title, sub }) {
  return (
    <header id={id} className="section-header" data-reveal>
      <div className="section-eyebrow"><span className="section-dot" />{eyebrow}</div>
      <h2 className="section-title">{title}</h2>
      <p className="section-sub">{sub}</p>
    </header>
  );
}

function JourneyStage({ stage }) {
  return (
    <div className="journey-stage" data-stage={stage.n} data-reveal>
      <div className="journey-stage-num">0{stage.n}</div>
      <div className="journey-stage-body">
        <h3 className="journey-stage-title">{stage.title}</h3>
        <div className="journey-cols">
          <div>
            <div className="journey-col-label">Read on site</div>
            <ul className="journey-list">{stage.read.map((f) => <li key={f}>{f}</li>)}</ul>
          </div>
          <div>
            <div className="journey-col-label">Downloads</div>
            <div className="tool-chip-row">
              {stage.downloads.map((t) => <span key={t} className="tool-chip">{t}</span>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function JourneyProgress({ active }) {
  const steps = [
    { n: 1, label: 'Start' },
    { n: 2, label: 'Evidence' },
    { n: 3, label: 'Waiting' },
    { n: 4, label: 'Admin' },
  ];
  return (
    <aside className="progress-path" aria-hidden="true">
      <div className="pp-line">
        <div className="pp-line-fill" style={{ '--fill': `${((active - 1) / (steps.length - 1)) * 100}%` }} />
      </div>
      {steps.map((s) => (
        <div key={s.n} className={`pp-step ${active >= s.n ? 'reached' : ''} ${active === s.n ? 'current' : ''}`}>
          <div className="pp-dot">
            {active > s.n ? (
              <svg viewBox="0 0 14 14" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 7 L6 10 L11 4" />
              </svg>
            ) : (<span>{s.n}</span>)}
          </div>
          <div className="pp-label">{s.label}</div>
        </div>
      ))}
    </aside>
  );
}

function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }

// ============================================================================
// Hero-side effects
// ============================================================================

function BackgroundParticles() {
  const particles = React.useMemo(() => Array.from({ length: 14 }).map((_, i) => ({
    id: i, left: Math.random() * 100,
    delay: Math.random() * -25, duration: 22 + Math.random() * 18,
    size: 16 + Math.random() * 28,
    kind: Math.random() < 0.5 ? 'bubble' : (Math.random() < 0.5 ? 'squiggle' : 'dot'),
    opacity: 0.18 + Math.random() * 0.18,
  })), []);

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 1, overflow: 'hidden' }}>
      {particles.map((p) => (
        <div key={p.id} style={{
          position: 'absolute', left: `${p.left}%`, bottom: -100,
          width: p.size, height: p.size,
          animation: `floatUp ${p.duration}s linear ${p.delay}s infinite`,
          opacity: p.opacity,
        }}>
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

const HERO_THOUGHTS = [
  'New idea!', 'Wait, what was I doing?', 'Do that now.', 'No, do this first.',
  'Oh that\'s interesting…', 'I should reply to that.', 'Quick side quest.',
  'Don\'t forget that thing.', 'Actually, life plan.', 'Why am I like this?',
  'This might fix everything.', 'Hang on.', 'Important!', 'What if…',
  'I\'ll do it in a minute.', 'Right. Focus.',
];

const BUBBLE_POSITIONS = [
  { top: 110, left: -190, rot: -5, delay: 0.10, narrow: true, size: 'md' },
  { top: 360, left: -210, rot: 3,  delay: 0.55, narrow: true, size: 'sm' },
  { top: 640, left: -180, rot: -3, delay: 1.00, narrow: true, size: 'md' },
  { top: 160, right: -200, rot: 4, delay: 0.30, narrow: true, size: 'sm' },
  { top: 420, right: -220, rot: -4, delay: 0.75, narrow: true, size: 'md' },
  { top: 700, right: -180, rot: 5, delay: 1.20, narrow: true, size: 'sm' },
];

function ThoughtBubble({ text, top, left, right, rot, delay, size, narrow, onClick }) {
  return (
    <div
      className={`thought-bubble ${narrow ? 'tb-side' : 'tb-corner'} tb-${size}`}
      style={{
        position: 'absolute', top,
        left: left !== undefined ? left : 'auto',
        right: right !== undefined ? right : 'auto',
        '--rot': `${rot}deg`,
        '--delay': `${delay}s`,
        pointerEvents: 'auto',
      }}
    >
      <button type="button" onClick={onClick} className="thought-bubble-inner" aria-label={`Thought: ${text}`}>
        <span>{text}</span>
        <span className={`tb-tail tb-tail-big ${left !== undefined ? 'tail-right' : 'tail-left'}`} />
        <span className={`tb-tail tb-tail-small ${left !== undefined ? 'tail-right' : 'tail-left'}`} />
      </button>
    </div>
  );
}

function ThoughtBubbles() {
  const initial = React.useMemo(() => {
    const shuffled = [...HERO_THOUGHTS].sort(() => Math.random() - 0.5);
    return BUBBLE_POSITIONS.map((_, i) => shuffled[i % shuffled.length]);
  }, []);
  const [thoughts, setThoughts] = React.useState(initial);
  const swap = (idx) => {
    setThoughts((cur) => {
      const next = [...cur];
      const available = HERO_THOUGHTS.filter((t) => !next.includes(t));
      if (available.length) next[idx] = available[Math.floor(Math.random() * available.length)];
      else { const others = HERO_THOUGHTS.filter((t) => t !== cur[idx]); next[idx] = others[Math.floor(Math.random() * others.length)]; }
      return next;
    });
  };
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 3 }}>
      {BUBBLE_POSITIONS.map((pos, i) => (
        <ThoughtBubble key={i} {...pos} text={thoughts[i]} onClick={() => swap(i)} />
      ))}
    </div>
  );
}

window.Support = Support;
window.BackgroundParticles = BackgroundParticles;
window.ThoughtBubbles = ThoughtBubbles;

// ============================================================================
// ScrollNudges — gentle, scroll-triggered supportive thought bubbles.
// One at a time, fades in / holds / fades out, each section fires once.
// Decorative only (aria-hidden); page works perfectly without it.
// ============================================================================

const NUDGE_MESSAGES = {
  hero:      "You don't need to read everything.",
  start:     "Pick the bit that sounds most like you.",
  reveal:    "Start with the loudest problem.",
  map:       "One section at a time.",
  downloads: "Read first. Download later if it helps.",
  cta:       "This might be enough for today.",
};

function ScrollNudges() {
  const [active, setActive] = React.useState(null); // { text, phase }
  const queueRef = React.useRef([]);
  const shownRef = React.useRef(new Set());
  const busyRef = React.useRef(false);
  const timersRef = React.useRef([]);

  const pump = React.useCallback(() => {
    if (busyRef.current) return;
    const text = queueRef.current.shift();
    if (!text) return;
    busyRef.current = true;
    setActive({ text, phase: 'in' });

    const HOLD = 4200;   // visible time
    const OUT = 650;     // fade-out duration
    const GAP = 1100;    // calm pause before the next one

    timersRef.current.push(setTimeout(() => {
      setActive({ text, phase: 'out' });
    }, HOLD));
    timersRef.current.push(setTimeout(() => {
      setActive(null);
      busyRef.current = false;
      pump();
    }, HOLD + OUT + GAP));
  }, []);

  React.useEffect(() => {
    const els = Array.from(document.querySelectorAll('[data-nudge]'));
    if (!els.length) return undefined;

    let lastRun = 0;
    let trailing = 0;
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
          shownRef.current.add(key);   // each section nudges only once
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
      if (since >= 120) { check(); }
      else { clearTimeout(trailing); trailing = setTimeout(check, 120 - since); }
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

  // Portal to <body> so the fixed bubble anchors to the viewport, immune to
  // the entrance-transform on .support-page (a transformed ancestor would
  // otherwise become its containing block).
  return ReactDOM.createPortal(
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

window.ScrollNudges = ScrollNudges;
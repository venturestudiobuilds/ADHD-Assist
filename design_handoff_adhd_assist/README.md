# Handoff: ADHD Assist — Landing Maze + Support Hub

## Overview
ADHD Assist is a two-screen marketing/support site:

1. **Landing screen ("WHICH WAY NOW?")** — a calm hero with an interactive circular (theta) **maze** used purely as an *ambient visual metaphor* for ADHD confusion. A small "brain" character sits in the centre of the maze and can be nudged around the corridors with an on-screen joystick. There is **no goal, no win/lose state, and no exit** — it is decorative/expressive, not a game. The screen's job is to set tone and drive the user to the support hub via a clear CTA.
2. **Support hub** — the main content page. A hero, an interactive "Start where you are" situation picker, a 4-stage "support map", a downloads/packs grid, a final CTA, and a medical disclaimer. Gentle scroll-triggered "nudge" bubbles appear one at a time as the user scrolls.

## About the Design Files
The files in this bundle are **design references created in HTML/React-via-Babel** — prototypes that show the intended look, copy, and behaviour. They are **not** production code to ship as-is (they use in-browser Babel and a single global `window.*` component registry, which is fine for a prototype but not for production).

Your task is to **recreate these designs in the target codebase's environment**, using its established patterns, component library, routing, and build tooling. If no codebase exists yet, **React + Vite + TypeScript** is the most natural fit (the prototype is already React/JSX). Treat the `.jsx` files as the source of truth for structure, logic, and copy; treat `styles.css` as the source of truth for visual tokens and component styling.

## Fidelity
**High-fidelity (hifi).** Final colours, typography, spacing, copy, and interactions are all present and intended. Recreate the UI faithfully. The maze physics, joystick, and scroll-nudge logic are real and should be ported, not re-invented.

---

## Engineering Handoff Notes (refactor plan)
A concise, build-ready checklist. The detailed sections below (Screens, Maze details, Interactions, Responsive, Tokens) are the reference; this is the plan.

### A. Page structure
- **`/` — Landing / maze page** (`App.jsx` → `Hero` + `Maze.jsx`). Hero with the circular maze metaphor + CTA to support.
- **`/support` — Support / resources hub** (`Support.jsx`). The main content page. In the prototype it's a `page` state toggle in `App`; in production make these **two routes**.
- **Future `/guides/:slug` — guide article pages** (not built). The "Read on site" items in `supportSituations`/`supportMap` are link targets; today they're plain labels. Add a `guideIndex` mapping slug → article.
- **Future `/downloads/:slug` — download/detail or checkout pages** (not built). Download cards/packs currently have no destination.

### B. Components that should exist
Refactor the prototype's few large components into these reusable pieces (current prototype source in parens):
- **`MazeHero`** — landing hero shell + headline + sub-copy + CTA (`App.jsx` `Hero`).
- **`CircularMaze`** — the theta-maze generation + SVG rendering + collision (`Maze.jsx` `generatePolarMaze`, `buildWallPath`, `buildOuterRingPath`, `resolvePolarCollision`, render).
- **`JoystickControl`** — the dial + knob + pointer/touch handling that outputs a direction vector (`Maze.jsx` joystick handlers + `.joystick-base`/`.joystick-knob`).
- **`ThoughtBubble`** — a single bubble (used by hero `ThoughtBubbles`, support `WORRIES`, and the scroll nudges). Today these are three separate implementations; unify into one presentational component with variants.
- **`AboutPopover`** — the nav hover/tap "note from the maker" card (`App.jsx` `AboutNav`).
- **`SupportHero`** — support page hero (`Support.jsx` hero block).
- **`StartWhereYouAre`** — situation picker (`Support.jsx` `StartWhereYouAre`).
- **`SupportRevealPanel`** — the right-hand reveal panel inside the picker (currently inline in `StartWhereYouAre`; extract it).
- **`SupportMap`** — the 4-stage "at a glance" journey (`Support.jsx` `JourneyStage` + `JourneyProgress`).
- **`DownloadsSection`** — the packs grid (`Support.jsx` `PRODUCTS` render).
- **`FinalCTA`** — closing callout (`Support.jsx` final section).
- **`Disclaimer`** — educational-only block (`Support.jsx` `.disclaimer`).
- **`Button`** — unify `.cta-button`, `.cta-button-ghost`, `.back-btn`, `.product-cta`, `.about-card-cta` into one component with variants.
- **`Card`** — unify `.product-card`, `.situation-card`, `.resource-card`, `.about-card` shells (3px ink border, chunky offset shadow, rounded).

### C. Interactions to preserve (do not "simplify away")
- **Joystick-only** maze control — no mouse-follow movement of the brain (mouse only drives the subtle parallax tilt). Touch + pointer supported.
- Brain **starts in the centre**; **no win state, no real exit** — the maze is a metaphor.
- Landing **CTA → support page**; **"Back to maze"** returns.
- **AboutPopover**: hover (desktop) / tap (touch, with close button) / outside-click / Escape.
- **StartWhereYouAre** selectable cards → sliding **reveal panel**.
- **Scroll-triggered thought bubbles** (one at a time, fade/pop in, auto-dismiss, each section once, `prefers-reduced-motion` aware).
- Support page **section buttons scroll** to `#start-here` / `#downloads`; the left **progress rail** tracks scroll.
- Maze **parallax tilt** + **idle wiggle** + **fading trail**; **~4s engagement** then a gentle CTA glow + reassurance line.

### D. Data / content that should be editable (already isolated — keep it that way)
All of these are plain arrays/objects at the top of their files; lift them into content files (JSON/TS/CMS):
- **`supportSituations`** → `SITUATIONS` (Support.jsx) — id, letter, icon, title, blurb, `read[]`, `downloads[]`.
- **`supportMap`** → `JOURNEY` (Support.jsx) — stage n, title, `read[]`, `downloads[]`.
- **`downloads`** → `PRODUCTS` (Support.jsx) — label, title, desc, `items[]`, cta, highlight.
- **`thoughtBubbles`** → `WORRIES` (Support.jsx, hero) + `HERO_THOUGHTS`/`BUBBLE_POSITIONS` (hero maze) + **`NUDGE_MESSAGES`** (scroll nudges).
- **`guideIndex`** → not built; create slug→article map for the "Read on site" labels.
- **`disclaimer`** + **CTA copy** + all hero/section prose → **`COPY`** object (Support.jsx) and the landing strings in `App.jsx` (lift these into the same content layer).

### E. Known placeholders (intentionally not finished)
- Full **guide article bodies** (only titles/labels exist).
- **Downloadable files/templates** (pack contents are listed but no files; download buttons have no destination yet).
- **Pricing** and **checkout / email capture** for packs.
- **About / Resources** pages — "About" is the popover only; "Resources" is a clearly-marked nav placeholder (hidden ≤480px). Wire to real pages or point to `/support`.
- **Privacy policy / terms / cookies / refund policy** — add when downloads or payments are introduced.

---

## Screens / Views

### 1. Landing — Hero + Maze (`App.jsx` → `Hero`, `Maze.jsx`)
- **Purpose:** Set an empathetic tone ("WHICH WAY NOW?"), let the user idly explore the brain-in-maze metaphor (which has no exit by design), and route them to support. The maze is intentionally unsolvable — there is no win state, exit, or "escape/complete" framing anywhere.
- **Layout:** Single centered column, max-width ~1080px, generous vertical padding. Top bar (brand pill left, nav + "Get support" right). Giant display headline. A `.stage-card` (cream, 3px ink border, chunky offset shadow, 36px radius) containing a scene label and the square maze. Below: a sub-copy line and a centered CTA.
- **Components:**
  - **Top brand bar:** `.brand-pill` ("ADHD ASSIST" with a small `.brand-dot`); an interactive **"About"** item (`AboutNav`), a "Resources" placeholder, and a `.back-btn` styled "Get support →".
  - **About card (`AboutNav`):** a friendly "note from the maker" dropdown anchored under the About nav item. **Desktop:** opens on hover/focus (closes shortly after the pointer leaves). **Touch/coarse pointer** (detected via `matchMedia('(hover: none),(pointer: coarse)')`): tap toggles it and a small round close (✕) button appears. Also closes on outside click/tap and `Escape`. Slides/fades in (`opacity` + `translateY`/`scale`, `cubic-bezier(0.34,1.45,0.64,1)`), with an upward caret toward "About". Sized `min(320px, 86vw)`, right-aligned so it stays on screen and clears the maze/CTA. Content — eyebrow "A note from the maker"; heading "Built by someone who gets the maze."; body and sign-off "No perfect plan required. Just one useful step."; a coral "Find support" button that closes the card and routes to the support page. Style: `--stage` cream bg, 2.5px `--ink` border, 20px radius, soft layered shadow, `--teal` aqua eyebrow dot, `--coral` sign-off + button, `--ink` text.
  - **Display headline:** "WHICH WAY / NOW?" — font `Archivo Black`, color `--coral` with a 3px `--ink` text-stroke, `clamp(60px,10.5vw,156px)`, line-height 0.88, letter-spacing -0.045em, subtle `0 7px 0 rgba(31,95,107,.15)` text-shadow. The "?" is `--ink` with no stroke.
  - **Scene label:** "◆ SCENE 01 - THE MAZE", 11px, weight 800, letter-spacing 0.18em, `--ink` at 0.55 opacity.
  - **Maze:** square, max-width 580px, `aspect-ratio 1/1`. An SVG draws a circular labyrinth on a warm-cream radial-gradient floor disc; walls are coral with a 2.5D drop-shadow stack. A soft pink disc marks the centre (the brain's home — **not** a goal). Subtle 3D `rotateX/Y/Z` parallax tilts the board toward the mouse (scaled by the `parallax` tweak). See "Maze details" below.
  - **Brain character:** a hand-drawn pink brain SVG (`BrainSVG`), ~0.7 cell-widths wide, rendered as an absolutely-positioned DOM overlay (not inside the SVG) so it composites above the maze. It has an idle wiggle animation when stationary.
  - **Joystick:** `.joystick-base` (110×110 dial) with a draggable `.joystick-knob` and faint cross hairs. Label beneath: "Drag the joystick · move the brain through the noise". This is the **only** control method.
  - **Sub copy:** "ADHD can make every route feel like *another thought.*" ("another thought." in `--coral`).
  - **Support line:** "You don't need to solve the maze. You just need one useful next step."
  - **Primary CTA:** `.cta-button` "Get ADHD support" → navigates to the support hub. After the user has actively moved the brain for ~4 seconds (`onEngage` fires from `Maze`), the CTA gains a gentle breathing glow (`.cta-button-nudge`) and a quiet reassurance line fades in beneath it: "You don't have to keep circling this alone." This is a soft nudge, **not** a win/completion reward.

### 2. Support Hub (`Support.jsx` → `Support`)
Rendered when `page === 'support'`. All prose lives in the `COPY` object at the top of `Support.jsx`; structured content lives in the `SITUATIONS`, `JOURNEY`, and `PRODUCTS` arrays. **Treat all of these as editable placeholders / CMS-ready data.**

- **Top bar:** brand pill + `.back-btn` "Back to maze".
- **Left progress rail (`JourneyProgress`):** fixed vertical stepper — Start · Evidence · Waiting · Admin — that fills as the user scrolls (driven by an IntersectionObserver tracking `[data-stage]`).
- **Hero (`.support-hero`):**
  - Eyebrow: "✦ ADHD support hub".
  - Headline: "Find your way **through.**" (Archivo Black, `clamp(48px,7vw,96px)`, "through." in `--coral`).
  - Body + a smaller note paragraph (see `COPY.hero`).
  - Two CTAs: "Start with the guidance →" (scrolls to `#start-here`) and "View the downloads" (ghost, scrolls to `#downloads`).
  - **Worry layer:** 8 decorative speech-bubble "worries" scattered in the hero (`WORRIES` array). They drift outward and fade as the user scrolls (driven by a `--worry-progress` CSS variable updated on scroll).
  - Scroll nudge: "Scroll — chaos becomes clear".
- **Section 1 — "Start where you are" (`StartWhereYouAre`):** a two-pane picker. Left: 6 selectable situation cards (A–F, each with a letter, icon, title). Right: a reveal panel showing the selected situation's blurb, a "Read on site" checklist, and download chips ("If you want it laid out for you"). Data = `SITUATIONS`.
- **Section 2 — "Support map / At a glance" (`JourneyStage`):** 4 stages, each with "Read on site" list + "Downloads" chips. Data = `JOURNEY`. A connecting line runs behind the stages.
- **Section 3 — "Downloads" (`PRODUCTS`):** a responsive grid of 4 product/pack cards. Each: a tag ("Free starter"/"Starter Pack"/etc.), title, description, a checklist of contents, and a CTA ("Download free"/"View pack"). The featured card shows a "Most start here" flag and a primary-styled CTA.
- **Section 4 — Final CTA:** cream callout card — "You don't have to do everything today. **Pick the stage you're in.**" + body + the same two CTAs.
- **Section 5 — Disclaimer:** the `.disclaimer` block (see `COPY.disclaimerStrong` / `COPY.disclaimerBody`). **Keep this verbatim** — it is medical-safety copy.
- **Footer:** "MADE WITH PATIENCE · FOR PEOPLE WHO LOST THEIRS".
- **Scroll nudges (`ScrollNudges`):** a single fixed bottom-right bubble that fades in one supportive message at a time as the user enters each section (keyed off `[data-nudge]` attributes). Messages in `NUDGE_MESSAGES`. One-at-a-time, each section fires once, calm pacing, respects `prefers-reduced-motion`. Decorative — the page works without it.

---

## Maze details (port carefully — `Maze.jsx`)
The maze is a **seeded polar (theta) maze**. One wall dataset is the single source of truth for both rendering and collision.

- **Geometry:** `MAZE_RADIUS = 220`, rendered in an SVG viewBox of `(220+50)*2 = 540`. Rings/sectors per difficulty live in `SIZES` (default `normal`: 8 rings, sectors `[1,8,16,16,32,32,32,64]`). Each `sectors[i+1]` is 1× or 2× `sectors[i]`; the centre hub (ring 0, 1 cell) connects to **all** ring-1 cells.
- **Generation:** seeded recursive backtracker (`generatePolarMaze`) carving outward from the hub, with a tangential ("circular") bias (`circBias`) for a more concentric look. Loops are disabled, so corridors form one clean connected labyrinth. Seed is fixed (`FIXED_SEED = 1337` unless a `mazeSeed` prop overrides it), so the same maze renders every time. The "New maze layout" tweak re-rolls the seed.
- **Wall data:** `inward[r][s]` (arc wall between a cell and the inner ring), `cw[r][s]` (radial wall to the next sector), `outerWall[s]` (outer boundary — **kept fully closed; the maze has no exit**).
- **Rendering:** `buildWallPath` emits SVG arcs (`A`) for inward walls and lines (`L`) for radial walls; `buildOuterRingPath` draws the closed outer boundary. Walls are stroked twice (coral body + white top-highlight) for a 2.5D look.
- **Brain physics:** the brain starts at the centre (`centrePosition`). The joystick sets a velocity vector; an animation loop (`requestAnimationFrame`) integrates position with damping, sub-steps for fast motion, and resolves collisions cell-locally in polar space (`resolvePolarCollision`). A short fading trail follows the brain. **No win/goal/exit check exists** — by design.
- **Controls:** joystick only. Pointer + touch handlers map drag offset (clamped to a 36px radius) into a normalized direction vector.
- **Engagement nudge:** the maze counts frames of active movement; after ~4s (240 frames) it calls the `onEngage` prop once. There is no win/exit/score — this only signals "the user has explored for a bit" so the parent can gently emphasise the support CTA.

> Note: CSS animations and `requestAnimationFrame` only run in a focused browser tab — expected behaviour, not a bug.

---

## Interactions & Behavior
- **Routing:** single `page` state in `App` toggles `hero` ↔ `support`; both reset scroll to top on transition. In a real app, use the router (e.g. two routes `/` and `/support`).
- **Maze tilt:** mouse-move over the board sets a parallax `rotateX/rotateY/rotateZ` transform (0.14s ease-out), scaled by the `parallax` tweak.
- **Joystick:** mousedown/touchstart on the dial begins control; window-level move/up (and touchmove/touchend) update/clear it. Knob springs back on release (`cubic-bezier(0.34,1.56,0.64,1)`).
- **Situation picker:** clicking a card swaps the reveal panel (keyed re-mount triggers a fade/slide-in).
- **Scroll reveals:** `[data-reveal]` elements get `.in-view` via IntersectionObserver; `[data-stage]` updates the progress rail's active step.
- **Worry scatter:** scroll progress through the hero drives `--worry-progress` (0→1), translating/rotating/fading the worry bubbles outward.
- **Scroll nudges:** scroll position (central reading band) enqueues one nudge per section; shown in a calm in→hold(4.2s)→out(0.65s)→gap(1.1s) cycle, one at a time, each section once.
- **Reduced motion:** nudge entrance/exit collapse to a simple opacity fade; the CTA `cta-button-nudge` glow is disabled (the reassurance line stays visible at its resting opacity).
- **CTA emphasis (engagement):** once `Maze` fires `onEngage`, `Hero` sets `engaged=true` → the support button gains `.cta-button-nudge` (a soft breathing glow + 2px lift) and the line "You don't have to keep circling this alone." fades in beneath it. Intentional, gentle, and one-way (it does not reset).

## State Management
- `App`: `page` ('hero' | 'support'), `mazeSeed` (number), plus tweak state via `useTweaks` (see Tweaks below). `Hero` also holds `engaged` (boolean) for the CTA emphasis.
- `Maze`: refs for brain position/velocity, joystick, trail, last-move time, and an engagement counter (`engageRef`); state for tilt and idle; a `force()` reducer to re-render each animation frame.- `Support`: `activeStage` (progress rail); `StartWhereYouAre` holds `selectedId`; `ScrollNudges` holds the active nudge + an internal queue/seen-set.
- No data fetching in the prototype. Downloads/packs are static placeholder data — wire to real files/commerce later.

## Responsive Design
The site is built fluid, with targeted breakpoints. **It must feel intentionally designed for phone and tablet, not squeezed down.** All responsive rules live in `styles.css` (search "RESPONSIVE"); headings use `clamp()`; the app root sets `overflow: hidden` so there is never a horizontal scrollbar.

**Breakpoints**
- **Mobile:** ≤480px (small phones) and ≤767px (phones / small tablets).
- **Tablet:** 768–1024px.
- **Desktop:** 1025px+ (full layout at 1200px+).

**Global**
- Display headings are `clamp()`-scaled: landing `clamp(40px, 10.5vw, 156px)`, support hero `clamp(40px, 8vw, 96px)`, section titles `clamp(32px, 4.4vw, 56px)`. Keep mins low enough that the widest word fits ~320px phones.
- Bump tap targets to ≥40–44px on touch; keep generous spacing so it still feels calm.

**1. Landing / maze**
- The maze is an SVG with `viewBox` + `width:100%` + `aspect-ratio:1/1`, so it scales cleanly and **never overflows horizontally**; the brain is sized as a % of the maze and stays visible/usable. The 110px joystick is already a comfortable touch target — keep joystick-only control.
- Hero headline stacks above the maze; sub-copy + CTA below — already a vertical column, so it stacks naturally. The CTA stays visible right under the maze (no awkward scroll).
- Top nav wraps (`.hero-nav-right` is `flex-wrap`); the non-functional **"Resources"** link is hidden ≤480px (`.hero-nav-resources`).
- **Decorative hero thought bubbles** (`.thought-bubble.tb-side`) are hidden ≤1380px so they never cover the maze/heading/CTA — keep that.

**2. Support / resources**
- **Start where you are** (`.swyu`): 2-col → **single column ≤880px**, with the **situation cards above the reveal panel** (cards come first in the DOM). The panel switches `sticky`→`static` and its `min-height` is relaxed ≤767px so it isn't squashed.
- **Support map** (`.journey-*`): the two info columns collapse to one ≤720px; the connecting line (`.journey-shell::before`) is hidden ≤600px so it reads as a **simple vertical journey**; the stage number column shrinks 80→64px (≤600) →56px (≤480).
- **Downloads** (`.product-grid`): **1 column ≤767px, 2 columns 768–1024px**, auto-fit (3–4) on desktop.
- **Final CTA + disclaimer**: stay centered and roomy; disclaimer padding relaxes ≤767px. Don't let them go edge-to-edge.
- The left **progress rail** (`.progress-path`) is hidden ≤1200px.

**3. Thought bubbles**
- **Support-hero "worries"** (`.worry-layer`): thinned to the first four ≤1024px, **fully hidden ≤767px** (with the hero's bottom padding reclaimed). They're purely ambient.
- **Scroll-triggered nudges** (`.scroll-nudge-bubble`): still fire on mobile but **smaller and tucked into the corner** (`right/bottom:14px`, `max-width: min(240px,80vw)`, smaller font) so they never block buttons/cards/text (also `pointer-events:none`). Honor `prefers-reduced-motion`.
- **About card** (`.about-card`): `min(300px,90vw)` ≤767px so it fits and stays on-screen.

**Implementation note:** the prototype mixes inline styles (in JSX) with `styles.css`. A few responsive overrides use `!important` to beat inline styles (e.g. `.support-hero` padding). In the real codebase, move those inline values into CSS/utility classes so the breakpoints don't need `!important`.

## Design Tokens (from `styles.css :root`)
**Backgrounds / surfaces**
- `--bg: #CFEFED` (pale aqua, page bg) · `--bg-deep: #B8E5E3` · `--stage: #F5F1E8` (warm cream card) · `--stage-2: #79D9DF` · `--floor: #F5F1E8` (maze base) · `--floor-2: #ECE6D8`

**Brand accents**
- `--teal: #22C7CF` · `--teal-soft: #79D9DF` · `--teal-deep: #1F5F6B` · `--orange: #FFA94D`

**Coral system (maze walls + primary CTA)**
- `--wall: #FF6B6B` · `--wall-shade: #E55050` · `--wall-deep: #C73E3E` · `--coral: #FF6B6B` · `--coral-dark: #E55050`

**Brain**
- `--brain: #FFB3C1` · `--brain-line: #E55C7A`

**Text / outlines**
- `--ink: #1F5F6B` (primary text + outlines) · `--ink-soft: #2C7280`

**Typography**
- Display: **Archivo Black** (headlines), letter-spacing ~ -0.04em, line-height ~0.85–0.95.
- Body/UI: **Inter** (400–900). Base body color `--ink`.

**Shape language**
- Chunky 3px `--ink` borders; large radii (cards 22–36px, pills/buttons 999px); signature **offset hard shadow** `0 Npx 0 var(--ink)` stacked with a soft blurred shadow. Buttons/cards have hover lift + active press states. Maze walls use rounded line caps/joins.

## Tweaks (prototype-only control panel — `tweaks-panel.jsx`, wired in `App.jsx`)
A floating dev/preview panel exposes: Brain speed, Difficulty (easy/normal/hard), Tilt/parallax, "New maze layout" (re-roll seed), Palette, Message tone, Background particles toggle, Thought bubbles toggle. These are **prototype affordances** for exploring the design — re-implement only the ones you want as real product settings; most can be dropped or hard-coded.

## Assets
- **Fonts:** Google Fonts — `Archivo Black` and `Inter` (loaded via `<link>` in `ADHD Maze.html`).
- **Icons & illustrations:** all inline SVG (situation icons in `PhaseIcon`, the brain in `BrainSVG`, chevrons/checks). No external image files. No raster assets.
- No third-party UI libraries — styling is hand-written CSS in `styles.css`.

## Files
- `ADHD Maze.html` — entry point; loads fonts, `styles.css`, React 18 (UMD) + Babel standalone, then the JSX files, and mounts `<App />`.
- `App.jsx` — root: routing, `Hero`, tweak wiring, palette application.
- `Maze.jsx` — the circular maze (generation, rendering, physics/collision, joystick, brain).
- `Support.jsx` — the support hub: `COPY` (all prose), `SITUATIONS` / `JOURNEY` / `PRODUCTS` data, the page, situation picker, journey stages, progress rail, worry/particle effects, and `ScrollNudges`.
- `styles.css` — all design tokens and component styling (~1.8k lines).
- `tweaks-panel.jsx` — the prototype Tweaks panel shell + controls.

> Production note: replace the in-browser Babel + `window.*` global registry with the target build system and normal module imports. Split `Support.jsx` content (the `COPY`/`SITUATIONS`/`JOURNEY`/`PRODUCTS` data) into a content/CMS layer so non-engineers can edit copy and write the still-missing guidance bodies and real downloadable files.

// Maze.jsx — interactive CIRCULAR (theta) ADHD labyrinth
// A seeded polar maze used as an AMBIENT VISUAL METAPHOR for ADHD confusion —
// not a game. The brain character starts in the CENTRE and is nudged around the
// corridors with the joystick, blocked by walls. There is no goal, no
// entrance/exit, and no win/lose state. The wall data (inward / cw / outerWall
// arrays) is the single source of truth for BOTH rendering and collision.

// --- Layout constants ---
const MAZE_RADIUS = 220;          // outermost RING radius
const MAZE_PADDING = 50;          // extra space for corridor + breathing room
const MAZE_SIZE = (MAZE_RADIUS + MAZE_PADDING) * 2;
const MAZE_CX = MAZE_SIZE / 2;
const MAZE_CY = MAZE_SIZE / 2;
const CORRIDOR_FRAC = 0.85;       // corridor width as fraction of one cell radial width
const MAZE_CELL = 26; // legacy export

// --- Difficulty configs ---
// Each sectors[i+1] must be 1× or 2× sectors[i] for clean alignment.
// loops are kept at 0 so the corridors form one clean connected labyrinth
// (no isolated pockets). circBias (>1) makes the generator prefer tangential
// moves → more circular corridors.
const SIZES = {
  easy:   { rings: 6, sectors: [1, 6, 12, 12, 24, 24],            circBias: 1.7 },
  normal: { rings: 8, sectors: [1, 8, 16, 16, 32, 32, 32, 64],    circBias: 1.7 },
  hard:   { rings: 9, sectors: [1, 8, 16, 16, 32, 32, 32, 64, 64], circBias: 1.5 },
};

// Fixed seed → the same maze renders every time (the "New maze layout" tweak
// can still re-roll it on demand).
const FIXED_SEED = 1337;

// --- Seeded RNG ---
function seedRng(seed) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

// --- Polar maze generation (recursive backtracker → perfect maze) ---
// inward[r][s] = wall between cell (r,s) and the inner ring (only meaningful for r>=1).
// cw[r][s]     = wall between cell (r,s) and cell (r, (s+1)%S).
// outerWall[s] = boundary wall on the outer edge of the outermost ring (kept
//                fully closed — the labyrinth has no exit).
// All three arrays are the single source of truth used for BOTH the SVG
// rendering and the brain's wall collision.
function generatePolarMaze(rings, sectors, seed, circBias) {
  const rng = seedRng(seed);
  const inward = sectors.map((S) => new Array(S).fill(true));
  const cw = sectors.map((S) => new Array(S).fill(true));

  function neighbors(r, s) {
    const S = sectors[r];
    const out = [];
    if (S > 1) {
      const sCcw = (s - 1 + S) % S;
      out.push({ r, s: sCcw, kind: 'cw', wallR: r, wallS: sCcw });
      const sCw = (s + 1) % S;
      out.push({ r, s: sCw, kind: 'cw', wallR: r, wallS: s });
    }
    // Inward neighbour. Ring 1 always connects to the single central hub (0,0).
    if (r === 1) {
      out.push({ r: 0, s: 0, kind: 'inward', wallR: 1, wallS: s });
    } else if (r > 1) {
      const inS = sectors[r - 1] === sectors[r] ? s : Math.floor(s / 2);
      out.push({ r: r - 1, s: inS, kind: 'inward', wallR: r, wallS: s });
    }
    // Outward neighbour(s).
    if (r === 0) {
      // The hub touches EVERY ring-1 cell (proper theta-maze centre).
      const S1 = sectors[1];
      for (let so = 0; so < S1; so++) {
        out.push({ r: 1, s: so, kind: 'inward', wallR: 1, wallS: so });
      }
    } else if (r < rings - 1) {
      const Snext = sectors[r + 1];
      if (Snext === S) {
        out.push({ r: r + 1, s, kind: 'inward', wallR: r + 1, wallS: s });
      } else {
        out.push({ r: r + 1, s: s * 2, kind: 'inward', wallR: r + 1, wallS: s * 2 });
        out.push({ r: r + 1, s: s * 2 + 1, kind: 'inward', wallR: r + 1, wallS: s * 2 + 1 });
      }
    }
    return out;
  }

  const visited = new Set();
  const key = (r, s) => r * 1000 + s;
  const stack = [{ r: 0, s: 0 }];     // carve outward from the centre hub
  visited.add(key(0, 0));

  while (stack.length) {
    const { r, s } = stack[stack.length - 1];
    const ns = neighbors(r, s).filter((n) => !visited.has(key(n.r, n.s)));
    if (!ns.length) { stack.pop(); continue; }
    // Weighted pick: bias toward tangential ('cw') moves for a circular look,
    // but every cell is still reached exactly once → perfect maze.
    let total = 0;
    for (const n of ns) total += (n.kind === 'cw' ? circBias : 1);
    let pick = rng() * total;
    let n = ns[0];
    for (const cand of ns) {
      pick -= (cand.kind === 'cw' ? circBias : 1);
      if (pick <= 0) { n = cand; break; }
    }
    if (n.kind === 'cw') cw[n.wallR][n.wallS] = false;
    else inward[n.wallR][n.wallS] = false;
    visited.add(key(n.r, n.s));
    stack.push({ r: n.r, s: n.s });
  }

  // Fully closed outer boundary — the labyrinth has no exit. The maze is an
  // ambient metaphor for ADHD confusion, not a game with a start/finish.
  const Souter = sectors[rings - 1];
  const outerWall = new Array(Souter).fill(true);
  const outerGaps = new Set();

  return { inward, cw, rings, sectors, outerGaps, outerWall };
}

// --- Cell helpers ---
function cellOpenCount(maze, r, s) {
  const { inward, cw, rings, sectors } = maze;
  const S = sectors[r];
  let open = 0;
  if (S > 1) {
    if (!cw[r][(s - 1 + S) % S]) open++;
    if (!cw[r][s]) open++;
  }
  if (r === 0) {
    const Snext = sectors[1];
    for (let so = 0; so < Snext; so++) if (!inward[1][so]) open++;
  } else if (!inward[r][s]) open++;
  if (r < rings - 1) {
    const Snext = sectors[r + 1];
    if (Snext === S) {
      if (!inward[r + 1][s]) open++;
    } else {
      if (!inward[r + 1][s * 2]) open++;
      if (!inward[r + 1][s * 2 + 1]) open++;
    }
  }
  return open;
}

// --- Polar coord helpers ---
function toPolar(x, y) {
  const dx = x - MAZE_CX;
  const dy = y - MAZE_CY;
  const r = Math.hypot(dx, dy);
  let θ = Math.atan2(dy, dx);
  if (θ < 0) θ += Math.PI * 2;
  return { r, θ };
}

function fromPolar(r, θ) {
  return { x: MAZE_CX + r * Math.cos(θ), y: MAZE_CY + r * Math.sin(θ) };
}

function cellWidth(rings) { return MAZE_RADIUS / rings; }

// The brain's home: the centre of the maze.
function centrePosition() {
  return { x: MAZE_CX, y: MAZE_CY };
}

function cellOf(maze, x, y) {
  const cw_px = cellWidth(maze.rings);
  const { r, θ } = toPolar(x, y);
  if (r < cw_px) return { ring: 0, sector: 0, r, θ };
  const ring = Math.min(maze.rings - 1, Math.floor(r / cw_px));
  const S = maze.sectors[ring];
  const sector = Math.floor((θ / (Math.PI * 2)) * S) % S;
  return { ring, sector, r, θ };
}

// --- Collision resolver (polar, cell-local) ---
// Repeatedly check the 4 walls of the brain's current cell. Push back as needed.
function resolvePolarCollision(brain, maze, brainRad) {
  const cw_px = cellWidth(maze.rings);
  const outerR = maze.rings * cw_px;
  const corridorWidth = cw_px * 0.85;
  const worldR = outerR + corridorWidth;
  const { outerGaps, sectors, rings } = maze;
  const Souter = sectors[rings - 1];

  for (let iter = 0; iter < 4; iter++) {
    const { r, θ } = toPolar(brain.x, brain.y);
    let pushed = false;
    const cosθ = Math.cos(θ), sinθ = Math.sin(θ);

    // 1) HARD world boundary (floor disc edge)
    if (r > worldR - brainRad) {
      const newR = worldR - brainRad - 0.01;
      const p = fromPolar(newR, θ);
      brain.x = p.x; brain.y = p.y;
      const radVel = brain.vx * cosθ + brain.vy * sinθ;
      if (radVel > 0) { brain.vx -= radVel * cosθ; brain.vy -= radVel * sinθ; }
      pushed = true;
    }

    // 2) Outer boundary wall at r = outerR. This is solid everywhere EXCEPT the
    // single entrance gap at the top, where the brain passes between the
    // corridor and the outermost ring. Same wall data drives the rendering.
    {
      const outSec = Math.floor((θ / (Math.PI * 2)) * Souter) % Souter;
      const isGap = !maze.outerWall[outSec];
      if (!isGap && Math.abs(r - outerR) < brainRad) {
        // Push to whichever side the brain is currently on.
        const newR = r >= outerR ? outerR + brainRad + 0.01 : outerR - brainRad - 0.01;
        const p = fromPolar(newR, θ);
        brain.x = p.x; brain.y = p.y;
        const radVel = brain.vx * cosθ + brain.vy * sinθ;
        const movingIntoWall = (r >= outerR && radVel < 0) || (r < outerR && radVel > 0);
        if (movingIntoWall) { brain.vx -= radVel * cosθ; brain.vy -= radVel * sinθ; }
        pushed = true;
      }
    }

    // 3) If brain is in the corridor (outside the maze rings), no more walls.
    if (r > outerR) {
      if (!pushed) break;
      continue;
    }

    // 4) In-maze cell-local wall checks
    const { ring, sector, r: r2, θ: θ2 } = cellOf(maze, brain.x, brain.y);
    const S = maze.sectors[ring];
    const cos2 = Math.cos(θ2), sin2 = Math.sin(θ2);
    const tDx = -sin2, tDy = cos2;

    // INNER arc wall
    if (ring > 0) {
      const innerR = ring * cw_px;
      if (r2 - innerR < brainRad && maze.inward[ring][sector]) {
        const newR = innerR + brainRad + 0.01;
        const p = fromPolar(newR, θ2);
        brain.x = p.x; brain.y = p.y;
        const radVel = brain.vx * cos2 + brain.vy * sin2;
        if (radVel < 0) { brain.vx -= radVel * cos2; brain.vy -= radVel * sin2; }
        pushed = true;
      }
    }

    // OUTER arc wall (between this cell and ring+1) — only for non-outermost rings
    if (ring < rings - 1) {
      const outerArcR = (ring + 1) * cw_px;
      const Snext = maze.sectors[ring + 1];
      const outSec = Math.floor((θ2 / (Math.PI * 2)) * Snext) % Snext;
      if (outerArcR - r2 < brainRad && maze.inward[ring + 1][outSec]) {
        const newR = outerArcR - brainRad - 0.01;
        const p = fromPolar(newR, θ2);
        brain.x = p.x; brain.y = p.y;
        const radVel = brain.vx * cos2 + brain.vy * sin2;
        if (radVel > 0) { brain.vx -= radVel * cos2; brain.vy -= radVel * sin2; }
        pushed = true;
      }
    }

    // Center cell special: outward walls are inward[1][outSec]
    if (ring === 0) {
      const Snext = maze.sectors[1];
      const outSec = Math.floor((θ2 / (Math.PI * 2)) * Snext) % Snext;
      const outerArcR = cw_px;
      if (outerArcR - r2 < brainRad && maze.inward[1][outSec]) {
        const newR = outerArcR - brainRad - 0.01;
        const p = fromPolar(newR, θ2);
        brain.x = p.x; brain.y = p.y;
        const radVel = brain.vx * cos2 + brain.vy * sin2;
        if (radVel > 0) { brain.vx -= radVel * cos2; brain.vy -= radVel * sin2; }
        pushed = true;
      }
    }

    // CCW radial wall
    if (S > 1) {
      const ccwθ = sector * (Math.PI * 2) / S;
      const arcDistCcw = r2 * (θ2 - ccwθ);
      const ccwWallSector = (sector - 1 + S) % S;
      if (arcDistCcw < brainRad && maze.cw[ring][ccwWallSector]) {
        const dθ = (brainRad + 0.5) / Math.max(0.001, r2);
        const newθ = ccwθ + dθ;
        const p = fromPolar(r2, newθ);
        brain.x = p.x; brain.y = p.y;
        const tVel = brain.vx * tDx + brain.vy * tDy;
        if (tVel < 0) { brain.vx -= tVel * tDx; brain.vy -= tVel * tDy; }
        pushed = true;
      }
      const cw_θ = (sector + 1) * (Math.PI * 2) / S;
      const arcDistCw = r2 * (cw_θ - θ2);
      if (arcDistCw < brainRad && maze.cw[ring][sector]) {
        const dθ = (brainRad + 0.5) / Math.max(0.001, r2);
        const newθ = cw_θ - dθ;
        const p = fromPolar(r2, newθ);
        brain.x = p.x; brain.y = p.y;
        const tVel = brain.vx * tDx + brain.vy * tDy;
        if (tVel > 0) { brain.vx -= tVel * tDx; brain.vy -= tVel * tDy; }
        pushed = true;
      }
    }

    if (!pushed) break;
  }
}

// --- SVG path builder for walls ---
function buildWallPath(maze) {
  const { inward, cw, rings, sectors } = maze;
  const cw_px = cellWidth(rings);
  let d = '';

  // Inward arc walls (skip center which has no inward)
  for (let r = 1; r < rings; r++) {
    const S = sectors[r];
    const R = r * cw_px;
    for (let s = 0; s < S; s++) {
      if (!inward[r][s]) continue;
      const θ1 = s * (Math.PI * 2) / S;
      const θ2 = (s + 1) * (Math.PI * 2) / S;
      const x1 = MAZE_CX + R * Math.cos(θ1);
      const y1 = MAZE_CY + R * Math.sin(θ1);
      const x2 = MAZE_CX + R * Math.cos(θ2);
      const y2 = MAZE_CY + R * Math.sin(θ2);
      const large = (θ2 - θ1) > Math.PI ? 1 : 0;
      d += `M${x1.toFixed(2)} ${y1.toFixed(2)}A${R} ${R} 0 ${large} 1 ${x2.toFixed(2)} ${y2.toFixed(2)} `;
    }
  }

  // Radial walls (cw)
  for (let r = 0; r < rings; r++) {
    const S = sectors[r];
    if (S <= 1) continue;
    const R1 = r * cw_px;
    const R2 = (r + 1) * cw_px;
    for (let s = 0; s < S; s++) {
      if (!cw[r][s]) continue;
      const θ = (s + 1) * (Math.PI * 2) / S;
      const cos = Math.cos(θ), sin = Math.sin(θ);
      const x1 = MAZE_CX + R1 * cos, y1 = MAZE_CY + R1 * sin;
      const x2 = MAZE_CX + R2 * cos, y2 = MAZE_CY + R2 * sin;
      d += `M${x1.toFixed(2)} ${y1.toFixed(2)}L${x2.toFixed(2)} ${y2.toFixed(2)} `;
    }
  }

  return d;
}

function buildOuterRingPath(maze) {
  // Draw the outer boundary as a series of arcs, skipping any sectors flagged
  // as "gaps" so the brain can move out into the corridor at those angles.
  const { rings, sectors, outerGaps } = maze;
  const S = sectors[rings - 1];
  const R = MAZE_RADIUS;
  let d = '';
  for (let s = 0; s < S; s++) {
    if (outerGaps && outerGaps.has(s)) continue;
    const θ1 = s * (Math.PI * 2) / S;
    const θ2 = (s + 1) * (Math.PI * 2) / S;
    const x1 = MAZE_CX + R * Math.cos(θ1);
    const y1 = MAZE_CY + R * Math.sin(θ1);
    const x2 = MAZE_CX + R * Math.cos(θ2);
    const y2 = MAZE_CY + R * Math.sin(θ2);
    const large = (θ2 - θ1) > Math.PI ? 1 : 0;
    d += `M${x1.toFixed(2)} ${y1.toFixed(2)}A${R} ${R} 0 ${large} 1 ${x2.toFixed(2)} ${y2.toFixed(2)} `;
  }
  return d;
}

// --- The Maze component ---
function Maze({ tweaks, mazeSeed, onEngage }) {
  const {
    brainSpeed = 1.0,
    difficulty = 'normal',
    parallax: parallaxAmount = 1.0,
    tone = 'funny',
  } = tweaks || {};

  const size = SIZES[difficulty] || SIZES.normal;

  const maze = React.useMemo(() => {
    return generatePolarMaze(size.rings, size.sectors, mazeSeed || FIXED_SEED, size.circBias);
    // eslint-disable-next-line
  }, [size.rings, size.sectors.join(','), size.circBias, mazeSeed]);

  const wallPath = React.useMemo(() => buildWallPath(maze), [maze]);
  const outerRingPath = React.useMemo(() => buildOuterRingPath(maze), [maze]);

  // Refs
  const boardRef = React.useRef(null);
  const brainRef = React.useRef(null);
  if (brainRef.current === null) {
    const s = centrePosition();
    brainRef.current = { x: s.x, y: s.y, vx: 0, vy: 0 };
  }
  const joystickRef = React.useRef({ active: false, dx: 0, dy: 0, knobX: 0, knobY: 0 });
  const lastMoveTime = React.useRef(Date.now());
  const trailRef = React.useRef([]);

  // Track how long the user has actively explored. After a short while we let
  // the parent gently emphasise the support CTA (no win state — just a nudge).
  const onEngageRef = React.useRef(onEngage);
  onEngageRef.current = onEngage;
  const engageRef = React.useRef({ frames: 0, fired: false });

  const [, force] = React.useReducer((x) => x + 1, 0);
  const [tilt, setTilt] = React.useState({ x: 0, y: 0 });
  const [isIdle, setIsIdle] = React.useState(false);

  // Reset the brain to the centre on maze change.
  React.useEffect(() => {
    const start = centrePosition();
    brainRef.current.x = start.x;
    brainRef.current.y = start.y;
    brainRef.current.vx = 0;
    brainRef.current.vy = 0;
    trailRef.current = [];
    force();
  }, [maze]);

  // Parallax mouse tilt (NOT brain control)
  React.useEffect(() => {
    const board = boardRef.current;
    if (!board) return;
    const onMove = (e) => {
      const rect = board.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      setTilt({ x: py, y: px });
    };
    board.addEventListener('mousemove', onMove);
    return () => board.removeEventListener('mousemove', onMove);
  }, []);

  // Animation loop
  React.useEffect(() => {
    let raf;
    const cw_px = cellWidth(maze.rings);
    const brainRad = Math.max(6, cw_px * 0.32);

    const tick = () => {
      const brain = brainRef.current;
      const joy = joystickRef.current;

      const maxSpeed = 1.5 * brainSpeed;
      const accel = 0.12 * brainSpeed;
      const damp = 0.84;

      if (joy.active && (joy.dx !== 0 || joy.dy !== 0)) {
        const targetVx = joy.dx * maxSpeed;
        const targetVy = joy.dy * maxSpeed;
        brain.vx += (targetVx - brain.vx) * accel * 2;
        brain.vy += (targetVy - brain.vy) * accel * 2;
        lastMoveTime.current = Date.now();

        // Count active exploration; nudge the CTA after ~4s of real movement.
        const eng = engageRef.current;
        if (!eng.fired) {
          eng.frames += 1;
          if (eng.frames > 240) {
            eng.fired = true;
            if (onEngageRef.current) onEngageRef.current();
          }
        }
      } else {
        brain.vx *= damp;
        brain.vy *= damp;
      }

      const idleNow = Date.now() - lastMoveTime.current > 2200 &&
                      Math.hypot(brain.vx, brain.vy) < 0.15;
      if (idleNow !== isIdle) setIsIdle(idleNow);

      const speedMag = Math.hypot(brain.vx, brain.vy);
      const steps = Math.max(1, Math.ceil(speedMag / (brainRad * 0.5)));
      for (let i = 0; i < steps; i++) {
        brain.x += brain.vx / steps;
        brain.y += brain.vy / steps;
        resolvePolarCollision(brain, maze, brainRad);
      }

      // Trail
      const trail = trailRef.current;
      if (Math.hypot(brain.vx, brain.vy) > 0.3) {
        trail.unshift({ x: brain.x, y: brain.y, life: 1 });
      }
      for (let i = 0; i < trail.length; i++) trail[i].life -= 0.045;
      while (trail.length && trail[trail.length - 1].life <= 0) trail.pop();
      if (trail.length > 12) trail.length = 12;

      force();
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line
  }, [maze, brainSpeed, isIdle]);

  // Joystick handlers (kept simple — pointer/touch handlers wired to refs)
  const joyBaseRef = React.useRef(null);
  const onJoyStart = (clientX, clientY) => {
    const base = joyBaseRef.current;
    if (!base) return;
    const rect = base.getBoundingClientRect();
    joystickRef.current.active = true;
    joystickRef.current.startX = rect.left + rect.width / 2;
    joystickRef.current.startY = rect.top + rect.height / 2;
    onJoyMove(clientX, clientY);
  };
  const onJoyMove = (clientX, clientY) => {
    const joy = joystickRef.current;
    if (!joy.active) return;
    let dx = clientX - joy.startX;
    let dy = clientY - joy.startY;
    const max = 36;
    const dist = Math.hypot(dx, dy);
    if (dist > max) { dx = (dx / dist) * max; dy = (dy / dist) * max; }
    joy.dx = dx / max;
    joy.dy = dy / max;
    joy.knobX = dx;
    joy.knobY = dy;
    force();
  };
  const onJoyEnd = () => {
    Object.assign(joystickRef.current, { active: false, dx: 0, dy: 0, knobX: 0, knobY: 0 });
    force();
  };

  React.useEffect(() => {
    const mm = (e) => onJoyMove(e.clientX, e.clientY);
    const mu = () => onJoyEnd();
    const tm = (e) => { if (e.touches[0]) onJoyMove(e.touches[0].clientX, e.touches[0].clientY); };
    const te = () => onJoyEnd();
    window.addEventListener('mousemove', mm);
    window.addEventListener('mouseup', mu);
    window.addEventListener('touchmove', tm, { passive: false });
    window.addEventListener('touchend', te);
    return () => {
      window.removeEventListener('mousemove', mm);
      window.removeEventListener('mouseup', mu);
      window.removeEventListener('touchmove', tm);
      window.removeEventListener('touchend', te);
    };
  }, []);

  const onBasePointerDown = (e) => { e.preventDefault(); onJoyStart(e.clientX, e.clientY); };
  const onBaseTouchStart = (e) => { e.preventDefault(); const t = e.touches[0]; onJoyStart(t.clientX, t.clientY); };

  const brain = brainRef.current;
  const trail = trailRef.current;
  const joy = joystickRef.current;
  const bSpeed = Math.hypot(brain.vx, brain.vy);

  // Helpers for converting maze-coords to CSS %
  const toPct = (v) => `${(v / MAZE_SIZE) * 100}%`;

  // Floor disc extends past the maze rings to include the outer corridor.
  const cwPx = cellWidth(maze.rings);
  const floorR = MAZE_RADIUS + cwPx * CORRIDOR_FRAC;

  return (
    <div style={{ position: 'relative', width: '100%', margin: '0 auto', maxWidth: 580 }}>
      <div style={{ perspective: '1600px', width: '100%' }}>
        <div
          ref={boardRef}
          className="maze-board maze-board-round"
          style={{
            width: '100%',
            aspectRatio: '1 / 1',
            position: 'relative',
            transform: `rotateX(${6 + tilt.x * 3 * parallaxAmount}deg) rotateY(${-tilt.y * 4 * parallaxAmount}deg) rotateZ(${tilt.y * 0.5 * parallaxAmount}deg)`,
            transformOrigin: 'center center',
            transition: 'transform 0.14s ease-out',
          }}
        >
          <svg
            viewBox={`0 0 ${MAZE_SIZE} ${MAZE_SIZE}`}
            preserveAspectRatio="xMidYMid meet"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}
          >
            <defs>
              <radialGradient id="floorGrad" cx="50%" cy="48%" r="55%">
                <stop offset="0%" stopColor="#FBF8F0" />
                <stop offset="75%" stopColor="#F5F1E8" />
                <stop offset="100%" stopColor="#E5DEC8" />
              </radialGradient>
            </defs>

            {/* Floor disc (extends to corridor outer edge) */}
            <circle cx={MAZE_CX} cy={MAZE_CY} r={floorR} fill="url(#floorGrad)" />

            {/* Subtle concentric guide rings on floor (very faint) */}
            {Array.from({ length: maze.rings + 1 }).map((_, i) => (
              <circle
                key={`g-${i}`}
                cx={MAZE_CX}
                cy={MAZE_CY}
                r={i * cellWidth(maze.rings)}
                fill="none"
                stroke="rgba(31, 95, 107, 0.04)"
                strokeWidth="1"
              />
            ))}

            {/* Walls — drawn twice for 2.5D depth */}
            <g style={{ filter: 'drop-shadow(0 5px 0 var(--wall-deep, #B83C3C)) drop-shadow(0 8px 8px rgba(31, 95, 107,0.35))' }}>
              <path d={wallPath} stroke="var(--wall)" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              <path d={outerRingPath} stroke="var(--wall)" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </g>

            {/* Top highlight on walls (thin lighter stroke for polish) */}
            <g pointerEvents="none">
              <path d={wallPath} stroke="rgba(255,255,255,0.22)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
              <path d={outerRingPath} stroke="rgba(255,255,255,0.25)" strokeWidth="2" fill="none" strokeLinecap="round" />
            </g>

            {/* Brain trail */}
            {trail.map((t, i) => (
              <circle
                key={`t-${i}`}
                cx={t.x}
                cy={t.y}
                r={Math.max(2, 9 * t.life)}
                fill="rgba(255, 179, 193, 0.6)"
                opacity={t.life * 0.7}
              />
            ))}

            {/* Centre marker — soft disc marking the brain's home (no goal) */}
            <circle cx={MAZE_CX} cy={MAZE_CY} r={cwPx * 0.20} fill="rgba(255, 179, 193, 0.30)" />
          </svg>

          {/* Brain — DOM overlay for SVG-in-HTML composition */}
          <div
            className="brain"
            style={{
              position: 'absolute',
              left: toPct(brain.x),
              top: toPct(brain.y),
              width: `${(Math.max(22, cellWidth(maze.rings) * 0.7) / MAZE_SIZE) * 100}%`,
              aspectRatio: '1',
              transform: 'translate(-50%, -50%)',
              filter: 'drop-shadow(0 3px 0 rgba(31, 95, 107,0.35)) drop-shadow(0 5px 7px rgba(0,0,0,0.2))',
              pointerEvents: 'none',
              zIndex: 5,
            }}
          >
            <BrainSVG idle={isIdle} speed={bSpeed} />
          </div>

        </div>
      </div>

      {/* Joystick */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 24,
        gap: 18,
      }}>
        <div
          ref={joyBaseRef}
          className="joystick-base"
          onMouseDown={onBasePointerDown}
          onTouchStart={onBaseTouchStart}
          style={{ cursor: joy.active ? 'grabbing' : 'grab' }}
        >
          <div
            className="joystick-knob"
            style={{
              transform: `translate(${joy.knobX || 0}px, ${joy.knobY || 0}px)`,
              transition: joy.active ? 'none' : 'transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
          />
          <svg viewBox="0 0 110 110" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.4 }}>
            <line x1="55" y1="20" x2="55" y2="40" stroke="white" strokeWidth="2" strokeLinecap="round" />
            <line x1="55" y1="70" x2="55" y2="90" stroke="white" strokeWidth="2" strokeLinecap="round" />
            <line x1="20" y1="55" x2="40" y2="55" stroke="white" strokeWidth="2" strokeLinecap="round" />
            <line x1="70" y1="55" x2="90" y2="55" stroke="white" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
        <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(31, 95, 107,0.55)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          Drag the joystick · move the brain through the noise
        </div>
      </div>
    </div>
  );
}

function clampPct(v, lo, hi) { return `${Math.max(lo, Math.min(hi, v))}%`; }

// Wobbly hand-drawn pink brain (unchanged)
function BrainSVG({ idle }) {
  return (
    <div className={`brain-svg-inner ${idle ? 'idle' : ''}`} style={{ width: '100%', height: '100%' }}>
      <svg viewBox="0 0 40 40" width="100%" height="100%">
        <defs>
          <radialGradient id="brainGrad2" cx="40%" cy="35%">
            <stop offset="0%" stopColor="#FFE0E6" />
            <stop offset="60%" stopColor="#FFB3C1" />
            <stop offset="100%" stopColor="#FF8FA8" />
          </radialGradient>
        </defs>
        <path
          d="M 20 5 C 14 4, 9 7, 8 12 C 5 13, 4 17, 6 20 C 4 23, 6 28, 10 29 C 11 33, 16 35, 20 33 C 24 35, 29 33, 30 29 C 34 28, 36 23, 34 20 C 36 17, 35 13, 32 12 C 31 7, 26 4, 20 5 Z"
          fill="url(#brainGrad2)" stroke="#1F5F6B" strokeWidth="2" strokeLinejoin="round"
        />
        <path d="M 20 5 Q 19 18 20 33" stroke="#E55C7A" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        <path d="M 11 13 Q 14 15 12 18 Q 10 21 13 23" stroke="#E55C7A" strokeWidth="1.4" fill="none" strokeLinecap="round" />
        <path d="M 29 13 Q 26 15 28 18 Q 30 21 27 23" stroke="#E55C7A" strokeWidth="1.4" fill="none" strokeLinecap="round" />
        <path d="M 14 26 Q 17 27 16 29" stroke="#E55C7A" strokeWidth="1.4" fill="none" strokeLinecap="round" />
        <path d="M 26 26 Q 23 27 24 29" stroke="#E55C7A" strokeWidth="1.4" fill="none" strokeLinecap="round" />
        <circle cx="15.5" cy="18" r="1.6" fill="#1F5F6B" />
        <circle cx="24.5" cy="18" r="1.6" fill="#1F5F6B" />
        <circle cx="15.9" cy="17.5" r="0.5" fill="white" />
        <circle cx="24.9" cy="17.5" r="0.5" fill="white" />
      </svg>
    </div>
  );
}

window.Maze = Maze;
window.MAZE_CELL = MAZE_CELL;

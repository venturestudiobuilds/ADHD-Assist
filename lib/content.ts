// Editable content layer — all prose and structured data for the site lives
// here so copy can change without touching layout components.

export const LANDING = {
  brand: 'ADHD ASSIST',
  navAbout: 'About',
  navResources: 'Resources',
  navSupport: 'Get support →',
  headlineLine1: 'WHICH WAY',
  headlineLine2: 'NOW',
  sceneLabel: '◆ SCENE 01 - THE MAZE',
  joystickHint: 'Drag the joystick · move the brain through the noise',
  subCopyLead: 'ADHD can make every route feel like ',
  subCopyAccent: 'another thought.',
  supportLine1: "You don't need to solve the maze.",
  supportLine2: 'You just need one useful next step.',
  primaryCta: 'Get ADHD support',
  reassurance: "You don't have to keep circling this alone.",
  about: {
    eyebrow: 'A note from the maker',
    title: 'Built by someone who gets the maze.',
    body:
      'I made ADHD Assist because getting support can feel like trying to explain your whole ' +
      'brain while your brain has left the meeting. This site is here to make the next step ' +
      'feel smaller, clearer, and less lonely.',
    signoff: 'No perfect plan required. Just one useful step.',
    cta: 'Find support',
  },
};

export const HERO_THOUGHTS = [
  'New idea!', 'Wait, what was I doing?', 'Do that now.', 'No, do this first.',
  'Oh that’s interesting…', 'I should reply to that.', 'Quick side quest.',
  'Don’t forget that thing.', 'Actually, life plan.', 'Why am I like this?',
  'This might fix everything.', 'Hang on.', 'Important!', 'What if…',
  'I’ll do it in a minute.', 'Right. Focus.',
];

export const BUBBLE_POSITIONS = [
  { top: 110, left: -190, rot: -5, delay: 0.1, size: 'md' },
  { top: 360, left: -210, rot: 3, delay: 0.55, size: 'sm' },
  { top: 640, left: -180, rot: -3, delay: 1.0, size: 'md' },
  { top: 160, right: -200, rot: 4, delay: 0.3, size: 'sm' },
  { top: 420, right: -220, rot: -4, delay: 0.75, size: 'md' },
  { top: 700, right: -180, rot: 5, delay: 1.2, size: 'sm' },
] as const;

export const WORRIES = [
  { text: 'What route do I choose?', x: -60, y: -80, rot: -5, w: 180 },
  { text: 'What if I freeze?', x: 10, y: 50, rot: 4, w: 130 },
  { text: 'What do I say to the GP?', x: -80, y: 180, rot: -4, w: 190 },
  { text: 'How do I explain it?', x: 0, y: 300, rot: 4, w: 170 },
  { text: 'What if I wait months?', x: -735, y: 400, rot: 5, w: 185 },
  { text: 'What happens next?', x: -500, y: 460, rot: -5, w: 160 },
  { text: 'Childhood examples?', x: -260, y: 400, rot: 4, w: 160 },
  { text: 'How do I keep track?', x: -15, y: 450, rot: -4, w: 165 },
];

export type Situation = {
  id: string;
  letter: string;
  icon: 'lightbulb' | 'compass' | 'clipboard' | 'refresh' | 'table' | 'pill';
  title: string;
  blurb: string;
  read: string[];
  downloads: string[];
};

export const SITUATIONS: Situation[] = [
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
    blurb: "You're ready to do something about it, but the appointment hasn't happened.",
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
    blurb: "The hardest stage, because it can quietly delete itself if you don't track it.",
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
    blurb: "Track it cleanly now so review appointments aren't guesswork later.",
    read: [
      'What to track',
      'Questions to ask',
      'Shared care overview',
      'This is preparation, not medical advice',
    ],
    downloads: ['Medication / Titration Notes', 'Shared Care Questions', 'Appointment Log'],
  },
];

export const JOURNEY = [
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

export const COPY = {
  brand: 'ADHD ASSIST',
  backToMaze: 'Back to maze',
  hero: {
    eyebrow: '✦ ADHD support hub',
    titleLead: 'Find your way',
    titleAccent: 'through.',
    body:
      "You don't need to solve the whole maze today. Start with one useful step, " +
      'one clear explanation, or one script you can actually use when your brain goes blank.',
    note:
      'Guidance is available directly on this page. Optional downloads are the same ' +
      'content, just laid out and ready to print or fill in.',
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
      sub:
        "The guidance is here whenever you need it. If you'd rather have the templates, " +
        'scripts and trackers already laid out for you, you can download the ready-made packs below.',
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
  disclaimerBody:
    ' This website and any downloads are for education, organisation and appointment ' +
    'preparation only. They are not medical advice, not a diagnostic tool, and not a replacement for ' +
    'assessment or support from a qualified healthcare professional. ADHD can only be diagnosed by an ' +
    'appropriately qualified clinician. If you are worried about your health, medication, safety, or ' +
    'mental health, contact your GP, NHS 111, emergency services, or an appropriate crisis support service.',
  footer: 'MADE WITH PATIENCE · FOR PEOPLE WHO LOST THEIRS',
};

export const NUDGE_MESSAGES: Record<string, string> = {
  hero: "You don't need to read everything.",
  start: 'Pick the bit that sounds most like you.',
  reveal: 'Start with the loudest problem.',
  map: 'One section at a time.',
  downloads: 'Read first. Download later if it helps.',
  cta: 'This might be enough for today.',
};

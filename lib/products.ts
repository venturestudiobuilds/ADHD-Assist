// Product catalogue — the single source of truth for the packs sold on the
// site. Prices are in the smallest currency unit (pence) and are passed to
// Stripe Checkout as inline price_data, so no Stripe Dashboard product setup
// is required. Adjust prices/copy here.

export type Product = {
  slug: string;
  label: string;
  title: string;
  desc: string;
  items: string[];
  cta: string;
  highlight: boolean;
  /** Price in pence (GBP). 0 = free direct download, no checkout. */
  price: number;
  /** Filename served from content/packs/ after purchase (or freely if price=0). */
  file: string;
};

export const CURRENCY = 'gbp';

export const PRODUCTS: Product[] = [
  {
    slug: 'mini-starter-pack',
    label: 'Free starter',
    highlight: false,
    title: 'Mini Starter Pack',
    desc: 'A taste of everything, enough to get you to your GP appointment.',
    items: [
      'Mini route explainer',
      'GP prep starter',
      'Brain-freeze script',
      'Symptom evidence starter',
      'One overwhelm prompt',
    ],
    cta: 'Download free',
    price: 0,
    file: 'mini-starter-pack.zip',
  },
  {
    slug: 'gp-appointment-prep-kit',
    label: 'Starter Pack',
    highlight: false,
    title: 'GP Appointment Prep Kit',
    desc: 'Everything you need for the GP step, printed and ready.',
    items: [
      'GP prep sheet',
      'Phone scripts',
      'Online form wording',
      'Appointment summary template',
      'Follow-up checklist',
    ],
    cta: 'Buy pack',
    price: 700, // £7.00
    file: 'gp-appointment-prep-kit.zip',
  },
  {
    slug: 'full-diagnosis-prep-pack',
    label: 'Complete Pack',
    highlight: true,
    title: 'Full Diagnosis Prep & Survival Pack',
    desc: 'The whole thing, from suspicion to titration. Most people start here.',
    items: [
      'Evidence builder',
      'Childhood / adult worksheet',
      'Provider tracker',
      'Referral tracker',
      'Weekly survival planner',
      'AI prompt pack',
      'Shared care questions',
    ],
    cta: 'Buy pack',
    price: 1900, // £19.00
    file: 'full-diagnosis-prep-pack.zip',
  },
  {
    slug: 'admin-dashboard-addon',
    label: 'Tracker Pack',
    highlight: false,
    title: 'Admin Dashboard Add-On',
    desc: 'For people who want a real tracking system. Editable spreadsheet or Notion.',
    items: [
      'Provider comparison tracker',
      'Referral status tracker',
      'Appointment log',
      'Medication / titration notes',
      'Document checklist',
    ],
    cta: 'Buy pack',
    price: 900, // £9.00
    file: 'admin-dashboard-addon.zip',
  },
];

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function formatPrice(pence: number): string {
  if (pence === 0) return 'Free';
  return `£${(pence / 100).toFixed(pence % 100 === 0 ? 0 : 2)}`;
}

// Product catalogue - the single source of truth for the packs sold on the
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
  /** Price in pence (GBP). 0 = free (email capture, no checkout). */
  price: number;
  /** Filename served from content/packs/ after purchase (or freely if price=0). */
  file: string;
  /** The product's dedicated sales page. */
  route: string;
};

export const CURRENCY = 'gbp';

export const PRODUCTS: Product[] = [
  {
    slug: 'free-pack',
    label: 'Free starter',
    highlight: false,
    title: 'The ADHD Appointment Panic Pack',
    desc: 'A calm little starter kit for preparing for your first GP conversation. 6 sections. Free. No catch.',
    items: [
      'Routes explainer (NHS / RTC / private)',
      'GP appointment prep sheet',
      'Brain-freeze phone script',
      'Tiny symptom evidence starter',
      'One AI prompt for overwhelm',
    ],
    cta: 'Get it free',
    price: 0,
    file: 'free-pack.zip',
    route: '/free',
  },
  {
    slug: 'starter-pack',
    label: 'Starter Pack',
    highlight: false,
    title: 'Diagnosis Prep Starter Pack',
    desc: 'Your step-by-step system for getting from "I think I have ADHD" to a GP referral.',
    items: [
      'Full GP appointment prep template',
      '8-category symptom evidence builder',
      'Childhood & adult examples worksheet',
      '9 phone scripts for every scenario',
      '9-prompt AI pack + follow-up checklist',
    ],
    cta: 'View pack',
    price: 900, // £9
    file: 'starter-pack.zip',
    route: '/starter-pack',
  },
  {
    slug: 'full-pack',
    label: 'Complete Pack',
    highlight: true,
    title: 'Full Diagnosis Prep & Survival Pack',
    desc: 'The complete 15-section system, from first GP appointment to medication titration.',
    items: [
      'Everything in the Starter Pack',
      'Provider comparison template',
      'Referral status + admin trackers',
      'Weekly survival planner',
      'Assessment day prep & follow-up',
      'Shared care + titration notes',
      '20-prompt AI library',
    ],
    cta: 'View pack',
    price: 2400, // £24
    file: 'full-pack.zip',
    route: '/full-pack',
  },
  {
    slug: 'admin-system',
    label: 'Tracker',
    highlight: false,
    title: 'ADHD Admin System',
    desc: 'Your whole process tracked, in one place. Browser app, Google Sheets file, and Notion guide.',
    items: [
      '8 tabs - one for every stage',
      'Milestone dashboard + admin tracker',
      'Referral log & provider compare',
      'Appointment + medication logs',
      'Saves automatically in your browser',
    ],
    cta: 'View tracker',
    price: 1200, // £12
    file: 'admin-system.zip',
    route: '/admin-system',
  },
  {
    slug: 'bundle',
    label: 'Bundle',
    highlight: false,
    title: 'Full Pack + Admin System',
    desc: 'The complete PDF system and the interactive tracker, together.',
    items: [
      'Full 15-section PDF pack',
      'Interactive browser tracker',
      'Google Sheets / Excel file',
      'Notion workspace build guide',
    ],
    cta: 'View bundle',
    price: 3500, // £35
    file: 'bundle.zip',
    route: '/bundle',
  },
];

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function formatPrice(pence: number): string {
  if (pence === 0) return 'Free';
  return `£${(pence / 100).toFixed(pence % 100 === 0 ? 0 : 2)}`;
}

import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: "ADHD Assist - the hardest part is the admin",
  description:
    'Calm, practical ADHD support. Guidance for every stage of the diagnosis journey - from first suspicion to titration - plus ready-made prep packs, scripts and trackers.',
};

export const viewport: Viewport = {
  themeColor: '#CFEFED',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

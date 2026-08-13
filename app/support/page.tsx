import type { Metadata } from 'next';
import SupportPage from '@/components/support/SupportPage';

export const metadata: Metadata = {
  title: 'ADHD Assist - Support hub',
  description:
    'Find your way through. Guidance for every stage of the ADHD diagnosis journey, plus ready-made prep packs, scripts and trackers.',
};

export default function Support() {
  return <SupportPage />;
}

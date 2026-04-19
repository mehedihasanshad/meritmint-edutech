import { Hero } from '@/components/landing/Hero';
import { SocialTicker } from '@/components/landing/SocialTicker';
import { PainPoints } from '@/components/landing/PainPoints';
import { StatsBand } from '@/components/landing/StatsBand';
import { CourseDeck } from '@/components/landing/CourseDeck';
import { WhatYouGet } from '@/components/landing/WhatYouGet';
import { Toppers } from '@/components/landing/Toppers';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { PricingPitch } from '@/components/landing/PricingPitch';
import { ExamBatches } from '@/components/landing/ExamBatches';
import { FAQ } from '@/components/landing/FAQ';
import { ClosingCTA } from '@/components/landing/ClosingCTA';

export default function HomePage() {
  return (
    <>
      <Hero />
      <SocialTicker />
      <PainPoints />
      <StatsBand />
      <CourseDeck />
      <WhatYouGet />
      <Toppers />
      <HowItWorks />
      <PricingPitch />
      <ExamBatches />
      <FAQ />
      <ClosingCTA />
    </>
  );
}

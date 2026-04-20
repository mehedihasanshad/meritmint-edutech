import { Hero } from '@/components/landing/Hero';
import { SocialTicker } from '@/components/landing/SocialTicker';
import { StatsBand } from '@/components/landing/StatsBand';
import { FeaturesGrid } from '@/components/landing/FeaturesGrid';
import { PainPoints } from '@/components/landing/PainPoints';
import { CourseDeck } from '@/components/landing/CourseDeck';
import { LessonCarousel } from '@/components/landing/LessonCarousel';
import { WhatYouGet } from '@/components/landing/WhatYouGet';
import { Toppers } from '@/components/landing/Toppers';
import { InstitutionsBar } from '@/components/landing/InstitutionsBar';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { PricingPitch } from '@/components/landing/PricingPitch';
import { ExamBatches } from '@/components/landing/ExamBatches';
import { FAQ } from '@/components/landing/FAQ';
import { ConnectSection } from '@/components/landing/ConnectSection';
import { ClosingCTA } from '@/components/landing/ClosingCTA';
import { SiteFooter } from '@/components/landing/SiteFooter';

export default function HomePage() {
  return (
    <>
      <Hero />
      <SocialTicker />
      <StatsBand />
      <FeaturesGrid />
      <PainPoints />
      <CourseDeck />
      <LessonCarousel />
      <WhatYouGet />
      <Toppers />
      <InstitutionsBar />
      <HowItWorks />
      <PricingPitch />
      <ExamBatches />
      <FAQ />
      <ConnectSection />
      <ClosingCTA />
      <SiteFooter />
    </>
  );
}

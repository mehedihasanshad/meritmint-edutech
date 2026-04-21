import { Hero } from '@/components/landing/Hero';
import { StatsBand } from '@/components/landing/StatsBand';
import { CourseDeck } from '@/components/landing/CourseDeck';
import { PaymentSection } from '@/components/landing/PaymentSection';
import { ExamBatches } from '@/components/landing/ExamBatches';
import { FAQ } from '@/components/landing/FAQ';
import { SiteFooter } from '@/components/landing/SiteFooter';

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsBand />
      <CourseDeck />
      <PaymentSection />
      <ExamBatches />
      <FAQ />
      <SiteFooter />
    </>
  );
}

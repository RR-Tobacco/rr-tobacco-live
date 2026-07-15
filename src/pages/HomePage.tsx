import { HeroSection } from '../components/home/HeroSection';
import { StatsSection } from '../components/home/StatsSection';
import { CategoriesSection } from '../components/home/CategoriesSection';
import { FeaturedProductsSection } from '../components/home/FeaturedProductsSection';
import { WhyChooseSection } from '../components/home/WhyChooseSection';
import { ProcessSection } from '../components/home/ProcessSection';
import { GalleryPreviewSection } from '../components/home/GalleryPreviewSection';
import { TestimonialsSection } from '../components/home/TestimonialsSection';
import { FaqSection } from '../components/home/FaqSection';
import { CtaSection } from '../components/home/CtaSection';
import { NewsletterSection } from '../components/home/NewsletterSection';

export function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <CategoriesSection />
      <FeaturedProductsSection />
      <WhyChooseSection />
      <ProcessSection />
      <GalleryPreviewSection />
      <TestimonialsSection />
      <FaqSection />
      <CtaSection />
      <NewsletterSection />
    </>
  );
}

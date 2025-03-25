
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedProperties } from "@/components/home/FeaturedProperties";
import { FeatureHighlights } from "@/components/home/FeatureHighlights";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { CtaSection } from "@/components/home/CtaSection";
import { Layout } from "@/components/layout/Layout";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <FeaturedProperties />
      <FeatureHighlights />
      <TestimonialsSection />
      <CtaSection />
    </Layout>
  );
};

export default Index;

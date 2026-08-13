import { Navigation } from "@/components/landing/navigation";
import { HeroSection } from "@/components/landing/hero-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { HowItWorksSection } from "@/components/landing/how-it-works-section";
import { AppShowcaseSection } from "@/components/landing/app-showcase-section";
import { DevelopersSection } from "@/components/landing/developers-section";
import { InfrastructureSection } from "@/components/landing/infrastructure-section";
import { SecuritySection } from "@/components/landing/security-section";
import { MetricsSection } from "@/components/landing/metrics-section";
import { TestimonialsSection } from "@/components/landing/testimonials-section";
import { PricingSection } from "@/components/landing/pricing-section";
import { CtaSection } from "@/components/landing/cta-section";
import { FooterSection } from "@/components/landing/footer-section";

export default function Home() {
  return (
    <main className="relative min-h-dvh overflow-x-hidden bg-[#030209]">
      <Navigation />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <AppShowcaseSection />
      <DevelopersSection />
      <InfrastructureSection />
      <SecuritySection />
      <MetricsSection />
      <TestimonialsSection />
      <PricingSection />
      <CtaSection />
      <FooterSection />
    </main>
  );
}

import React from 'react';
import HeroSection from './sections/HeroSection';
import StatsSection from './sections/StatsSection';
import BundleSection from './sections/BundleSection';
import FeaturesSection from './sections/FeaturesSection';
import FaqSection from './sections/FaqSection';
import CtaSection from './sections/CtaSection';

export const LandingPage = () => {
  return (
    <div className="space-y-20 pb-20">
      <HeroSection />
      <StatsSection />
      <BundleSection />
      <FeaturesSection />
      <FaqSection />
      <CtaSection />
    </div>
  );
};

export default LandingPage;

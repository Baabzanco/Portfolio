import React from 'react';
import { HeroSection } from '../components/sections/HeroSection';
import { PhilosophySection } from '../components/sections/PhilosophySection';
import { ChallengesSection } from '../components/sections/ChallengesSection';
import { ProcessSection } from '../components/sections/ProcessSection';
import { SelectedWorkSection } from '../components/sections/SelectedWorkSection';
import { ExperienceSection } from '../components/sections/ExperienceSection';
import { CapabilitiesSection } from '../components/sections/CapabilitiesSection';
import { AboutSection } from '../components/sections/AboutSection';
import { ContactSection } from '../components/sections/ContactSection';

export const HomePage: React.FC = () => {
  return (
    <main className="relative z-10">
      <HeroSection />
      <PhilosophySection />
      <ChallengesSection />
      <ProcessSection />
      <SelectedWorkSection />
      <ExperienceSection />
      <CapabilitiesSection />
      <AboutSection />
      <ContactSection />
    </main>
  );
};

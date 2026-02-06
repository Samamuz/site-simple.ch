
import React, { useEffect } from 'react';
import { Hero } from '../components/sections/Hero';
import { Pricing } from '../components/sections/Pricing';
import { Portfolio } from '../components/sections/Portfolio';
import { ContactSection } from '../components/sections/ContactSection';

export const LandingPage: React.FC = () => {
  // Handle initial hash scroll or force top scroll
  useEffect(() => {
    // Force manual scroll restoration to ensure we start at top on refresh
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          const navbarHeight = 80;
          const top = element.getBoundingClientRect().top + window.scrollY - navbarHeight;
          window.scrollTo({ top, behavior: 'smooth' });
        }, 100);
      }
    } else {
      // Force scroll to top if no hash is present
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <div className="w-full">
      {/* Sections utilizing ID for anchor navigation */}
      <Hero />
      
      {/* 
         FLOW:
         1. Hero (Noir) - Promesse
         2. Portfolio (Blanc) - Preuve visuelle immédiate
         3. Services/Tarifs (Gris) - L'offre rationnelle
         4. Contact (Noir) - Footer Action
      */}

      <Portfolio />
      
      <div id="services">
         <Pricing />
      </div>
      
      <ContactSection />
    </div>
  );
};

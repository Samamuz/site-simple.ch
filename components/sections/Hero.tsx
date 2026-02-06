
import React from 'react';
import { Button } from '../ui/Button';

export const Hero: React.FC = () => {
  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const navbarHeight = 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - navbarHeight;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden bg-black">
      {/* Background Image (Mountains) */}
      <div className="absolute inset-0 w-full h-full z-0 select-none pointer-events-none">
        <img 
          src="https://images.unsplash.com/photo-1611571492921-846193520cb8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Paysage de Runatsch Zernez"
          className="w-full h-full object-cover"
        />
        {/* Dark Overlay for text readability */}
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      <div className="max-w-4xl mx-auto text-center space-y-8 animate-slide-up z-10 relative">
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.3em] text-neutral-300 font-medium">Agence Web Suisse</p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tighter text-white leading-[1.1]">
            Tout simplement.
          </h1>
          <p className="text-xl md:text-2xl text-neutral-200 font-light max-w-2xl mx-auto pt-4 leading-relaxed">
            Votre site, sans tracas : on le crée, on le maintient.<br />Vous profitez.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
          <Button 
            size="lg" 
            variant="secondary" 
            onClick={() => handleScrollTo('tarifs')}
            className="w-full sm:w-auto min-w-[180px]"
          >
            Découvrir nos offres
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            onClick={() => handleScrollTo('contact')}
            className="w-full sm:w-auto min-w-[180px] text-white border-white hover:bg-white hover:text-black hover:border-white"
          >
            Nous contacter
          </Button>
        </div>
      </div>
    </section>
  );
};


import React, { useState, useLayoutEffect } from 'react';

export const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);        // Intention de l'utilisateur (Bouton hamburger)
  const [shouldRender, setShouldRender] = useState(false); // Présence dans le DOM
  const [isVisible, setIsVisible] = useState(false);  // État visuel (Opacity/Translate)
  const [scrollbarGap, setScrollbarGap] = useState(0); // Compensation du layout shift

  // Gestion du cycle de vie de l'animation et du layout shift
  useLayoutEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    if (isOpen) {
      setShouldRender(true);
      
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      
      // On n'applique le padding que si une scrollbar prend effectivement de la place
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
        setScrollbarGap(scrollbarWidth);
      }
      
      timeoutId = setTimeout(() => {
        setIsVisible(true);
      }, 50); 
    } else {
      setIsVisible(false);
      
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
      setScrollbarGap(0);
      
      timeoutId = setTimeout(() => {
        setShouldRender(false);
      }, 1200);
    }

    return () => {
      clearTimeout(timeoutId);
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [isOpen]);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setIsOpen(false);
    
    // Si c'est l'accueil et qu'on est déjà en haut
    if (targetId === 'hero' && window.scrollY === 0) return;

    const element = document.getElementById(targetId);
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

  const links: {
    target: string;
    label: string;
    isCta?: boolean;
    isLight?: boolean;
    special?: boolean;
  }[] = [
    { target: 'hero', label: 'Accueil' },
    { target: 'travaux', label: 'Nos Travaux' },
    { target: 'tarifs', label: 'Tarifs' },
    { target: 'contact', label: 'Contact', isCta: true },
  ];

  const standardLinks = links.filter(link => !link.isCta);
  const ctaLinks = links.filter(link => link.isCta);

  const getAnimationDelay = (index: number) => {
    return isVisible ? `${100 + (index * 60)}ms` : '0ms';
  };

  return (
    <nav 
      className={`fixed top-0 z-50 w-full border-b border-white/20 transition-all duration-300 ${
        isOpen ? 'bg-white' : 'bg-white/80 backdrop-blur-md'
      }`}
      style={{ paddingRight: scrollbarGap > 0 ? `${scrollbarGap}px` : undefined }}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 h-20 flex items-center justify-between relative z-50">
        <div className="mr-8 flex items-center">
          <a 
            href="#hero"
            onClick={(e) => handleScrollTo(e, 'hero')}
            className="text-lg md:text-xl font-bold tracking-tight text-black transition-opacity duration-200 hover:opacity-70"
          >
            site-simple.ch
          </a>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-4 lg:gap-8">
          {links.map((link) => (
            <a
              key={link.target}
              href={`#${link.target}`}
              onClick={(e) => handleScrollTo(e, link.target)}
              className={`
                text-sm tracking-wide transition-colors duration-200
                ${link.isCta 
                  ? `px-5 py-2 rounded-[2px] font-medium ${link.isLight ? 'bg-[#F3F3F3] text-black hover:bg-[#E5E5E5]' : 'bg-black text-white hover:bg-neutral-800'}`
                  : 'text-neutral-500 hover:text-black'
                }
              `}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile Menu Button (Animated Hamburger) */}
        <div className="flex md:hidden">
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="group w-10 h-10 relative flex items-center justify-center focus:outline-none z-50"
            aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {/* 
              Conteneur 24x24px.
              Lignes positionnées en absolu par rapport au centre EXACT (top:50%, left:50%)
              avec décalage par marges négatives.
              Cela garantit que l'origine de rotation (center) est parfaitement alignée avec le centre du conteneur.
            */}
            <div className="w-6 h-6 relative">
              {/* Ligne du haut */}
              <span 
                className={`absolute w-6 h-[2px] bg-black rounded-full transition-transform duration-300 ease-in-out origin-center ${
                  isOpen ? 'rotate-45 translate-y-0' : '-translate-y-[6px]'
                }`}
                style={{ top: '50%', left: '50%', marginTop: '-1px', marginLeft: '-12px' }}
              ></span>
              
              {/* Ligne du milieu */}
              <span 
                className={`absolute w-6 h-[2px] bg-black rounded-full transition-opacity duration-300 ease-in-out ${
                  isOpen ? 'opacity-0' : 'opacity-100'
                }`}
                style={{ top: '50%', left: '50%', marginTop: '-1px', marginLeft: '-12px' }}
              ></span>
              
              {/* Ligne du bas */}
              <span 
                className={`absolute w-6 h-[2px] bg-black rounded-full transition-transform duration-300 ease-in-out origin-center ${
                  isOpen ? '-rotate-45 translate-y-0' : 'translate-y-[6px]'
                }`}
                style={{ top: '50%', left: '50%', marginTop: '-1px', marginLeft: '-12px' }}
              ></span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu Content - Apple Style Animation (1.2s) */}
      {shouldRender && (
        <div 
          className={`
            md:hidden fixed top-20 left-0 w-full h-[calc(100vh-5rem)] bg-white z-40 flex flex-col
            transition-all duration-[1200ms] ease-[cubic-bezier(0.32,0.72,0,1)]
            ${isVisible ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-2 invisible'}
          `}
        >
          
          {/* Main Links (Top, Left Aligned) */}
          <div className="flex-1 overflow-y-auto px-8 py-10 flex flex-col gap-8 items-start">
            {standardLinks.map((link, index) => (
              <a
                key={link.target}
                href={`#${link.target}`}
                onClick={(e) => handleScrollTo(e, link.target)}
                style={{ transitionDelay: getAnimationDelay(index) }}
                className={`
                  text-3xl font-light tracking-tight transition-all duration-[1200ms] ease-out transform
                  ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}
                  text-neutral-400 hover:text-neutral-600 active:text-black
                `}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA Buttons (Bottom, Centered) */}
          <div className="flex-shrink-0 p-8 pb-12 flex flex-col gap-4 items-center w-full bg-white">
            {ctaLinks.map((link, index) => {
              const globalIndex = standardLinks.length + index;
              return (
                <a
                  key={link.target}
                  href={`#${link.target}`}
                  onClick={(e) => handleScrollTo(e, link.target)}
                  style={{ transitionDelay: getAnimationDelay(globalIndex) }}
                  className={`
                    inline-block w-full max-w-[320px] text-center px-6 py-4 rounded-[2px] text-xl font-medium 
                    transition-all duration-[1200ms] ease-out transform
                    ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}
                    ${link.isLight ? "bg-[#F3F3F3] text-black hover:bg-[#E5E5E5]" : "bg-black text-white hover:bg-neutral-800"}
                  `}
                >
                  {link.label}
                </a>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
};


import React, { useEffect, useState } from 'react';

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [isExiting, setIsExiting] = useState(false);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    // Bloquer le scroll pendant le splash
    document.body.style.overflow = 'hidden';
    // Forcer le haut de page immédiatement
    window.scrollTo(0, 0);

    // Séquence d'animation optimisée
    // 1. Apparition du texte
    const textTimer = setTimeout(() => setShowText(true), 100);

    // 2. Début de la sortie (le rideau se lève) - 2.2s
    const exitTimer = setTimeout(() => {
      // On s'assure d'être en haut juste avant de lever le rideau
      window.scrollTo(0, 0);
      setIsExiting(true);
    }, 2200);

    // 3. Fin complète (démontage) - 3.2s
    const completeTimer = setTimeout(() => {
      onComplete();
      document.body.style.overflow = '';
    }, 3200);

    return () => {
      clearTimeout(textTimer);
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
      document.body.style.overflow = '';
    };
  }, [onComplete]);

  return (
    <div 
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-black transition-transform duration-1000 ease-[cubic-bezier(0.87,0,0.13,1)] ${
        isExiting ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      <div className="text-center">
        <h1 
          className={`text-4xl md:text-6xl font-bold tracking-tighter text-white transition-all duration-1000 transform ${
            showText ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          site-simple.ch
        </h1>
        <p 
          className={`mt-4 text-neutral-400 font-light text-lg tracking-widest uppercase transition-all duration-1000 delay-300 transform ${
            showText ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          Tout simplement.
        </p>
      </div>
    </div>
  );
};

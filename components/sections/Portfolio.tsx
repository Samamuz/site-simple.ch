
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { portfolioData } from '../../lib/agency-data';
import { ImageWithLoader } from '../ui/ImageWithLoader';

export const Portfolio: React.FC = () => {
  // On triple les données pour assurer une fluidité parfaite dans les deux sens (drag gauche/droite)
  // [Set Précedent] [Set Actuel] [Set Suivant]
  const infinitePortfolio = [...portfolioData, ...portfolioData, ...portfolioData];

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>(0);
  const positionRef = useRef<number>(0);
  const isDragging = useRef<boolean>(false);
  const startX = useRef<number>(0);
  const lastX = useRef<number>(0);
  const velocity = useRef<number>(0);
  const isHovered = useRef<boolean>(false);
  
  // Pour gérer l'état visuel du curseur
  const [isGrabbing, setIsGrabbing] = useState(false);
  
  // Pour différencier un clic d'un drag (pour ne pas ouvrir le lien quand on drag)
  const dragDistance = useRef<number>(0);

  // Vitesse de défilement automatique
  const autoSpeed = 0.5;

  const animate = useCallback(() => {
    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    // La largeur d'un set complet (1/3 du contenu total)
    const setWidth = container.scrollWidth / 3;

    // Détection mobile pour inverser le sens
    const isMobile = window.innerWidth < 768;
    const direction = isMobile ? 1 : -1;

    // Gestion de la vélocité (inertie ou auto-scroll)
    if (isDragging.current) {
      // Pendant le drag, la vélocité est calculée via les événements mouse/touch
    } else {
      // Hors drag
      if (Math.abs(velocity.current) > autoSpeed) {
        // Friction pour revenir doucement à la vitesse auto
        velocity.current *= 0.95;
      } else {
        // Si on ne survole pas, on reprend la vitesse auto dans la bonne direction
        const targetSpeed = isHovered.current ? 0 : (autoSpeed * direction);
        velocity.current = targetSpeed;
      }
    }

    // Application du déplacement
    positionRef.current += velocity.current;

    // Logique Infinie (Reset de la position sans saut visuel)
    // Si on est allé trop loin à gauche (dépassé le 2ème set), on revient au 1er
    if (positionRef.current <= -setWidth * 2) {
      positionRef.current += setWidth;
    } 
    // Si on est allé trop loin à droite (avant le 1er set), on va au 2ème
    else if (positionRef.current > -setWidth) {
      positionRef.current -= setWidth;
    }

    // Application du style
    container.style.transform = `translate3d(${positionRef.current}px, 0, 0)`;

    requestRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    // Initialiser la position au milieu (début du 2ème set) pour pouvoir scroller dans les 2 sens
    if (scrollContainerRef.current) {
       const setWidth = scrollContainerRef.current.scrollWidth / 3;
       positionRef.current = -setWidth;
    }
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [animate]);

  // --- Gestionnaires d'événements (Souris / Tactile) ---

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    setIsGrabbing(true);
    startX.current = e.pageX;
    lastX.current = e.pageX;
    dragDistance.current = 0;
    velocity.current = 0;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    isDragging.current = true;
    setIsGrabbing(true);
    startX.current = e.touches[0].pageX;
    lastX.current = e.touches[0].pageX;
    dragDistance.current = 0;
    velocity.current = 0;
  };

  const handleMove = (currentX: number) => {
    if (!isDragging.current) return;
    
    const delta = currentX - lastX.current;
    lastX.current = currentX;
    
    // Déplacement direct
    positionRef.current += delta;
    
    // Calcul de la vélocité instantanée pour l'inertie au relâchement
    velocity.current = delta;
    
    // Suivi de la distance totale pour distinguer click vs drag
    dragDistance.current += Math.abs(delta);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    e.preventDefault(); // Évite la sélection de texte
    handleMove(e.pageX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].pageX);
  };

  const handleEnd = () => {
    isDragging.current = false;
    setIsGrabbing(false);
  };

  // Interception du clic sur les liens
  const handleLinkClick = (e: React.MouseEvent, url: string) => {
    // Si on a dragué plus de 5 pixels, on considère que ce n'est pas un clic
    if (dragDistance.current > 5) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <section id="travaux" className="py-24 bg-white overflow-hidden select-none">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12 border-b border-neutral-100 pb-8">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-black mb-4">NOS TRAVAUX</h2>
          <p className="text-lg text-neutral-500 font-light">
            Quelques exemples. Cliquez et glissez pour explorer.
          </p>
        </div>
      </div>

      {/* Container Full Width */}
      <div 
        className="relative w-full group py-12"
        onMouseEnter={() => isHovered.current = true}
        onMouseLeave={() => { isHovered.current = false; handleEnd(); }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleEnd}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleEnd}
      >
        {/* Curseur Hint Overlay - Positionné en bas à droite */}
        <div className={`absolute inset-0 z-20 pointer-events-none transition-opacity duration-300 ${isGrabbing ? 'opacity-0' : 'opacity-0 group-hover:opacity-100'}`}>
            <div className="absolute bottom-8 right-8 bg-black/80 text-white text-[10px] px-3 py-1.5 rounded-full backdrop-blur-sm shadow-lg">
                Cliquez & glissez
            </div>
        </div>

        {/* Piste de scroll */}
        <div 
          ref={scrollContainerRef}
          className={`flex w-max will-change-transform ${isGrabbing ? 'cursor-grabbing' : 'cursor-grab'}`}
        >
          {infinitePortfolio.map((item, index) => (
            <div 
              key={`${item.id}-${index}`} 
              className="px-6 w-[350px] md:w-[480px]"
            >
              <div className="h-full transform transition-all duration-500 hover:-translate-y-2 hover:scale-[1.01]">
                <a 
                  href={item.url}
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={(e) => handleLinkClick(e, item.url)}
                  // Shadow-lg conservé pour l'effet de profondeur (flottement)
                  className="group/card block bg-white rounded-[4px] overflow-hidden border border-neutral-100 shadow-lg hover:shadow-2xl hover:shadow-black/10 transition-all duration-500 h-full pointer-events-auto"
                  draggable="false"
                >
                  <div className="aspect-video relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/0 group-hover/card:bg-black/5 transition-colors z-10 flex items-center justify-center">
                       <span className="opacity-0 group-hover/card:opacity-100 bg-white text-black px-4 py-2 text-xs font-medium rounded-full transform translate-y-4 group-hover/card:translate-y-0 transition-all duration-500 shadow-md">
                         Visiter le site
                       </span>
                    </div>
                    <ImageWithLoader 
                      src={item.thumbnail} 
                      alt={item.alt}
                      className="w-full h-full object-cover"
                      draggable={false}
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-medium text-black mb-1 group-hover/card:text-neutral-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-neutral-400 font-light truncate">
                      {item.alt}
                    </p>
                  </div>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

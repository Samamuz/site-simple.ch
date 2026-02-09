
import React, { useState } from 'react';
import { PricingItem } from '../../types';
import { Button } from './Button';

interface PricingCardProps {
  item: PricingItem;
}

export const PricingCard: React.FC<PricingCardProps> = ({ item }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    // Simulation d'envoi
    setTimeout(() => {
      setFormStatus('success');
      // Reset après succès (optionnel)
      setTimeout(() => {
        setIsFlipped(false);
        setFormStatus('idle');
      }, 2000);
    }, 1000);
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    // Reset form status when flipping back manually
    if (isFlipped) setFormStatus('idle');
  };

  // Classes utilitaires pour la 3D
  const perspectiveClass = "perspective-[1000px]";
  const preserve3dClass = "[transform-style:preserve-3d]";
  const backfaceHiddenClass = "[backface-visibility:hidden]";
  const rotateY180Class = "[transform:rotateY(180deg)]";

  return (
    <div className={`relative h-full min-h-[500px] w-full ${perspectiveClass}`}>
      <div 
        className={`
          relative w-full h-full transition-all duration-700 ease-in-out ${preserve3dClass}
          ${isFlipped ? rotateY180Class : ''}
        `}
      >
        {/* --- FRONT FACE --- */}
        <div 
          className={`
            absolute inset-0 w-full h-full ${backfaceHiddenClass}
            flex flex-col p-8 rounded-[4px] border
            ${item.highlighted 
              ? 'bg-white border-black shadow-xl z-10' 
              : 'bg-neutral-50 border-neutral-200 hover:border-neutral-300 hover:shadow-lg'
            }
          `}
        >
          {item.highlighted && (
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black text-white text-[10px] uppercase tracking-widest font-bold px-3 py-1 rounded-full">
              Recommandé
            </div>
          )}

          <div className="mb-6">
            <h3 className="text-xl font-bold text-black mb-2">{item.title}</h3>
            <span className="inline-block px-2 py-1 bg-neutral-100 text-neutral-600 text-xs font-medium rounded">
              {item.badge}
            </span>
          </div>

          <div className="mb-8 space-y-1">
            {item.originalPrice && (
              <p className="text-neutral-400 line-through text-sm font-light">
                {item.originalPrice}
              </p>
            )}
            <p className="text-4xl font-light text-black">
              {item.currentPrice}
            </p>
            <p className="text-xs text-neutral-500 font-light pt-2">
              {item.note}
            </p>
          </div>

          <ul className="space-y-4 mb-8 flex-1">
            {item.features.map((feature, i) => (
              <li key={i} className="flex items-start gap-3">
                 <svg className={`w-5 h-5 flex-shrink-0 ${item.highlighted ? 'text-black' : 'text-neutral-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 13l4 4L19 7" />
                 </svg>
                 <span className="text-sm text-neutral-600 font-light leading-snug">{feature}</span>
              </li>
            ))}
          </ul>

          <Button 
            variant={item.highlighted ? 'primary' : 'outline'} 
            className="w-full mt-auto"
            onClick={handleFlip}
          >
            {item.cta}
          </Button>
        </div>

        {/* --- BACK FACE (Formulaire) --- */}
        <div 
          className={`
            absolute inset-0 w-full h-full ${backfaceHiddenClass} ${rotateY180Class}
            flex flex-col p-8 rounded-[4px] bg-white border border-black shadow-xl
          `}
        >
          {/* Bouton fermeture positionné en absolu */}
          <button 
            onClick={handleFlip}
            className="absolute top-8 right-8 text-neutral-400 hover:text-black transition-colors z-20"
            aria-label="Retour"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>

          {/* Conteneur principal décalé vers le bas */}
          <div className="mt-12 flex flex-col flex-1 h-full">
            <h3 className="text-lg font-bold text-black mb-6">Intéressé par l'offre {item.title} ?</h3>

            {formStatus === 'success' ? (
              <div className="flex-1 flex flex-col items-center justify-center animate-fade-in text-center">
                <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 13l4 4L19 7"></path></svg>
                </div>
                <p className="text-black font-medium mb-2">Demande envoyée !</p>
                <p className="text-sm text-neutral-500 font-light">Nous vous recontacterons très vite.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold uppercase tracking-widest text-neutral-400">Nom complet</label>
                  <input 
                    required 
                    type="text" 
                    className="w-full border-b border-neutral-300 py-2 text-sm focus:border-black focus:outline-none bg-transparent placeholder-neutral-300 transition-colors"
                    placeholder="Jean Dupont"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold uppercase tracking-widest text-neutral-400">Email</label>
                  <input 
                    required 
                    type="email" 
                    className="w-full border-b border-neutral-300 py-2 text-sm focus:border-black focus:outline-none bg-transparent placeholder-neutral-300 transition-colors"
                    placeholder="jean@exemple.com"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold uppercase tracking-widest text-neutral-400">Téléphone</label>
                  <input 
                    required 
                    type="tel" 
                    className="w-full border-b border-neutral-300 py-2 text-sm focus:border-black focus:outline-none bg-transparent placeholder-neutral-300 transition-colors"
                    placeholder="079 123 45 67"
                  />
                </div>

                <div className="mt-auto pt-4">
                  <p className="text-[10px] text-neutral-400 text-center mb-3 leading-tight">
                    Sans engagement.<br />Nous ne partageons pas vos données.
                  </p>
                  <Button 
                    type="submit" 
                    variant="primary" 
                    className="w-full"
                    disabled={formStatus === 'submitting'}
                  >
                    {formStatus === 'submitting' ? 'Envoi...' : 'Envoyer la demande'}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

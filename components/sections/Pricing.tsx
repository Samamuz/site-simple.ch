
import React from 'react';
import { pricingData } from '../../lib/agency-data';
import { PricingCard } from '../ui/PricingCard';

export const Pricing: React.FC = () => {
  return (
    <section id="tarifs" className="py-24 px-6 bg-neutral-50 border-t border-neutral-100">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-black">NOS SERVICES</h2>
          <p className="text-lg text-neutral-500 font-light max-w-2xl mx-auto">
            Choisissez l'offre clé-en-main qui vous convient le mieux. Tout est inclus.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {pricingData.map((item, index) => (
            <div key={index} className="h-full">
              <PricingCard item={item} />
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-sm text-neutral-400 font-light">
            Tous nos prix sont en Francs Suisses (CHF). Facturation annuelle.
          </p>
        </div>
      </div>
    </section>
  );
};

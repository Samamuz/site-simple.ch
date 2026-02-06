
import React from 'react';
import { portfolioData } from '../../lib/agency-data';
import { ImageWithLoader } from '../ui/ImageWithLoader';

export const Portfolio: React.FC = () => {
  return (
    <section id="travaux" className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 border-b border-neutral-100 pb-8">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-black mb-4">NOS TRAVAUX</h2>
          <p className="text-lg text-neutral-500 font-light">
            Quelques exemples de ce que nous sommes capables d'accomplir.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioData.map((item) => (
            <a 
              key={item.id}
              href={item.url}
              target="_blank" 
              rel="noopener noreferrer"
              className="group block bg-white rounded-[2px] overflow-hidden border border-neutral-100 hover:shadow-xl hover:shadow-black/5 transition-all duration-300"
            >
              <div className="aspect-video relative overflow-hidden">
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors z-10 flex items-center justify-center">
                   <span className="opacity-0 group-hover:opacity-100 bg-white text-black px-4 py-2 text-xs font-medium rounded-full transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                     Visiter le site
                   </span>
                </div>
                <ImageWithLoader 
                  src={item.thumbnail} 
                  alt={item.alt}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-medium text-black mb-1 group-hover:text-neutral-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-neutral-400 font-light truncate">
                  {item.alt}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

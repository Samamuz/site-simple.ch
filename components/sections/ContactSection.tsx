
import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { contactInfo } from '../../lib/agency-data';

export const ContactSection: React.FC = () => {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('submitting');
    // Simulation
    setTimeout(() => setFormStatus('success'), 1000);
  };

  return (
    <section id="contact" className="py-24 px-6 bg-black text-white">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">CONTACT</h2>
          <p className="text-lg text-neutral-400 font-light">
            Un projet ? Une question ? Parlons-en.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-24 items-start">
          {/* Info Column */}
          <div className="space-y-12 order-2 md:order-1">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-neutral-500 mb-6">Nos Coordonnées</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  </div>
                  <div>
                    <p className="font-medium text-white">Adresse</p>
                    <p className="text-neutral-400 font-light mt-1 whitespace-pre-line">{contactInfo.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  </div>
                  <div>
                    <p className="font-medium text-white">Téléphone</p>
                    <a href={`tel:${contactInfo.phone.replace(/\s/g, '')}`} className="text-neutral-400 font-light mt-1 hover:text-white transition-colors block">
                      {contactInfo.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center shrink-0">
                     <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  </div>
                  <div>
                    <p className="font-medium text-white">Email</p>
                    <a href={`mailto:${contactInfo.email}`} className="text-neutral-400 font-light mt-1 hover:text-white transition-colors block">
                      {contactInfo.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="h-64 w-full bg-neutral-900 rounded-[2px] overflow-hidden border border-neutral-800">
               <iframe 
                 width="100%" 
                 height="100%" 
                 frameBorder="0" 
                 scrolling="no" 
                 src={contactInfo.mapsUrl}
                 className="w-full h-full opacity-85 hover:opacity-100 transition-opacity duration-500"
                 title="Agence Location"
                 loading="lazy"
               ></iframe>
            </div>
          </div>

          {/* Form Column */}
          <div className="order-1 md:order-2 bg-neutral-900 p-8 rounded-[4px] border border-neutral-800 relative min-h-[500px]">
            {formStatus === 'success' ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-neutral-900 z-10 animate-fade-in p-8 text-center rounded-[4px]">
                <div className="w-16 h-16 rounded-full bg-green-900/30 border border-green-800 flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 13l4 4L19 7"></path></svg>
                </div>
                <h3 className="text-2xl font-light text-white mb-2">Message envoyé !</h3>
                <p className="text-neutral-400 font-light mb-8">Merci de nous avoir contacté. Nous vous répondrons sous 24h.</p>
                <Button variant="secondary" onClick={() => setFormStatus('idle')} className="text-white border-white bg-transparent hover:bg-white hover:text-black">Envoyer un autre message</Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className={`flex flex-col gap-6 ${formStatus === 'submitting' ? 'opacity-50 pointer-events-none' : ''}`}>
                 <h3 className="text-xl font-light text-white mb-2">Formulaire de contact</h3>
                 
                 <div className="grid grid-cols-2 gap-4">
                    <div className="group">
                      <input type="text" name="nom" placeholder="Nom" required className="w-full bg-neutral-800 border border-neutral-700 text-white placeholder-neutral-500 p-3 rounded-[2px] text-sm focus:outline-none focus:border-white transition-colors" />
                    </div>
                    <div className="group">
                      <input type="text" name="prenom" placeholder="Prénom" required className="w-full bg-neutral-800 border border-neutral-700 text-white placeholder-neutral-500 p-3 rounded-[2px] text-sm focus:outline-none focus:border-white transition-colors" />
                    </div>
                 </div>

                 <input type="email" name="email" placeholder="Email" required className="w-full bg-neutral-800 border border-neutral-700 text-white placeholder-neutral-500 p-3 rounded-[2px] text-sm focus:outline-none focus:border-white transition-colors" />
                 
                 <input type="tel" name="telephone" placeholder="Téléphone (facultatif)" className="w-full bg-neutral-800 border border-neutral-700 text-white placeholder-neutral-500 p-3 rounded-[2px] text-sm focus:outline-none focus:border-white transition-colors" />

                 <textarea name="message" rows={5} placeholder="Comment pouvons-nous vous aider ?" required className="w-full bg-neutral-800 border border-neutral-700 text-white placeholder-neutral-500 p-3 rounded-[2px] text-sm focus:outline-none focus:border-white transition-colors resize-y"></textarea>

                 <Button type="submit" variant="secondary" className="mt-2 w-full text-black bg-white hover:bg-neutral-200 border-transparent" disabled={formStatus === 'submitting'}>
                    {formStatus === 'submitting' ? 'Envoi...' : 'Envoyer le message'}
                 </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

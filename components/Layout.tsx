
import React, { useRef } from 'react';
import { Navigation } from './Navigation';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const mainRef = useRef<HTMLElement>(null);
  
  return (
    <div className="bg-white font-sans text-neutral-900 min-h-screen flex flex-col">
      <Navigation />
      
      <main 
        ref={mainRef}
        className="flex-1 w-full max-w-full mx-auto relative pt-20"
      >
        {children}
      </main>
      
      <footer className="py-12 border-t border-neutral-100 text-center text-xs text-neutral-400 tracking-wider uppercase bg-white relative z-20 shrink-0">
        <p>© 2026 site-simple.ch - Tout simplement.</p>
      </footer>
    </div>
  );
};

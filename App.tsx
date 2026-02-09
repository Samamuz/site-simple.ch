
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Layout } from './components/Layout';
import { LandingPage } from './pages/LandingPage';
import { SplashScreen } from './components/ui/SplashScreen';

// Composant utilitaire pour scroller en haut à chaque changement de route
const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
};

const App: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // 1. Désactiver la restauration automatique du scroll par le navigateur
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    
    // 2. Forcer immédiatement le haut de page
    window.scrollTo(0, 0);

    // Note : On ne vérifie plus 'hasSeenSplash' pour forcer le splash à chaque rechargement
    // comme demandé.
  }, []);

  const handleSplashComplete = () => {
    // Marque le splash comme vu (même si on ne l'utilise plus pour bloquer, c'est utile pour d'autres logiques éventuelles)
    sessionStorage.setItem('hasSeenSplash', 'true');
    setShowSplash(false);
    
    // 3. Une fois le splash terminé, on s'assure une dernière fois d'être tout en haut
    window.scrollTo(0, 0);
  };

  return (
    <Router>
      <ScrollToTop />
      {/* Le Splash Screen est rendu au-dessus de tout le reste */}
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
      
      {/* L'application est rendue en arrière-plan pour être prête quand le rideau se lève */}
      <Layout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          {/* Catch all redirect to home */}
          <Route path="*" element={<LandingPage />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;

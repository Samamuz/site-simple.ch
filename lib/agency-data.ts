
import { PricingItem, PortfolioItem } from '../types';

export const pricingData: PricingItem[] = [
  {
    title: "Basique",
    badge: "Site vitrine",
    features: [
      "Design complet du site",
      "Maintenance en ligne",
      "Hébergement inclus",
      "Nom de domaine offert (1 an)"
    ],
    originalPrice: "CHF 399",
    currentPrice: "CHF 199",
    note: "Paiement annuel — Offre spéciale",
    cta: "Choisir",
    highlighted: false
  },
  {
    title: "Pro",
    badge: "Site 3-5 pages",
    features: [
      "Référencement et SEO avancé",
      "Support prioritaire 7/7",
      "Formulaire de contact sécurisé",
      "Statistiques de visite"
    ],
    originalPrice: "CHF 499",
    currentPrice: "CHF 299",
    note: "Paiement annuel — Offre spéciale",
    cta: "Choisir",
    highlighted: true
  },
  {
    title: "Entreprise",
    badge: "Fonctionnalités avancées",
    features: [
      "Intégrations personnalisées",
      "Support dédié",
      "CMS sur mesure",
      "Formation à l'utilisation"
    ],
    originalPrice: null,
    currentPrice: "Sur devis",
    note: "100% sur mesure",
    cta: "Nous contacter",
    highlighted: false
  }
];

export const portfolioData: PortfolioItem[] = [
  {
    id: 1,
    title: "La Tavola",
    thumbnail: "https://images.unsplash.com/photo-1579027989536-b7b1f875659b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    url: "https://samamuz.github.io/la-tavola.io/#/",
    alt: "Restaurant italien authentique"
  },
  {
    id: 2,
    title: "Bois & Tradition",
    thumbnail: "https://images.unsplash.com/photo-1611021061421-93741ec41ce1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    url: "https://samamuz.github.io/bois-et-tradition/",
    alt: "Site professionnel pour un artisan menuisier"
  },
  {
    id: 3,
    title: "Maison Aura",
    thumbnail: "https://images.unsplash.com/photo-1695527081874-b674c46f40fb?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    url: "https://samamuz.github.io/Maison-Aura.io/",
    alt: "Salon de coiffure à Paris"
  },
  {
    id: 4,
    title: "Bureau Martin",
    thumbnail: "https://images.unsplash.com/photo-1542621323-be453184db76?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    url: "https://samamuz.github.io/Bureau-Martin/",
    alt: "Bureau d'architecture et d'urbanisme"
  },
  {
    id: 5,
    title: "Studio Flow",
    thumbnail: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    url: "https://samamuz.github.io/studio-Flow/",
    alt: "Portfolio de graphiste & Direction artistique"
  }
];

export const contactInfo = {
  address: "Rue de Sainte-Beuve 6, 1004 Lausanne",
  phone: "079 718 78 65",
  email: "contact@site-simple.ch",
  mapsUrl: "https://maps.google.com/maps?q=Rue+de+Sainte-Beuve+6,+1004+Lausanne&t=h&z=15&ie=UTF8&iwloc=&output=embed"
};

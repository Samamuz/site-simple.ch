
// Types pour le Chatbot IA
export interface Message {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: Date;
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  error?: string;
}

// Types pour les données de l'Agence
export interface PricingItem {
  title: string;
  badge: string;
  features: string[];
  originalPrice: string | null;
  currentPrice: string;
  note: string;
  cta: string;
  highlighted: boolean;
}

export interface PortfolioItem {
  id: number;
  title: string;
  thumbnail: string;
  url: string;
  alt: string;
}

export interface ContactInfo {
  address: string;
  phone: string;
  email: string;
  mapsUrl: string;
}

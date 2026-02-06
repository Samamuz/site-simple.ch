
export interface Experience {
  poste: string;
  entreprise: string;
  periode: string;
  description: string;
  technologies: string[];
  realisations: string[];
}

export interface Education {
  diplome: string;
  etablissement: string;
  annee: string;
  mention?: string;
}

export interface Language {
  langue: string;
  niveau: string;
}

export interface Skills {
  techniques: string[];
  outils: string[];
  softSkills: string[];
  specialSkills: string[];
  langues: Language[];
}

export interface Project {
  nom: string;
  description: string;
  technologies: string[];
  lien?: string;
  image?: string;
}

export interface Identite {
  nom: string;
  titre: string;
  photo?: string;
  bio: string;
  localisation: string;
}

export interface Contact {
  email: string;
  linkedin?: string;
  github?: string;
  portfolio?: string;
  telephone?: string;
}

export interface Internship {
  salaire: string;
  types: string[];
  disponibilite: string;
  valeurAjoutee: string;
}

export interface CVData {
  identite: Identite;
  contact: Contact;
  experiences: Experience[];
  formation: Education[];
  competences: Skills;
  projets: Project[];
  interets?: string[];
  stage?: Internship;
}

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

// --- New Agency Types ---

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

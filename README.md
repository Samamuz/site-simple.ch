<div align="center">

# 🌐 site-simple.ch

**Agence Web Suisse — Lausanne**

*Votre site, sans tracas : on le crée, on le maintient. Vous profitez.*

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-Private-red)](#licence)

[Voir le site en ligne →](https://site-simple.ch)

</div>

---

## 📋 Table des matières

- [Aperçu](#-aperçu)
- [Fonctionnalités](#-fonctionnalités)
- [Stack technique](#-stack-technique)
- [Architecture du projet](#-architecture-du-projet)
- [Prérequis](#-prérequis)
- [Installation](#-installation)
- [Scripts disponibles](#-scripts-disponibles)
- [Configuration](#-configuration)
- [Déploiement](#-déploiement)
- [Performances](#-performances)
- [Licence](#-licence)

---

## 🎯 Aperçu

**site-simple.ch** est le site vitrine d'une agence web lausannoise spécialisée dans la création de sites internet clés en main, simples et performants pour les PME et indépendants suisses.

Le site est conçu comme une **single-page application** (SPA) moderne avec un design minimaliste noir et blanc, mettant en avant la proposition de valeur de l'agence à travers un parcours utilisateur fluide :

> **Hero** → **Portfolio** → **Tarifs** → **Contact**

---

## ✨ Fonctionnalités

| Fonctionnalité | Description |
|---|---|
| 🎬 **Splash Screen** | Animation d'entrée élégante au chargement |
| 🧭 **Navigation fluide** | Menu hamburger animé avec scroll ancre smooth |
| 🖼️ **Portfolio interactif** | Galerie de réalisations avec chargement progressif des images |
| 💰 **Grille tarifaire** | Trois formules avec mise en avant de l'offre recommandée |
| 📱 **Responsive Design** | Interface adaptée mobile, tablette et desktop |
| 🎨 **Design System** | Composants UI réutilisables (Button, PricingCard, ImageWithLoader…) |
| 📍 **Section Contact** | Carte Google Maps intégrée + coordonnées complètes |
| ⚡ **Animations CSS** | Fade-in, slide-up et transitions fluides via Tailwind |

---

## 🛠 Stack technique

| Technologie | Version | Rôle |
|---|---|---|
| [React](https://react.dev/) | 19.x | Bibliothèque UI |
| [TypeScript](https://www.typescriptlang.org/) | 5.8 | Typage statique |
| [Vite](https://vite.dev/) | 6.x | Bundler & serveur de développement |
| [Tailwind CSS](https://tailwindcss.com/) | 3.x | Framework CSS utilitaire |
| [React Router](https://reactrouter.com/) | 7.x | Routage SPA (HashRouter) |
| [React Markdown](https://github.com/remarkjs/react-markdown) | 10.x | Rendu Markdown |
| [Inter](https://rsms.me/inter/) | — | Police d'interface |

---

## 📁 Architecture du projet

```
site-simple.ch/
├── index.html              # Point d'entrée HTML + config Tailwind
├── index.tsx               # Bootstrap React
├── App.tsx                 # Routeur principal + Splash Screen
├── types.ts                # Interfaces TypeScript partagées
├── vite.config.ts          # Configuration Vite + alias
├── tsconfig.json           # Configuration TypeScript
│
├── components/
│   ├── Layout.tsx          # Layout principal (Navigation + contenu)
│   ├── Navigation.tsx      # Barre de navigation + menu mobile
│   ├── ScrollToTop.tsx     # Utilitaire de scroll automatique
│   ├── sections/
│   │   ├── Hero.tsx        # Section héro plein écran
│   │   ├── Portfolio.tsx   # Galerie de projets réalisés
│   │   ├── Pricing.tsx     # Grille tarifaire
│   │   ├── ContactSection.tsx  # Formulaire & infos de contact
│   │   ├── ProjectCard.tsx     # Carte projet individuelle
│   │   └── ExperienceCard.tsx  # Carte expérience
│   └── ui/
│       ├── Button.tsx          # Composant bouton (variants)
│       ├── PricingCard.tsx     # Carte tarif individuelle
│       ├── ImageWithLoader.tsx # Image avec skeleton loader
│       └── SplashScreen.tsx    # Écran de chargement animé
│
├── pages/
│   ├── LandingPage.tsx     # Page d'accueil (composition des sections)
│   ├── Home.tsx            # Page Home alternative
│   └── ...                 # Pages additionnelles
│
├── hooks/
│   └── useScrollHighlight.ts   # Hook personnalisé pour le scroll
│
├── lib/
│   ├── agency-data.ts      # Données de l'agence (tarifs, portfolio, contact)
│   └── cv-data.ts          # Données CV / profil
│
└── services/
    └── geminiService.ts    # Service API Gemini (optionnel)
```

---

## 📋 Prérequis

| Outil | Version minimale |
|---|---|
| [Node.js](https://nodejs.org/) | 18.x ou supérieur |
| [npm](https://www.npmjs.com/) | 9.x ou supérieur |

---

## 🚀 Installation

**1. Cloner le dépôt**

```bash
git clone https://github.com/votre-utilisateur/site-simple.ch.git
cd site-simple.ch
```

**2. Installer les dépendances**

```bash
npm install
```

**3. Configurer l'environnement** *(optionnel)*

```bash
cp .env.example .env.local
```

Renseigner la clé API si nécessaire :

```env
GEMINI_API_KEY=votre_clé_api_ici
```

**4. Lancer le serveur de développement**

```bash
npm run dev
```

Le site est accessible sur **[http://localhost:3000](http://localhost:3000)**.

---

## 📜 Scripts disponibles

| Commande | Description |
|---|---|
| `npm run dev` | Lance le serveur de développement Vite (port 3000) |
| `npm run build` | Compile le projet pour la production |
| `npm run preview` | Prévisualise le build de production localement |

---

## ⚙️ Configuration

### Vite

Le fichier `vite.config.ts` configure :

- **Serveur de développement** → port `3000`, accessible sur le réseau (`0.0.0.0`)
- **Alias de chemin** → `@/` pointe vers la racine du projet
- **Variables d'environnement** → injection de `GEMINI_API_KEY` via `process.env`

### TypeScript

- **Cible** : ES2022
- **Module** : ESNext avec résolution `bundler`
- **JSX** : `react-jsx` (transformation automatique)
- **Alias** : `@/*` → `./*`

### Tailwind CSS

Configuration inline dans `index.html` avec :

- Police **Inter** comme font-family par défaut
- Palette de couleurs **neutres** personnalisée
- Animations personnalisées : `fade-in`, `slide-up`, `slide-down`, `blink`

---

## 🚢 Déploiement

### Build de production

```bash
npm run build
```

Les fichiers optimisés sont générés dans le dossier `dist/`.

### Hébergement recommandé

| Plateforme | Type | Notes |
|---|---|---|
| [Vercel](https://vercel.com/) | SPA / Static | Zero-config pour Vite |
| [Netlify](https://www.netlify.com/) | SPA / Static | Redirection SPA automatique |
| [GitHub Pages](https://pages.github.com/) | Static | Nécessite le HashRouter (déjà configuré) |
| [Cloudflare Pages](https://pages.cloudflare.com/) | Static | Performance edge mondiale |

> **Note** : Le projet utilise `HashRouter`, ce qui le rend compatible avec tout hébergement statique sans configuration serveur additionnelle.

---

## ⚡ Performances

Le site est optimisé pour des performances maximales :

- **Vite** — bundling ultra-rapide avec tree-shaking et code-splitting
- **Tailwind CSS via CDN** — styles chargés sans étape de build CSS
- **Images Unsplash optimisées** — paramètres `auto=format&fit=crop` pour servir le format optimal
- **Chargement progressif** — composant `ImageWithLoader` avec skeleton placeholder
- **Animations GPU** — utilisation de `transform-gpu` et `will-change-transform`
- **Police Inter** — `preconnect` pour un chargement rapide des fonts

---

## 🤝 Contact

| | |
|---|---|
| 📍 **Adresse** | Rue de Sainte-Beuve 6, 1004 Lausanne |
| 📞 **Téléphone** | 079 718 78 65 |
| ✉️ **Email** | contact@site-simple.ch |

---

## 📄 Licence

Ce projet est **privé** et propriétaire. Tous droits réservés © 2025 site-simple.ch.

---

<div align="center">

**Fait avec ❤️ à Lausanne, Suisse**

</div>

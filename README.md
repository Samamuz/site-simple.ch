<div align="center">

# site-simple.ch

**Agence Web Suisse -- Lausanne**

*Votre site, sans tracas : on le cree, on le maintient. Vous profitez.*

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-Proprietary-red)](#licence)

[Voir le site en ligne](https://site-simple.ch)

</div>

---

## Table des matieres

- [Apercu](#apercu)
- [Fonctionnalites](#fonctionnalites)
- [Stack technique](#stack-technique)
- [Architecture du projet](#architecture-du-projet)
- [Prerequis](#prerequis)
- [Installation](#installation)
- [Scripts disponibles](#scripts-disponibles)
- [Configuration](#configuration)
- [Deploiement](#deploiement)
- [Performances](#performances)
- [Contact](#contact)
- [Licence](#licence)

---

## Apercu

**site-simple.ch** est le site vitrine d'une agence web lausannoise specialisee dans la creation de sites internet cles en main, simples et performants pour les PME et independants suisses.

Le site est concu comme une **single-page application** (SPA) moderne avec un design minimaliste noir et blanc, mettant en avant la proposition de valeur de l'agence a travers un parcours utilisateur fluide :

> **Hero** -- **Portfolio** -- **Tarifs** -- **Contact**

---

## Fonctionnalites

| Fonctionnalite | Description |
|---|---|
| **Splash Screen** | Animation d'entree elegante au chargement |
| **Navigation fluide** | Menu hamburger anime avec scroll ancre smooth |
| **Portfolio interactif** | Galerie de realisations avec chargement progressif des images |
| **Grille tarifaire** | Trois formules avec mise en avant de l'offre recommandee |
| **Responsive Design** | Interface adaptee mobile, tablette et desktop |
| **Design System** | Composants UI reutilisables (Button, PricingCard, ImageWithLoader) |
| **Section Contact** | Carte Google Maps integree et coordonnees completes |
| **Animations CSS** | Fade-in, slide-up et transitions fluides via Tailwind |

---

## Stack technique

| Technologie | Version | Role |
|---|---|---|
| [React](https://react.dev/) | 19.x | Bibliotheque UI |
| [TypeScript](https://www.typescriptlang.org/) | 5.8 | Typage statique |
| [Vite](https://vite.dev/) | 6.x | Bundler et serveur de developpement |
| [Tailwind CSS](https://tailwindcss.com/) | 3.x | Framework CSS utilitaire |
| [React Router](https://reactrouter.com/) | 7.x | Routage SPA (HashRouter) |
| [React Markdown](https://github.com/remarkjs/react-markdown) | 10.x | Rendu Markdown |
| [Inter](https://rsms.me/inter/) | -- | Police d'interface |

---

## Architecture du projet

```
site-simple.ch/
├── index.html                  # Point d'entree HTML + config Tailwind
├── index.tsx                   # Bootstrap React
├── App.tsx                     # Routeur principal + Splash Screen
├── types.ts                    # Interfaces TypeScript partagees
├── style.css                   # Styles globaux
├── vite.config.ts              # Configuration Vite + alias
├── tsconfig.json               # Configuration TypeScript
│
├── components/
│   ├── Layout.tsx              # Layout principal (Navigation + contenu)
│   ├── Navigation.tsx          # Barre de navigation + menu mobile
│   ├── sections/
│   │   ├── Hero.tsx            # Section hero plein ecran
│   │   ├── Portfolio.tsx       # Galerie de projets realises
│   │   ├── Pricing.tsx         # Grille tarifaire
│   │   └── ContactSection.tsx  # Informations de contact + carte
│   └── ui/
│       ├── Button.tsx          # Composant bouton (variants)
│       ├── PricingCard.tsx     # Carte tarif individuelle
│       ├── ImageWithLoader.tsx # Image avec skeleton loader
│       └── SplashScreen.tsx    # Ecran de chargement anime
│
├── pages/
│   └── LandingPage.tsx         # Page d'accueil (composition des sections)
│
├── lib/
│   └── agency-data.ts          # Donnees de l'agence (tarifs, portfolio, contact)
│
└── public/
    ├── CNAME                   # Configuration domaine personnalise
    ├── robots.txt              # Directives pour les robots d'indexation
    ├── sitemap.xml             # Plan du site pour le SEO
    ├── favicon/                # Icones et manifeste PWA
    └── images/                 # Assets visuels (WebP)
```

---

## Prerequis

| Outil | Version minimale |
|---|---|
| [Node.js](https://nodejs.org/) | 18.x ou superieur |
| [npm](https://www.npmjs.com/) | 9.x ou superieur |

---

## Installation

### 1. Cloner le depot

```bash
git clone https://github.com/votre-utilisateur/site-simple.ch.git
cd site-simple.ch
```

### 2. Installer les dependances

```bash
npm install
```

### 3. Configurer l'environnement (optionnel)

```bash
cp .env.example .env.local
```

Renseigner la cle API si necessaire :

```env
GEMINI_API_KEY=votre_cle_api_ici
```

### 4. Lancer le serveur de developpement

```bash
npm run dev
```

Le site est accessible sur **http://localhost:3000**.

---

## Scripts disponibles

| Commande | Description |
|---|---|
| `npm run dev` | Lance le serveur de developpement Vite (port 3000) |
| `npm run build` | Compile le projet pour la production |
| `npm run preview` | Previsualise le build de production localement |

---

## Configuration

### Vite

Le fichier `vite.config.ts` configure :

- **Serveur de developpement** : port `3000`, accessible sur le reseau (`0.0.0.0`)
- **Alias de chemin** : `@/` pointe vers la racine du projet
- **Variables d'environnement** : injection de `GEMINI_API_KEY` via `process.env`

### TypeScript

- **Cible** : ES2022
- **Module** : ESNext avec resolution `bundler`
- **JSX** : `react-jsx` (transformation automatique)
- **Alias** : `@/*` vers `./`

### Tailwind CSS

Configuration inline dans `index.html` avec :

- Police **Inter** comme font-family par defaut
- Palette de couleurs **neutres** personnalisee
- Animations personnalisees : `fade-in`, `slide-up`, `slide-down`, `blink`

---

## Deploiement

### Build de production

```bash
npm run build
```

Les fichiers optimises sont generes dans le dossier `dist/`.

### Hebergement recommande

| Plateforme | Type | Notes |
|---|---|---|
| [Vercel](https://vercel.com/) | SPA / Static | Zero-config pour Vite |
| [Netlify](https://www.netlify.com/) | SPA / Static | Redirection SPA automatique |
| [GitHub Pages](https://pages.github.com/) | Static | Necessite le HashRouter (deja configure) |
| [Cloudflare Pages](https://pages.cloudflare.com/) | Static | Performance edge mondiale |

> **Note** : Le projet utilise `HashRouter`, ce qui le rend compatible avec tout hebergement statique sans configuration serveur additionnelle.

---

## Performances

Le site est optimise pour des performances maximales :

- **Vite** -- Bundling ultra-rapide avec tree-shaking et code-splitting
- **Assets WebP** -- Images compressees en format nouvelle generation
- **Chargement progressif** -- Composant `ImageWithLoader` avec skeleton placeholder
- **Animations GPU** -- Utilisation de `transform-gpu` et `will-change-transform`
- **Police Inter** -- `preconnect` pour un chargement rapide des fonts
- **SEO** -- Sitemap XML, robots.txt et balises meta configurees

---

## Contact

| | |
|---|---|
| **Adresse** | Rue de Sainte-Beuve 6, 1004 Lausanne |
| **Telephone** | 079 718 78 65 |
| **Email** | contact@site-simple.ch |

---

## Licence

Ce projet est distribue sous une **licence proprietaire**. Tous droits reserves.

Consultation autorisee a des fins d'evaluation personnelle uniquement. Toute reproduction, modification, distribution ou utilisation commerciale est strictement interdite sans autorisation ecrite prealable de l'auteur.

Voir le fichier [LICENCE](LICENCE) pour les conditions completes.

Copyright 2026 Samuel BARMAN.

---

<div align="center">

Concu et developpe a Lausanne, Suisse

</div>

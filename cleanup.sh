
#!/bin/bash
# Script de nettoyage des fichiers obsolètes du projet site-simple.ch
# Exécutez ce script à la racine du projet pour supprimer les fichiers inutilisés.

echo "🧹 Démarrage du nettoyage..."

# Suppression des pages de l'ancien CV
rm -f pages/Home.tsx
rm -f pages/Experience.tsx
rm -f pages/Education.tsx
rm -f pages/Skills.tsx
rm -f pages/Projects.tsx
rm -f pages/Career.tsx
rm -f pages/AboutMe.tsx
rm -f pages/Assistant.tsx
rm -f pages/Contact.tsx

# Suppression des composants et hooks obsolètes
rm -f components/sections/ExperienceCard.tsx
rm -f components/sections/ProjectCard.tsx
rm -f components/ScrollToTop.tsx
rm -f hooks/useScrollHighlight.ts

# Suppression des anciennes données
rm -f lib/cv-data.ts

# Suppression des fichiers liés à l'Assistant IA (Feature retirée)
rm -f components/sections/AssistantSection.tsx
rm -f services/geminiService.ts
rm -f lib/ai-prompt.ts

echo "✨ Nettoyage terminé ! Les fichiers obsolètes ont été supprimés."

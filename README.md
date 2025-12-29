# Portfolio BTS SIO SLAM (2025-2026)

Un portfolio simple, propre et exportable en PDF, structuré en 8 parties (couverture, introduction, à propos, compétences, expérience, projets, veille, annexes). Tout est statique (HTML/CSS/JS), sans dépendances ni build.

## Démarrage rapide

1) Ouvrir `index.html` dans votre navigateur (double-clic).
- Si les données personnalisées ne s’affichent pas, utilisez le bouton « Importer JSON » pour charger votre `content.json`.
- Ou lancez un petit serveur local (recommandé) pour charger automatiquement `content.json` (voir plus bas).

2) Personnaliser `content.json` avec vos informations (nom, liens, compétences, expériences, projets, veilles, annexes).

3) Exporter en PDF: bouton « Télécharger en PDF » (utilise l’impression du navigateur, mise en page A4 et sauts de page).

## Contenu à modifier

- `content.json`: toutes vos données (texte, liens, images/logos via URL). Les images peuvent être placées en ligne (ex: `https://…`) ou dans un dossier `assets/` si vous servez les fichiers via un serveur local.
- `assets/`: placez votre photo, logos, captures si besoin (mettre l’URL relative dans `content.json`).

## Serveur local (optionnel mais conseillé)

- VS Code + extension « Live Server »: clic droit sur `index.html` > « Open with Live Server ».
- Ou Node.js installé: `npx serve` (puis ouvrir l’URL indiquée).
- Ou Python 3: `python -m http.server` (puis `http://localhost:8000`).

Ouvrir ensuite la page `http://localhost:.../index.html`. Le chargement de `content.json` fonctionnera automatiquement.

## Structure

- `index.html`: 8 sections conformes au plan demandé + barre d’actions (Importer JSON, Export PDF)
- `css/style.css`: styles écran + styles d’impression (A4, sauts de page, liens imprimés)
- `js/main.js`: chargement des données (`content.json`), rendu du contenu et import JSON local
- `content.json`: exemple prêt à personnaliser
- `assets/`: dossier pour images (photo, logos, captures)

## Export PDF propre

- Bouton « Télécharger en PDF » = `window.print()`
- `@page { size: A4; margin: 14mm; }` + `page-break-after` pour séparer les chapitres
- Les éléments non pertinents (barre de navigation, actions) sont masqués à l’impression

## Conseils

- Remplacez progressivement le contenu d’exemple de `content.json` par vos textes définitifs.
- Mettez des URLs valides (GitHub, LinkedIn, CV) et des images de qualité.
- Pour la partie « Projets (E4) », ajoutez 1–2 projets avec captures et technos.
- Pour la « Veille (E6.1) », gardez 1 page par sujet avec problématique/outils/exemple/conclusion.

## Licence

Libre d’utilisation pour un usage scolaire.






# Portfolio React (Vite + Tailwind + Router + shadcn-style)

Projet base pour un portfolio étudiant BTS SIO SLAM.

## Installation

```bash
npm install
npm run dev
```

- Le serveur de dev démarre sur `http://localhost:5173` (ou un port libre).

## Stack
- React + Vite (TypeScript)
- Tailwind CSS v4
- React Router
- Composants UI inspirés de shadcn/ui (Button, Card, Badge, Input, Textarea)
- Icônes `lucide-react`

## Structure
```
portfolio-react/
  src/
    components/
      Navbar.tsx
      Footer.tsx
      ui/
        button.tsx
        card.tsx
        badge.tsx
        input.tsx
        textarea.tsx
    hooks/
      useInView.ts
    pages/
      Home.tsx
      About.tsx
      Projects.tsx
      Skills.tsx
      Contact.tsx
    lib/
      utils.ts
    index.css
    main.tsx
    App.tsx
  index.html
  vite.config.ts
  postcss.config.js
```

## Personnalisation
- Remplacez les textes, images et liens (GitHub, LinkedIn) dans les pages.
- Couleurs: modifier les styles utilitaires Tailwind, ou ajouter vos classes.
- Ajoutez des projets dans `pages/Projects.tsx`.

## Déploiement
- Build: `npm run build`
- Prévisualisation: `npm run preview`
- Déployable sur GitHub Pages, Netlify, Vercel, etc.

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

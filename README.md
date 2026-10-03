# Stem Together

A mobile-first PWA helping high school girls explore studying STEM by connecting them with female university students who share their doubts.

The current app is a local prototype with four bundled mentor profiles, six doubt categories, discovery and subject filters, profile dialogs, conversations, and an about view. It uses React 19, TypeScript 6, and Vite 8, with responsive layouts and automatic light/dark styling based on the system color scheme.

## Run locally

Run commands from the repository root, which contains `package.json`; there is no nested `normandy/` application directory. Install Node.js and npm compatible with the locked Vite dependencies.

- `npm ci`
- `npm run dev`
- `npm run lint`
- `npm run build`
- `npm run preview`

`npm run dev` starts the development server. `npm run lint` checks ESLint rules, and `npm run build` runs TypeScript checks and creates `dist/`. `npm run preview` serves that build locally. `npm run format` applies Prettier to supported files under `src/`; no Prettier configuration is committed, and existing source formatting is mixed. No automated test runner or `npm test` script is configured. Before submitting changes, run lint and build; for UI changes, also check interactions, narrow screens, and both color schemes in the browser.

The service worker runs only in the production build. Use `npm run build` followed by `npm run preview` to test installation and offline mode. Production hosting must use HTTPS (localhost is also supported). Install through the browser's install menu, or Add to Home Screen on iOS. After the first successful load, the app shell, profiles, portraits and locally stored conversations work offline. Google Fonts are optional and fall back to system fonts offline.

## Architecture

- Entry point: `src/main.tsx` mounts React with `StrictMode` and registers the production service worker.
- Presentation: `src/App.tsx` orchestrates UI state; `src/ui/layout/` contains the shell and dialogs, and `src/ui/views/` contains discovery, profile, messages, and about components with colocated CSS.
- Application: `src/services/mentorService.ts`. Matching logic and repository orchestration. Matches share at least one selected category; students sharing more categories appear first. With no categories selected, all profiles appear.
- Domain: `src/models.ts`. Mentor, category, message, and repository contracts.
- Data access: `src/data/localRepository.ts`. Bundled mentor records and local message persistence.

To integrate a backend, implement `MentorRepository` and inject it into `MentorService` instead of `localRepository`. Keep network access out of the presentation layer. Bookmark helpers currently use local storage independently of the repository contract and need separate changes for remote persistence.

## CSS conventions

Component styles use BEM: `block`, `block__element`, and `block__element--modifier` (or `block--modifier`). Keep the base class alongside its modifier in JSX. Shared blocks such as `button`, `tags`, and `page-title` live in `src/ui/shared.css`; `src/index.css` holds global resets and theme variables. Group each block with its elements and state rules, followed by responsive overrides in breakpoint order and dark-theme overrides.

## Application behavior

Mentor profiles cover belonging, confidence, choosing a major, careers, study-life balance, and costs. Category selection and subject filters update the list immediately. Each profile includes a story, advice, categories and a chat action. The conversations view lists all four mentors, including those with no messages yet.

Conversations start with an empty history; sending a message saves it locally without generating a mentor reply. Messages persist under `stem-chat-<mentor-id>` localStorage keys. If storage is unavailable, messages fall back to memory for the current page session; they do not survive a reload.

The current repository stores data on the device and does not deliver messages to other users or synchronize across devices. Backend integration must provide authenticated accounts, conversation authorization, message delivery, and managed mentor records before enabling communication between users.

Portrait assets are bundled from Unsplash under `public/portraits/`. `public/manifest.webmanifest`, PNG icons, and `public/sw.js` provide installation and offline support. The service worker caches the app shell, generated bundles, installation assets, and portraits, and removes older app caches on activation. When changing the production app, increment the cache version in `public/sw.js` so installations refresh their cached bundle. The manifest, service worker, and asset URLs assume deployment at the site root (`/`).

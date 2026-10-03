# Stem Together

A mobile-first PWA helping high school girls explore studying STEM by connecting them with female university students who share their doubts.

## Run locally

From this directory:

- `npm ci`
- `npm run dev`
- `npm run lint`
- `npm run build`
- `npm run preview`

The service worker runs only in the production build. Use `npm run build` followed by `npm run preview` to test installation and offline mode. Production hosting must use HTTPS (localhost is also supported). Install through the browser's install menu, or Add to Home Screen on iOS. After the first successful load, the app shell, profiles, portraits and locally stored conversations work offline. Google Fonts are optional and fall back to system fonts offline.

## Architecture

- Presentation: `src/App.tsx`, `src/ui/`, and CSS. React UI and interaction state.
- Application: `src/application/mentorService.ts`. Matching logic and repository orchestration. Matches share at least one selected category; students sharing more categories appear first.
- Domain: `src/models.ts`. Mentor, category, message, and repository contracts.
- Data access: `src/data/localRepository.ts`. Bundled mentor records and local message persistence.

To integrate a backend, implement `MentorRepository` and inject it into `MentorService` instead of `localRepository`. Keep network access out of the presentation layer. Profiles can be saved independently of the current doubt selections.

## CSS conventions

Component styles use BEM: `block`, `block__element`, and `block__element--modifier` (or `block--modifier`). Keep the base class alongside its modifier in JSX. Shared blocks such as `button`, `tags`, and `page-title` live in `src/ui/shared.css`; `src/index.css` holds global resets and theme variables. Group each block with its elements and state rules, followed by responsive overrides in breakpoint order and dark-theme overrides.

## Application behavior

Mentor profiles cover six doubt categories. Category selection and subject filters update the list immediately. Each profile includes a story, advice, categories, save action and chat action. Conversations start with an empty message history; sending a message saves it locally. Conversations and bookmarks persist in localStorage, with session fallbacks when storage is unavailable.

The current repository stores data on the device and does not deliver messages to other users or synchronize across devices. Backend integration must provide authenticated accounts, conversation authorization, message delivery, and managed mentor records before enabling communication between users.

Portrait assets are bundled from Unsplash. A manifest, PNG icons and a service worker provide installation and offline support. When changing the production app, increment the cache version in `public/sw.js` so installations refresh their cached bundle.

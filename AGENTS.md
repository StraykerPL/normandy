# Repository Guidelines

## Project Structure & Module Organization

Stem Together is a mobile-first STEM mentor discovery PWA using React 19, TypeScript 6, and Vite 8. The application lives at the repository root; run application commands there.

- `src/main.tsx` mounts React with `StrictMode` and registers the service worker in production. `src/App.tsx` orchestrates navigation, filters, bookmarks, dialogs, and message state.
- `src/ui/layout/` contains the application shell, navigation, footer, and detail dialog. `src/ui/views/` contains discovery, profile, messages, and about components, with colocated CSS. `src/ui/Icon.tsx` and `src/ui/types.ts` provide shared UI helpers.
- `src/ui/shared.css` defines shared BEM blocks; `src/index.css` defines global resets and light/dark theme variables. Shell styles live in `src/ui/layout/AppShell.css`.
- `src/services/mentorService.ts` handles category matching and repository orchestration. `src/models.ts` defines domain types, six doubt categories, and the `MentorRepository` contract.
- `src/data/localRepository.ts` contains four bundled mentor records, local message persistence, and bookmark storage helpers. There is no backend or real message delivery.
- `src/assets/` stores imported images and SVGs. `public/` contains portraits, the SVG icon sprite, favicons, PNG installation icons, `manifest.webmanifest`, and `sw.js`.
- `index.html` is the HTML entry point. Vite, TypeScript, and ESLint configuration files live at the application root.
- No test directory or automated test suite currently exists.

## Build, Test, and Development Commands

Run these commands from the directory containing `package.json`.

- `npm ci`: install dependencies from the committed lockfile.
- `npm run dev`: start Vite with hot module replacement.
- `npm run build`: run TypeScript project checks and produce the production bundle in `dist/`.
- `npm run lint`: check TypeScript and TSX files with ESLint, including React Hooks and refresh rules.
- `npm run preview`: serve an existing production build locally; run the build first.
- `npm run format`: run Prettier in write mode on supported files under `src/`.

## Coding Style & Naming Conventions

Use two-space indentation, single quotes in TypeScript, no JavaScript semicolons, and double quotes for JSX attributes. Retain semicolons in CSS declarations. Existing files currently mix this style with Prettier defaults (double quotes and semicolons); no Prettier configuration is committed. Avoid unrelated formatting changes when editing a file. Use PascalCase for React components and component filenames, such as `App.tsx`, and camelCase for functions and variables. Prefer function components and hooks. Use arrow functions by default for components, helpers, callbacks, object properties, and class fields. Use arrow function property types for function contracts. Retain constructor and accessor syntax where arrow functions are not supported; preserve regular functions only when their dynamic `this`, `arguments`, generator, or constructable behavior is required, with a documented ESLint exception. Keep imports explicit and remove unused declarations; TypeScript checks unused locals and parameters. ESLint also requires blank lines after variable declarations (except consecutive declarations) and before return statements.

Use BEM for component CSS: `block`, `block__element`, and `block--modifier` or `block__element--modifier`. Keep the base class alongside its modifier in JSX. Keep component styles colocated, shared blocks in `src/ui/shared.css`, and global theme rules in `src/index.css`.

## Data & PWA Guidelines

Mentor matching includes profiles sharing at least one selected category and sorts by the number of shared categories. No selection shows all mentors. Saved profiles ignore doubt selections but still respect subject filters. Messages use `stem-chat-<mentor-id>` localStorage keys and fall back to in-memory storage; bookmarks use `stem-saved`, with React state retaining them if storage fails. These fallbacks last only for the current page session.

For backend integration, implement `MentorRepository` and inject it into `MentorService`; keep network access out of presentation components. Bookmark helpers currently remain tied to local storage independently of that repository contract.

The service worker runs only in production. Verify installation and offline behavior with `npm run build` and `npm run preview`. Increment the cache version in `public/sw.js` when changing the production app. The manifest and asset paths assume hosting at `/`; production hosting requires HTTPS (localhost is supported).

## Testing Guidelines

No testing framework, `npm test` script, or coverage threshold is configured. Before submitting changes, run `npm run lint` and `npm run build`. For interface changes, verify interactions, narrow-screen layouts, and light/dark themes in the browser. If introducing automated tests, document the runner and command, and use descriptive filenames such as `App.test.tsx`.

## Commit & Pull Request Guidelines

Git history is unavailable in this checkout, so existing commit conventions cannot be confirmed. Use concise, imperative messages such as `Add responsive navigation`. Keep changes focused. Pull requests should explain the change, link relevant issues, record validation performed, and include screenshots for visible interface changes. Commit dependency lockfile updates alongside package changes; exclude generated `dist/` output and `node_modules/`.

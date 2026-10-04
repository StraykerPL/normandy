# TechBestie

A mobile-first, backend-less PWA helping girls explore technology studies through student stories and local conversation previews. Built with the existing React 19, TypeScript 6, and Vite 8 stack.

## Run locally

Run from the repository root with Node.js compatible with Vite 8:

- `npm ci`
- `npm run dev`
- `npm run lint`
- `npm run build`
- `npm run preview` (after building; open `http://localhost:4173/normandy/`)
- `npm run build:test` builds for deployment at `/normandy/`; upload the contents of `dist/` to that subfolder.
- `npm run preview:test` previews that build at `http://localhost:4173/normandy/`.

No new dependencies, server, account, or environment variables are required.

## Flow

The welcome screen leads to four optional, multiple-choice survey steps: fields, school subjects, universities, and questions. Recommendations rank all three bundled students using those answers. Home shows recommendations and a story carousel; the bottom navigation opens Home, Stories, or Matches. Field and university filters apply to recommendations. Each student has a full story and a chat preview. The profile icon and survey link let you revise answers.

Messages save only on this device under `stem-chat-<mentor-id>`; unavailable storage falls back to memory for the current page session. No messages are delivered and no mentor replies are generated. Survey answers and filters remain in React state until reload.

## Architecture and conventions

- `src/App.tsx` orchestrates navigation, survey answers, filters, and conversation state.
- `src/ui/layout/` contains the brand, navigation, filter dialog, and shell styles.
- `src/ui/views/` contains onboarding, discovery, profile, and message views with colocated BEM CSS.
- `src/models.ts` defines the domain and repository contracts.
- `src/services/mentorService.ts` owns recommendation scoring and repository orchestration.
- `src/data/` contains bundled profiles, survey content, and local message persistence.
- `src/index.css` defines resets and system light/dark themes; `src/ui/shared.css` defines shared blocks.

The existing category matcher remains available; survey recommendations add ranking without excluding students for unanswered questions. A future backend should implement `MentorRepository` and be injected into `MentorService`; presentation components do not perform network requests.

## PWA

The service worker runs only in production. Build and preview to verify installation and offline behavior. After a successful online load, the shell, generated assets, and the three new portraits are cached. Development, both build commands, and preview use `/normandy/`, including images, manifest, and service worker scope. Upload the contents of `dist/` into the server's `/normandy/` folder. Hosting requires HTTPS, with localhost supported. Fonts use local fallbacks so the app has no runtime font-service dependency.

## Validation

No test runner is configured. Run lint and build before submitting changes; manually verify interactions, responsive layouts, themes, and offline behavior.

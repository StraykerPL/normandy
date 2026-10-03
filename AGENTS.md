# Repository Guidelines

## Project Structure & Module Organization

The application lives in `normandy/` and uses React, TypeScript, and Vite. Run application commands from that directory.

- `src/main.tsx` mounts React with `StrictMode`; `src/App.tsx` contains the current interface.
- `src/App.css` contains application styles; `src/index.css` defines global styles, theme variables, and responsive rules.
- `src/assets/` stores imported images and SVGs. `public/` stores assets served directly, such as `/icons.svg`.
- `index.html` is the HTML entry point. Vite, TypeScript, and ESLint configuration files live at the application root.
- No test directory or automated test suite currently exists.

## Build, Test, and Development Commands

Start with `cd normandy`.

- `npm ci`: install dependencies from the committed lockfile.
- `npm run dev`: start Vite with hot module replacement.
- `npm run build`: run TypeScript project checks and produce the production bundle in `dist/`.
- `npm run lint`: check TypeScript and TSX files with ESLint, including React Hooks and refresh rules.
- `npm run preview`: serve an existing production build locally; run the build first.

## Coding Style & Naming Conventions

Match existing code: two-space indentation, single quotes in TypeScript, no JavaScript semicolons, and double quotes for JSX attributes. Retain semicolons in CSS declarations. Use PascalCase for React components and component filenames, such as `App.tsx`, and camelCase for functions and variables. Prefer function components and hooks. Use arrow functions by default for components, helpers, callbacks, object properties, and class fields. Use arrow function property types for function contracts. Retain constructor and accessor syntax where arrow functions are not supported; preserve regular functions only when their dynamic `this`, `arguments`, generator, or constructable behavior is required, with a documented ESLint exception. Keep imports explicit and remove unused declarations; TypeScript checks unused locals and parameters. ESLint is configured; no dedicated formatter is installed.

## Testing Guidelines

No testing framework, `npm test` script, or coverage threshold is configured. Before submitting changes, run `npm run lint` and `npm run build`. For interface changes, verify interactions, narrow-screen layouts, and light/dark themes in the browser. If introducing automated tests, document the runner and command, and use descriptive filenames such as `App.test.tsx`.

## Commit & Pull Request Guidelines

Git history is unavailable in this checkout, so existing commit conventions cannot be confirmed. Use concise, imperative messages such as `Add responsive navigation`. Keep changes focused. Pull requests should explain the change, link relevant issues, record validation performed, and include screenshots for visible interface changes. Commit dependency lockfile updates alongside package changes; exclude generated `dist/` output and `node_modules/`.

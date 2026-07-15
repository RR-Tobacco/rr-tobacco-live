How to run this project

Prerequisites
- Node.js 18+ (LTS recommended)
- npm (bundled with Node) or yarn/pnpm

Install dependencies
```bash
npm install
```

Run in development
```bash
npm run dev
```
Open http://localhost:5173 in your browser (Vite default).

Build for production
```bash
npm run build
```

Preview production build
```bash
npm run preview
```

Other useful scripts
- `npm run lint` — run ESLint across the project
- `npm run typecheck` — run TypeScript type checks (`tsc --noEmit -p tsconfig.app.json`)

Environment variables
- Create a `.env` or `.env.local` file at project root with the following keys:
```
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```
The app will throw an error at startup if these are missing (see `src/lib/supabase.ts`).

Notes
- This project uses Vite + React + TypeScript. Defaults are defined in `package.json` scripts.
- If you prefer `yarn` or `pnpm`, replace `npm` commands accordingly.

Troubleshooting
- If the dev server fails, check Node version and installed deps: `node -v && npm -v`.
- For lint/type errors, run the corresponding scripts and fix reported issues.

Files of interest
- `src/main.tsx` — app entry
- `src/lib/supabase.ts` — Supabase client and required env vars
- `package.json` — available scripts

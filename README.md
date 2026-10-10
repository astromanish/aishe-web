# Aishe Web

Voice-first AI for Bharat — the landing page. SvelteKit + Svelte 5 runes.

## Stack

- **Framework:** SvelteKit 2, **UI:** Svelte 5 (runes)
- **Styling:** Tailwind CSS 4 via the Vite plugin
- **Adapter:** `@sveltejs/adapter-netlify` — deployed to Netlify
- **Runtime:** Node.js

> Note: this was originally built on `adapter-node` with a different component
> layout. If you are reading old notes that mention `adapter-node`,
> `better-sqlite3`, a waitlist DB, `lucide-svelte`, or components like
> `WaitlistLanding.svelte` / `ChatApp.svelte` — those are gone. See the tree
> below for what actually ships.

## Develop

```sh
npm install
npm run dev          # vite dev server
npm run build        # production build
npm run preview      # preview prod build
npm run check        # svelte-check
```

## Project structure

```
src/
  routes/
    +page.svelte            # landing
    +layout.svelte          # shell: nav + footer
    pricing/+page.svelte    # model pricing catalog
  lib/
    ThreeHero.svelte        # animated hero
    i18n.svelte.ts          # i18n state
    stores.svelte.ts        # global runes
    pricing.ts              # live OpenRouter pricing + ₹ conversion
  app.html
  app.css
```

## Deploy

`netlify deploy --prod`, or push to `main` if the Netlify Git integration is
enabled. The generated SSR bundle lands in `.netlify/` and is git-ignored.

## Notes

- `.svelte-kit`, `build`, `node_modules` and `.netlify` are git-ignored
  (`.netlify` was committed before the ignore rule was added, so its 24
  generated files are still tracked — see the tracker).

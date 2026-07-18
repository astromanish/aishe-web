# Aishe Web

Voice-first AI for Bharat. SvelteKit landing page, waitlist, and pricing — written in Svelte 5 with runes.

## Stack

- **Framework:** SvelteKit 2 (adapter-node) + Svelte 5 (runes)
- **Styling:** Tailwind CSS 4 via Vite plugin
- **Icons:** lucide-svelte
- **DB:** better-sqlite3 (waitlist)
- **Runtime:** Node.js

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
    +page.svelte              # landing
    WaitlistLanding.svelte    # waitlist flow
    ChatApp.svelte            # in-browser voice chat
    ComparisonTable.svelte    # vs competitors
    SkillsShowcase.svelte
    Navbar.svelte
    Footer.svelte
    ...
  lib/
    voice.svelte.ts           # Web Speech API wrapper
    chat.svelte.ts            # chat state
    i18n.svelte.ts            # i18n state
    stores.svelte.ts          # global runes
    utils.ts
  app.html
  app.d.ts
static/                       # static assets
```

## Notes

- Adapter is `adapter-node` (not adapter-auto) for direct Node deploy
- `.svelte-kit`, `build`, `node_modules` are git-ignored
- `waitlist.db` is local-only, never committed

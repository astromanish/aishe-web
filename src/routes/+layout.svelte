<script lang="ts">
  import { app } from '$lib/stores.svelte';
  import { t } from '$lib/i18n.svelte';
  import '../app.css';

  // Ensure <html> class stays in sync
  $effect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('dark', app.theme === 'dark');
    }
  });
</script>

<svelte:head>
  <title>aishe — voice-first CLI for Bharat</title>
  <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><circle cx='16' cy='16' r='14' fill='%237C3AED'/><text x='16' y='21' text-anchor='middle' font-size='14' font-family='serif' font-weight='600' fill='white'>a</text></svg>" />
</svelte:head>

<div class="min-h-screen w-full" style="background-color: var(--color-paper);">
  <slot />
</div>
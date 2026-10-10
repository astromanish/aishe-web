<script lang="ts">
  import { onMount } from 'svelte';
  import ThreeHero from '$lib/ThreeHero.svelte';
  import { t } from '$lib/i18n.svelte';
  import { app, type Lang } from '$lib/stores.svelte';

  const icons = {
    bolt: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z',
    mic: 'M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z M19 10v2a7 7 0 0 1-14 0v-2 M12 19v3',
    brain: 'M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z',
    trending: 'M16 7h6v6 M22 7l-10 10-5-5L1 19',
    shield: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
    rupee: 'M6 3h12 M6 8h12 M6 13l8.5 8 M6 13h3a5 5 0 0 0 0-10',
    globe: 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z M2 12h20 M12 2a15 15 0 0 1 0 20 M12 2a15 15 0 0 0 0 20',
    micSkill: 'M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z M19 10v2a7 7 0 0 1-14 0v-2 M12 19v3',
    calc: 'M4 2h16a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z M8 6h8 M8 10h2 M14 10h2 M8 14h2 M14 14h2 M8 18h2 M14 18h2',
    clock: 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z M12 6v6l4 2',
    search: 'M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14z M21 21l-4.3-4.3',
    plus: 'M12 5v14 M5 12h14',
    stats: 'M3 3v18h18 M7 16l4-4 4 4 5-7',
    split: 'M6 3v6a4 4 0 0 0 4 4h4a4 4 0 0 1 4 4v4 M6 9H4 M18 9h2 M10 7l-4 2 4 2 M14 17l4 2-4 2',
    file: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M8 13h8 M8 17h6',
    server: 'M2 8h20v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2z M2 8l3-5h14l3 5 M6 13h2 M6 15h4',
    cpu: 'M9 2v2 M15 2v2 M9 20v2 M15 20v2 M2 9h2 M2 15h2 M20 9h2 M20 15h2 M4 4h16v16H4z M8 8h8v8H8z',
    wave: 'M2 12c2-3 4-3 6 0s4 3 6 0 4-3 6 0 M2 18c2-3 4-3 6 0s4 3 6 0 4-3 6 0',
    speaker: 'M11 5L6 9H2v6h4l5 4z M15.5 8.5a5 5 0 0 1 0 7 M18 5a9 9 0 0 1 0 14',
    terminal: 'M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z M6 9l3 3-3 3 M13 15h5',
    copy: 'M8 8h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2z M4 4h12v2 M4 4v10a2 2 0 0 0 2 2h2',
  };

  const features = $derived([
    { icon: icons.bolt, title: t('feat1Title', app.lang), desc: t('feat1Desc', app.lang) },
    { icon: icons.mic, title: t('feat2Title', app.lang), desc: t('feat2Desc', app.lang) },
    { icon: icons.brain, title: t('feat3Title', app.lang), desc: t('feat3Desc', app.lang) },
    { icon: icons.split, title: t('feat4Title', app.lang), desc: t('feat4Desc', app.lang) },
    { icon: icons.shield, title: t('feat5Title', app.lang), desc: t('feat5Desc', app.lang) },
    { icon: icons.search, title: t('feat6Title', app.lang), desc: t('feat6Desc', app.lang) },
  ]);

  const tools = $derived([
    { icon: icons.calc, title: t('toolCalc', app.lang), desc: t('toolCalcDesc', app.lang) },
    { icon: icons.clock, title: t('toolTime', app.lang), desc: t('toolTimeDesc', app.lang) },
    { icon: icons.search, title: t('toolMemSearch', app.lang), desc: t('toolMemSearchDesc', app.lang) },
    { icon: icons.plus, title: t('toolMemAdd', app.lang), desc: t('toolMemAddDesc', app.lang) },
    { icon: icons.stats, title: t('toolWord', app.lang), desc: t('toolWordDesc', app.lang) },
    { icon: icons.globe, title: t('toolWeb', app.lang), desc: t('toolWebDesc', app.lang) },
    { icon: icons.file, title: t('toolExtract', app.lang), desc: t('toolExtractDesc', app.lang) },
    { icon: icons.terminal, title: t('toolCmd', app.lang), desc: t('toolCmdDesc', app.lang) },
    { icon: icons.split, title: t('toolSubagent', app.lang), desc: t('toolSubagentDesc', app.lang) },
  ]);

  const surfaces = $derived([
    { icon: icons.terminal, name: 'CLI' },
    { icon: icons.cpu, name: 'Desktop' },
    { icon: icons.globe, name: 'Telegram' },
  ]);

  const archServices = $derived([
    { icon: icons.cpu, name: t('arch1Name', app.lang), port: t('arch1Port', app.lang), desc: t('arch1Desc', app.lang) },
    { icon: icons.server, name: t('arch2Name', app.lang), port: t('arch2Port', app.lang), desc: t('arch2Desc', app.lang) },
    { icon: icons.trending, name: t('arch3Name', app.lang), port: t('arch3Port', app.lang), desc: t('arch3Desc', app.lang) },
    { icon: icons.wave, name: t('arch4Name', app.lang), port: t('arch4Port', app.lang), desc: t('arch4Desc', app.lang) },
  ]);

  const commands = [
    { cmd: 'aishe' },
    { cmd: 'aishe "What is 15 * 4?"' },
    { cmd: 'aishe desktop' },
    { cmd: 'aishe telegram start' },
    { cmd: 'aishe memory add "User prefers Hindi"' },
    { cmd: 'aishe memory search "Hindi"' },
    { cmd: 'aishe memory status' },
    { cmd: 'aishe search "aishe"' },
    { cmd: 'aishe config set provider openrouter' },
    { cmd: 'aishe gateway status' },
    { cmd: 'aishe doctor' },
    { cmd: 'aishe status' },
  ];

  let activeSkill = $state(0);
  let scrolled = $state(false);
  let mobileMenuOpen = $state(false);
  let langMenuOpen = $state(false);
  let copied = $state(false);

  const langs: { code: Lang; label: string }[] = [
    { code: 'en', label: 'EN' },
    { code: 'hi', label: 'हि' },
    { code: 'bho', label: 'भो' },
  ];

  function setLang(code: Lang) {
    app.lang = code;
    localStorage.setItem('aishe_lang', code);
    langMenuOpen = false;
  }

  function copyInstall() {
    navigator.clipboard.writeText(t('installCmd', app.lang));
    copied = true;
    setTimeout(() => copied = false, 2000);
  }

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        }
      },
      { threshold: 0.08 }
    );
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

    const onScroll = () => { scrolled = window.scrollY > 40; };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { observer.disconnect(); window.removeEventListener('scroll', onScroll); };
  });
</script>

<!-- ═══ NAV ═══ -->
<nav class="fixed top-0 inset-x-0 z-50 transition-all duration-200"
  style="background:{scrolled ? 'var(--color-nav-bg)' : 'transparent'};backdrop-filter:{scrolled ? 'blur(8px)' : 'none'};border-bottom:{scrolled ? '1px solid var(--color-line)' : '1px solid transparent'};">
  <div class="max-w-[1080px] mx-auto px-6 h-14 flex items-center justify-between">
    <a href="#hero" class="flex items-center gap-2 group">
      <div class="w-7 h-7 rounded-[8px] flex items-center justify-center serif font-semibold text-sm transition-transform group-hover:scale-105"
        style="background: var(--color-ink); color: var(--color-paper);">a</div>
      <span class="serif font-medium text-sm tracking-tight" style="color: var(--color-ink);">aishe</span>
    </a>

    <div class="hidden md:flex items-center gap-7">
      <a href="#install" class="text-[0.8125rem] font-medium transition-colors hover:opacity-60" style="color: var(--color-ink-2);">{t('navInstall', app.lang)}</a>
      <a href="#features" class="text-[0.8125rem] font-medium transition-colors hover:opacity-60" style="color: var(--color-ink-2);">{t('navFeatures', app.lang)}</a>
      <a href="#skills" class="text-[0.8125rem] font-medium transition-colors hover:opacity-60" style="color: var(--color-ink-2);">{t('navTools', app.lang)}</a>
      <a href="/pricing" class="text-[0.8125rem] font-medium transition-colors hover:opacity-60" style="color: var(--color-ink-2);">Pricing</a>
      <a href="https://github.com/astromanish/aishe-cli" target="_blank" class="flex items-center gap-1.5 text-[0.8125rem] font-medium transition-colors hover:opacity-60" style="color: var(--color-ink-2);">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
        GitHub
      </a>

      <div class="relative">
        <button class="flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium transition-colors hover:bg-black/5"
          style="color: var(--color-ink-2);"
          onclick={() => langMenuOpen = !langMenuOpen}
          onblur={() => setTimeout(() => langMenuOpen = false, 200)}>
          <svg width="13" height="13" viewBox="0 0 24 24" class="ic"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20"/></svg>
          {langs.find(l => l.code === app.lang)?.label}
        </button>
        {#if langMenuOpen}
          <div class="absolute right-0 mt-1.5 w-28 rounded-lg border py-1"
            style="background: var(--color-surface); border-color: var(--color-line); box-shadow: 0 4px 16px rgba(0,0,0,0.08);">
            {#each langs as l}
              <button class="w-full px-3 py-1.5 text-xs text-left transition-colors hover:bg-black/5"
                style="color:{l.code === app.lang ? 'var(--color-accent)' : 'var(--color-ink-2)'};"
                onclick={() => setLang(l.code)}>
                {l.label} — {l.code === 'en' ? 'English' : l.code === 'hi' ? 'हिंदी' : 'भोजपुरी'}
              </button>
            {/each}
          </div>
        {/if}
      </div>

      <a href="https://github.com/astromanish/aishe-cli" target="_blank"
        class="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-opacity hover:opacity-90"
        style="background: var(--color-ink); color: var(--color-paper);">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
        {t('ctaGithub', app.lang)}
      </a>
    </div>

    <button class="md:hidden p-1.5 rounded-md transition-colors hover:bg-black/5"
      style="color: var(--color-ink);"
      onclick={() => mobileMenuOpen = !mobileMenuOpen}
      aria-label="Menu">
      {#if mobileMenuOpen}
        <svg width="18" height="18" viewBox="0 0 24 24" class="ic"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      {:else}
        <svg width="18" height="18" viewBox="0 0 24 24" class="ic"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
      {/if}
    </button>
  </div>

  {#if mobileMenuOpen}
    <div class="md:hidden border-t px-6 py-4 space-y-1 fade"
      style="background: var(--color-nav-bg); border-color: var(--color-line);">
      <a href="#install" class="block text-sm py-2" style="color: var(--color-ink-2);" onclick={() => mobileMenuOpen = false}>{t('navInstall', app.lang)}</a>
      <a href="#features" class="block text-sm py-2" style="color: var(--color-ink-2);" onclick={() => mobileMenuOpen = false}>{t('navFeatures', app.lang)}</a>
      <a href="#skills" class="block text-sm py-2" style="color: var(--color-ink-2);" onclick={() => mobileMenuOpen = false}>{t('navTools', app.lang)}</a>
      <a href="/pricing" class="block text-sm py-2" style="color: var(--color-ink-2);" onclick={() => mobileMenuOpen = false}>Pricing</a>
      <a href="https://github.com/astromanish/aishe-cli" target="_blank" class="flex items-center gap-1.5 text-sm py-2" style="color: var(--color-ink-2);" onclick={() => mobileMenuOpen = false}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
        GitHub
      </a>
      <div class="flex gap-1.5 pt-2">
        {#each langs as l}
          <button class="px-2.5 py-1 rounded-md text-xs font-medium transition-all"
            style="background:{l.code === app.lang ? 'var(--color-ink)' : 'transparent'};color:{l.code === app.lang ? 'var(--color-paper)' : 'var(--color-ink-2)'};border:1px solid var(--color-line-2);"
            onclick={() => setLang(l.code)}>{l.label}</button>
        {/each}
      </div>
      <a href="https://github.com/astromanish/aishe-cli" target="_blank"
        class="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold mt-2"
        style="background: var(--color-ink); color: var(--color-paper);"
        onclick={() => mobileMenuOpen = false}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
        {t('ctaGithub', app.lang)}
      </a>
    </div>
  {/if}
</nav>

<!-- ═══ HERO ═══ -->
<section id="hero" class="relative w-full min-h-screen flex items-center overflow-hidden">
  <div class="absolute inset-0 z-0"><ThreeHero /></div>
  <div class="absolute inset-0 z-1" style="background: linear-gradient(100deg, var(--color-hero-overlay) 0%, var(--color-hero-overlay-mid) 45%, transparent 75%);"></div>

  <div class="relative z-10 w-full max-w-[1080px] mx-auto px-6 pt-20 pb-16">
    <div class="max-w-[560px]">
      <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[0.6875rem] font-medium mb-7 fade-up"
        style="background: var(--color-accent-soft); color: var(--color-accent);">
        <span class="w-1 h-1 rounded-full" style="background: var(--color-accent);"></span>
        {t('heroBadge', app.lang)}
      </div>

      <h1 class="text-[clamp(2rem,5.5vw,3.75rem)] font-semibold leading-[1.08] tracking-tight mb-5 fade-up serif"
        style="animation-delay:0.08s;animation-fill-mode:both;color: var(--color-ink);">
        {t('heroTitle', app.lang)}
        <span class="block" style="color: var(--color-accent);">{t('heroTitleAccent', app.lang)}</span>
      </h1>

      <p class="text-[0.9375rem] max-w-[28rem] leading-relaxed mb-2 fade-up"
        style="animation-delay:0.15s;animation-fill-mode:both;color: var(--color-ink-2);">
        {t('heroSubtitle', app.lang)}
      </p>
      <p class="text-[0.8125rem] font-medium mb-8 fade-up mono"
        style="animation-delay:0.2s;animation-fill-mode:both;color: var(--color-ink-3);">
        {t('heroSubMeta', app.lang)}
      </p>

      <div class="flex flex-wrap items-center gap-2.5 fade-up" style="animation-delay:0.25s;animation-fill-mode:both;">
        <a href="https://github.com/astromanish/aishe-cli" target="_blank"
          class="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-opacity hover:opacity-90"
          style="background: var(--color-ink); color: var(--color-paper);">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
          {t('ctaGithub', app.lang)}
          <svg width="13" height="13" viewBox="0 0 24 24" class="ic"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
        </a>
        <a href="#features"
          class="px-5 py-2.5 rounded-lg text-sm font-medium transition-colors hover:bg-black/5"
          style="color: var(--color-ink-2); border: 1px solid var(--color-line-2);">
          {t('ctaLearn', app.lang)}
        </a>
      </div>
    </div>
  </div>

  <div class="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 fade" style="animation-delay:0.8s;animation-fill-mode:both;">
    <span class="text-[0.625rem] font-medium tracking-[0.1em] uppercase mono" style="color: var(--color-ink-3);">{t('scrollDown', app.lang)}</span>
    <div class="w-[14px] h-[22px] rounded-full border flex justify-center" style="border-color: var(--color-line-2);">
      <div class="w-[2px] h-[5px] rounded-full mt-1.5" style="background: var(--color-ink-3); animation: scroll-dot 1.8s ease-in-out infinite;"></div>
    </div>
  </div>
</section>

<!-- ═══ INSTALL ═══ -->
<section id="install" class="w-full px-6 py-20 md:py-28" style="background: var(--color-surface);">
  <div class="max-w-[1080px] mx-auto">
    <div class="mb-10 reveal">
      <span class="text-[0.625rem] font-semibold tracking-[0.12em] uppercase mono" style="color: var(--color-accent);">{t('installLabel', app.lang)}</span>
      <h2 class="text-[clamp(1.5rem,3.5vw,2.25rem)] font-semibold mt-3 mb-2 serif" style="color: var(--color-ink);">{t('installTitle', app.lang)}</h2>
      <p class="text-[0.875rem] max-w-[28rem]" style="color: var(--color-ink-2);">{t('installSub', app.lang)}</p>
    </div>

    <div class="reveal rounded-xl border overflow-hidden" style="border-color: var(--color-line); background: var(--color-paper);">
      <div class="flex items-center justify-between px-4 py-3 border-b" style="border-color: var(--color-line);">
        <div class="flex items-center gap-2">
          <div class="w-2.5 h-2.5 rounded-full" style="background: #ff5f57;"></div>
          <div class="w-2.5 h-2.5 rounded-full" style="background: #febc2e;"></div>
          <div class="w-2.5 h-2.5 rounded-full" style="background: #28c840;"></div>
        </div>
        <button onclick={copyInstall} class="flex items-center gap-1.5 text-[0.6875rem] font-medium px-2.5 py-1 rounded-md transition-colors hover:bg-black/5"
          style="color: var(--color-ink-3);">
          {#if copied}
            <svg width="12" height="12" viewBox="0 0 24 24" class="ic"><path d="M20 6L9 17l-5-5"/></svg>
            <span style="color: var(--color-accent);">{t('installCopied', app.lang)}</span>
          {:else}
            <svg width="12" height="12" viewBox="0 0 24 24" class="ic"><rect x="8" y="8" width="12" height="12" rx="2"/><path d="M4 4h12v2 M4 4v10a2 2 0 0 0 2 2h2"/></svg>
            {t('ctaInstall', app.lang)}
          {/if}
        </button>
      </div>
      <div class="px-5 py-4">
        <code class="text-[0.8125rem] mono block overflow-x-auto" style="color: var(--color-ink);">
          <span style="color: var(--color-ink-3);">$</span> {t('installCmd', app.lang)}
        </code>
      </div>
    </div>
  </div>
</section>

<!-- ═══ FEATURES ═══ -->
<section id="features" class="w-full px-6 py-20 md:py-28" style="background: var(--color-paper);">
  <div class="max-w-[1080px] mx-auto">
    <div class="mb-14 reveal">
      <span class="text-[0.625rem] font-semibold tracking-[0.12em] uppercase mono" style="color: var(--color-accent);">{t('featSectionLabel', app.lang)}</span>
      <h2 class="text-[clamp(1.5rem,3.5vw,2.25rem)] font-semibold mt-3 mb-2 serif" style="color: var(--color-ink);">{t('featSectionTitle', app.lang)}</h2>
      <p class="text-[0.875rem] max-w-[24rem]" style="color: var(--color-ink-2);">{t('featSectionSub', app.lang)}</p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px" style="background: var(--color-line);">
      {#each features as feat, i}
        <div class="p-7 reveal" style="background:var(--color-paper);transition-delay:{i * 0.06}s;">
          <div class="w-9 h-9 rounded-lg flex items-center justify-center mb-4" style="background: var(--color-accent-soft);">
            <svg width="18" height="18" viewBox="0 0 24 24" class="ic" style="color: var(--color-accent);"><path d={feat.icon}/></svg>
          </div>
          <h3 class="text-[0.875rem] font-semibold mb-1.5" style="color: var(--color-ink);">{feat.title}</h3>
          <p class="text-[0.8125rem] leading-relaxed" style="color: var(--color-ink-2);">{feat.desc}</p>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- ═══ TOOLS ═══ -->
<section id="skills" class="w-full px-6 py-20 md:py-28" style="background: var(--color-surface);">
  <div class="max-w-[1080px] mx-auto">
    <div class="mb-12 reveal">
      <span class="text-[0.625rem] font-semibold tracking-[0.12em] uppercase mono" style="color: var(--color-accent);">{t('toolsLabel', app.lang)}</span>
      <h2 class="text-[clamp(1.5rem,3.5vw,2.25rem)] font-semibold mt-3 mb-2 serif" style="color: var(--color-ink);">{t('toolsTitle', app.lang)}</h2>
      <p class="text-[0.875rem] max-w-[28rem]" style="color: var(--color-ink-2);">{t('toolsSub', app.lang)}</p>
    </div>

    <div class="flex flex-wrap gap-1.5 mb-8 reveal">
      {#each tools as tool, i}
        <button
          class="flex items-center gap-2 px-3.5 py-2 rounded-lg text-[0.8125rem] font-medium transition-all"
          style="background:{i === activeSkill ? 'var(--color-ink)' : 'transparent'};color:{i === activeSkill ? 'var(--color-paper)' : 'var(--color-ink-2)'};border:1px solid {i === activeSkill ? 'var(--color-ink)' : 'var(--color-line-2)'};"
          onclick={() => activeSkill = i}>
          <svg width="15" height="15" viewBox="0 0 24 24" class="ic"><path d={tool.icon}/></svg>
          <span class="hidden sm:inline">{tool.title}</span>
        </button>
      {/each}
    </div>

    <div class="rounded-xl border p-7 md:p-8 reveal" style="background:var(--color-paper);border-color:var(--color-line);">
      <div class="flex items-start gap-4">
        <div class="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style="background: var(--color-accent-soft);">
          <svg width="20" height="20" viewBox="0 0 24 24" class="ic" style="color: var(--color-accent);"><path d={tools[activeSkill].icon}/></svg>
        </div>
        <div>
          <h3 class="text-[0.9375rem] font-semibold mb-1.5" style="color: var(--color-ink);">{tools[activeSkill].title}</h3>
          <p class="text-[0.875rem] leading-relaxed max-w-[520px]" style="color: var(--color-ink-2);">{tools[activeSkill].desc}</p>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ═══ ARCHITECTURE ═══ -->
<section id="arch" class="w-full px-6 py-20 md:py-28" style="background: var(--color-paper);">
  <div class="max-w-[1080px] mx-auto">
    <div class="mb-12 reveal">
      <span class="text-[0.625rem] font-semibold tracking-[0.12em] uppercase mono" style="color: var(--color-accent);">{t('archLabel', app.lang)}</span>
      <h2 class="text-[clamp(1.5rem,3.5vw,2.25rem)] font-semibold mt-3 mb-2 serif" style="color: var(--color-ink);">{t('archTitle', app.lang)}</h2>
      <p class="text-[0.875rem] max-w-[28rem]" style="color: var(--color-ink-2);">{t('archSub', app.lang)}</p>
    </div>

    <!-- Flow diagram: CLI → DeepAgent → Ollama, with STT/TTS flanking -->
    <div class="reveal">
      <!-- Desktop layout -->
      <div class="hidden md:block">
        <!-- Surfaces → agent. Three ways in, one agent behind them. -->
        <div class="flex items-center justify-center gap-3 flex-wrap">
          {#each surfaces as sfc}
            <div class="flex flex-col items-center text-center px-5 py-4 rounded-xl border" style="background: var(--color-surface); border-color: var(--color-line); min-width: 130px;">
              <div class="w-9 h-9 rounded-lg flex items-center justify-center mb-2" style="background: var(--color-accent-soft);">
                <svg width="18" height="18" viewBox="0 0 24 24" class="ic" style="color: var(--color-accent);"><path d={sfc.icon}/></svg>
              </div>
              <h3 class="text-[0.8125rem] font-semibold" style="color: var(--color-ink);">{sfc.name}</h3>
            </div>
          {/each}

          <svg width="28" height="24" viewBox="0 0 40 24" class="opacity-30"><path d="M2 12h32M28 6l8 6-8 6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="color: var(--color-ink-2);"/></svg>

          <!-- DeepAgent (hub) -->
          <div class="flex flex-col items-center text-center px-6 py-4 rounded-xl border" style="background: var(--color-surface); border-color: var(--color-ink); min-width: 150px; box-shadow: 0 2px 12px rgba(0,0,0,0.04);">
            <div class="w-10 h-10 rounded-lg flex items-center justify-center mb-2.5" style="background: var(--color-accent-soft);">
              <svg width="20" height="20" viewBox="0 0 24 24" class="ic" style="color: var(--color-accent);"><path d={icons.cpu}/></svg>
            </div>
            <h3 class="text-[0.8125rem] font-semibold" style="color: var(--color-ink);">{t('arch1Name', app.lang)}</h3>
            <p class="text-[0.6875rem] mono mt-0.5" style="color: var(--color-ink-3);">{t('arch1Port', app.lang)}</p>
          </div>
        </div>

        <p class="text-center text-[0.75rem] mt-4" style="color: var(--color-ink-3);">
          {t('archHubNote', app.lang)}
        </p>

        <!-- Backing services -->
        <div class="hidden md:flex items-center justify-center gap-3 flex-wrap">
          {#each archServices as svc, i}
            <div class="flex flex-col items-center text-center px-5 py-4 rounded-xl border" style="background: var(--color-surface); border-color: {i === 0 ? 'var(--color-ink)' : 'var(--color-line)'}; min-width: 150px; {i === 0 ? 'box-shadow: 0 2px 12px rgba(0,0,0,0.04);' : ''}">
              <div class="w-10 h-10 rounded-lg flex items-center justify-center mb-2.5" style="background: var(--color-accent-soft);">
                <svg width="20" height="20" viewBox="0 0 24 24" class="ic" style="color: var(--color-accent);"><path d={svc.icon}/></svg>
              </div>
              <h3 class="text-[0.8125rem] font-semibold" style="color: var(--color-ink);">{svc.name}</h3>
              <p class="text-[0.6875rem] mono mt-0.5" style="color: var(--color-ink-3);">{svc.port}</p>
              <p class="text-[0.6875rem] mt-1 leading-snug max-w-[150px]" style="color: var(--color-ink-3);">{svc.desc}</p>
            </div>
            {#if i < archServices.length - 1}
              <svg width="28" height="24" viewBox="0 0 40 24" class="opacity-30"><path d="M2 12h32M28 6l8 6-8 6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="color: var(--color-ink-2);"/></svg>
            {/if}
          {/each}
        </div>
      </div>

      <!-- Mobile layout: stacked with vertical arrows -->
      <div class="md:hidden flex flex-col items-center gap-3">
        {#each archServices as svc, i}
          <div class="flex flex-col items-center text-center px-6 py-4 rounded-xl border w-full max-w-[200px]" style="background: var(--color-surface); border-color: {i === 1 ? 'var(--color-ink)' : 'var(--color-line)'};">
            <div class="w-9 h-9 rounded-lg flex items-center justify-center mb-2" style="background: var(--color-accent-soft);">
              <svg width="18" height="18" viewBox="0 0 24 24" class="ic" style="color: var(--color-accent);"><path d={svc.icon}/></svg>
            </div>
            <h3 class="text-[0.8125rem] font-semibold" style="color: var(--color-ink);">{svc.name}</h3>
            <p class="text-[0.625rem] mt-0.5" style="color: var(--color-ink-3);">{svc.name} · {svc.port}</p>
          </div>
          {#if i < archServices.length - 1}
            <svg width="24" height="20" viewBox="0 0 24 20" class="opacity-30"><path d="M12 2v14M6 10l6 6 6-6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="color: var(--color-ink-2);"/></svg>
          {/if}
        {/each}
      </div>
    </div>
  </div>
</section>

<!-- ═══ COMMANDS ═══ -->
<section id="commands" class="w-full px-6 py-20 md:py-28" style="background: var(--color-surface);">
  <div class="max-w-[1080px] mx-auto">
    <div class="mb-10 reveal">
      <span class="text-[0.625rem] font-semibold tracking-[0.12em] uppercase mono" style="color: var(--color-accent);">{t('cmdLabel', app.lang)}</span>
      <h2 class="text-[clamp(1.5rem,3.5vw,2.25rem)] font-semibold mt-3 mb-2 serif" style="color: var(--color-ink);">{t('cmdTitle', app.lang)}</h2>
      <p class="text-[0.875rem] max-w-[24rem]" style="color: var(--color-ink-2);">{t('cmdSub', app.lang)}</p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-1 reveal">
      {#each commands as c}
        <div class="flex items-center gap-2 py-1.5">
          <span class="text-[0.6875rem] mono" style="color: var(--color-ink-3);">$</span>
          <code class="text-[0.75rem] mono" style="color: var(--color-ink);">{c.cmd}</code>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- ═══ CTA ═══ -->
<section class="w-full px-6 py-20 md:py-28" style="background: var(--color-cta-bg);">
  <div class="max-w-[1080px] mx-auto">
    <div class="max-w-[480px] reveal">
      <h2 class="text-[clamp(1.5rem,3.5vw,2.25rem)] font-semibold mb-3 serif" style="color: var(--color-cta-text);">{t('ctaTitle', app.lang)}</h2>
      <p class="text-[0.875rem] mb-7" style="color: var(--color-ink-3);">{t('ctaSub', app.lang)}</p>
      <a href="https://github.com/astromanish/aishe-cli" target="_blank"
        class="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-opacity hover:opacity-90"
        style="background: var(--color-cta-btn-bg); color: var(--color-cta-btn-text);">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
        {t('ctaGithub', app.lang)}
        <svg width="13" height="13" viewBox="0 0 24 24" class="ic"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
      </a>
    </div>
  </div>
</section>

<!-- ═══ FOOTER ═══ -->
<footer class="w-full px-6 py-8 flex items-center justify-between" style="background: var(--color-footer-bg);">
  <p class="text-[0.6875rem] mono" style="color: var(--color-footer-text);">{t('footerCopyright', app.lang)}</p>
  <div class="flex items-center gap-3">
    <a href="https://github.com/astromanish/aishe-cli" target="_blank" aria-label="GitHub" class="transition-colors hover:opacity-80" style="color: var(--color-footer-text);">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
    </a>
    <a href="mailto:astromanishsingh@gmail.com" aria-label="Email" class="transition-colors hover:opacity-80" style="color: var(--color-footer-text);">
      <svg width="15" height="15" viewBox="0 0 24 24" class="ic"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
    </a>
  </div>
</footer>
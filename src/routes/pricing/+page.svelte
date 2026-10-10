<script lang="ts">
  import { COMPANIES, FX } from '$lib/pricing';

  const tierLabels: Record<string, { label: string; cls: string }> = {
    high: { label: 'High', cls: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300' },
    mid: { label: 'Mid', cls: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300' },
    low: { label: 'Low', cls: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300' },
  };

  const tierOrder = ['high', 'mid', 'low'];

  function fmtUsd(v: number | null): string {
    if (v === null) return '—';
    return '$' + v.toFixed(3);
  }
  function fmtInr(v: number | null): string {
    if (v === null) return '—';
    return '₹' + Math.round(v * FX);
  }
</script>

<svelte:head>
  <title>Pricing — aishe model catalog</title>
</svelte:head>

<div class="w-full border-b" style="background: var(--color-paper); border-color: var(--color-line);">
  <div class="max-w-[1080px] mx-auto px-6 h-14 flex items-center justify-between">
    <a href="/" class="flex items-center gap-2">
      <div class="w-7 h-7 rounded-[8px] flex items-center justify-center serif font-semibold text-sm" style="background: var(--color-ink); color: var(--color-paper);">a</div>
      <span class="serif font-medium text-sm tracking-tight" style="color: var(--color-ink);">aishe</span>
    </a>
    <div class="flex items-center gap-6">
      <a href="/" class="text-[0.8125rem] font-medium transition-colors hover:opacity-60" style="color: var(--color-ink-2);">Home</a>
      <a href="/pricing" class="text-[0.8125rem] font-medium transition-colors hover:opacity-60" style="color: var(--color-ink-2);">Pricing</a>
    </div>
  </div>
</div>

<header class="w-full px-6 pt-14 pb-10" style="background: var(--color-paper);">
  <div class="max-w-[1080px] mx-auto">
      <span class="text-[0.625rem] font-semibold tracking-[0.12em] uppercase mono" style="color: var(--color-accent);">Model pricing catalog</span>
      <h1 class="text-[clamp(1.75rem,4.5vw,3rem)] font-semibold mt-3 mb-3 serif leading-tight" style="color: var(--color-ink);">Agentic model pricing</h1>
      <p class="text-[0.875rem] max-w-[34rem] leading-relaxed" style="color: var(--color-ink-2);">
        Live OpenRouter list prices per 1M tokens for models that support tool calling. Grouped by company,
      tagged High / Mid / Low by output price, and shown in USD and ₹ (1 USD ≈ ₹{FX}).
    </p>
  </div>
</header>

<main class="w-full px-6 pb-24" style="background: var(--color-paper);">
  <div class="max-w-[1080px] mx-auto">
    <!-- Tier legend -->
    <div class="flex flex-wrap items-center gap-2 mb-6">
      {#each tierOrder as t}
        <span class="px-2.5 py-1 rounded-full text-[0.6875rem] font-semibold {tierLabels[t].cls}">{tierLabels[t].label}</span>
      {/each}
      <span class="text-[0.6875rem] mono ml-auto" style="color: var(--color-ink-3);">High: output ≥ $8 &nbsp;·&nbsp; Mid: $2.5–8 &nbsp;·&nbsp; Low: &lt; $2.5</span>
    </div>

    <div class="rounded-xl border overflow-x-auto" style="border-color: var(--color-line); background: var(--color-surface);">
      <table class="w-full text-left text-[0.8125rem] mono min-w-[720px]">
        <thead>
          <tr style="border-bottom: 1px solid var(--color-line);">
            <th class="px-5 py-3 font-semibold text-[0.6875rem] uppercase tracking-wider" style="color: var(--color-ink-3);">Model</th>
            <th class="px-4 py-3 font-semibold text-[0.6875rem] uppercase tracking-wider text-right" style="color: var(--color-ink-3);">Cached ₹</th>
            <th class="px-4 py-3 font-semibold text-[0.6875rem] uppercase tracking-wider text-right" style="color: var(--color-ink-3);">Input ₹/M</th>
            <th class="px-4 py-3 font-semibold text-[0.6875rem] uppercase tracking-wider text-right hidden sm:table-cell" style="color: var(--color-ink-3);">Output ₹/M</th>
            <th class="px-4 py-3 font-semibold text-[0.6875rem] uppercase tracking-wider text-right hidden md:table-cell" style="color: var(--color-ink-3);">Output $</th>
            <th class="px-5 py-3 font-semibold text-[0.6875rem] uppercase tracking-wider" style="color: var(--color-ink-3);">Tier</th>
          </tr>
        </thead>
        <tbody>
          {#each COMPANIES as grp}
            <tr>
              <td colspan="6" class="px-5 py-2.5 font-semibold text-[0.75rem]" style="background: var(--color-paper); color: var(--color-ink); border-bottom: 1px solid var(--color-line);">{grp.name}</td>
            </tr>
            {#each tierOrder as t}
              {#if grp.models.filter(r => r.tier === t).length}
                <tr>
                  <td colspan="6" class="px-5 py-1.5 text-[0.625rem] font-semibold uppercase tracking-[0.08em]" style="color: var(--color-ink-3);">{tierLabels[t].label}</td>
                </tr>
                {#each grp.models.filter(r => r.tier === t) as m}
                  <tr style="border-top: 1px solid var(--color-line);">
                    <td class="px-5 py-2.5 font-semibold" style="color: var(--color-ink);">{m.m}</td>
                    <td class="px-4 py-2.5 text-right tabular-nums" style="color: var(--color-ink-2);">{fmtInr(m.c)}</td>
                    <td class="px-4 py-2.5 text-right tabular-nums" style="color: var(--color-ink-2);">{fmtInr(m.inp)}</td>
                    <td class="px-4 py-2.5 text-right tabular-nums hidden sm:table-cell" style="color: var(--color-ink-2);">{fmtInr(m.out)}</td>
                    <td class="px-4 py-2.5 text-right tabular-nums hidden md:table-cell" style="color: var(--color-ink-3);">{fmtUsd(m.out)}</td>
                    <td class="px-5 py-2.5"><span class="px-2 py-0.5 rounded-full text-[0.625rem] font-semibold {tierLabels[m.tier].cls}">{tierLabels[m.tier].label}</span></td>
                  </tr>
                {/each}
              {/if}
            {/each}
          {/each}
        </tbody>
      </table>
    </div>

    <p class="text-[0.6875rem] mt-4" style="color: var(--color-ink-3);">
      List price per 1M tokens (≈33k–66k short messages). Actual cost depends on token count, caching and the
      exact model id billed. Prices are indicative — verify against the provider before relying on them.
    </p>
  </div>
</main>
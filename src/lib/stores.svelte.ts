export type Lang = 'en' | 'hi' | 'bho';
export type Theme = 'light' | 'dark';

function getLocal(key: string, fallback: string = ''): string {
  if (typeof localStorage === 'undefined') return fallback;
  return localStorage.getItem(key) || fallback;
}

function getLocalBool(key: string, fallback: boolean = false): boolean {
  if (typeof localStorage === 'undefined') return fallback;
  const v = localStorage.getItem(key);
  if (v === null) return fallback;
  return v === 'true';
}

function detectInitialTheme(): Theme {
  if (typeof localStorage !== 'undefined') {
    const saved = localStorage.getItem('aishe_theme');
    if (saved === 'dark' || saved === 'light') return saved;
  }
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return 'light';
}

const initialTheme = detectInitialTheme();

export const app = $state({
  lang: getLocal('aishe_lang', 'en') as Lang,
  theme: initialTheme as Theme,
});

export function toggleTheme() {
  app.theme = app.theme === 'light' ? 'dark' : 'light';
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('aishe_theme', app.theme);
  }
  if (typeof document !== 'undefined') {
    document.documentElement.classList.toggle('dark', app.theme === 'dark');
  }
}

// Apply initial theme to <html> as early as possible
if (typeof document !== 'undefined') {
  document.documentElement.classList.toggle('dark', initialTheme === 'dark');
}
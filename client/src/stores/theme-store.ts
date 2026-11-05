import { create } from 'zustand';

type Theme = 'dark';

interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  theme: 'dark',
  setTheme: (theme) => {
    try {
      localStorage.setItem('dograh_theme', theme);
    } catch {
      // Ignore
    }
    set({ theme });
  },
}));

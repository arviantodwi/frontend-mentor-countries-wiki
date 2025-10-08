interface ThemeState {
  theme: 'dark' | 'light';
}

interface ThemeAction {
  toggleTheme: () => void;
}

export type ThemeStore = ThemeState & ThemeAction;

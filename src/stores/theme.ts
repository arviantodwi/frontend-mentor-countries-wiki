import { create } from 'zustand';

interface ThemeState {
  dark: boolean;
}

interface ThemeAction {
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState & ThemeAction>((set) => ({
  dark: false,
  toggleTheme: () => set((state) => ({ dark: !state.dark })),
}));

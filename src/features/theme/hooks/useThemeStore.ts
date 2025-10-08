import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { getNextTheme, type Theme } from '../utils/helper';
import type { StorageValue } from 'zustand/middleware';

interface ThemeStore {
  theme: Theme;
  toggleTheme(): void;
}

export type PersistedThemeStore = StorageValue<ThemeStore>

const themeStoreCreator = persist<ThemeStore>(
  (set, get) => ({
    theme: 'system',
    toggleTheme: () => set({ theme: getNextTheme(get().theme) }),
  }),
  {
    name: 'app-theme',
    storage: createJSONStorage(() => localStorage),
  },
);

export const useThemeStore = create(themeStoreCreator);

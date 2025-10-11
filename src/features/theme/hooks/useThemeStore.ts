import { create } from 'zustand';
import type { StorageValue } from 'zustand/middleware';
import { createJSONStorage, persist, subscribeWithSelector } from 'zustand/middleware';
import { getNextTheme, type Theme } from '../utils/helper';

interface ThemeStore {
  theme: Theme;
  toggleTheme(): void;
}

export type PersistedThemeStore = StorageValue<ThemeStore>;

const themeStoreCreator = persist(
  subscribeWithSelector<ThemeStore>((set) => ({
    theme: 'system',
    toggleTheme: () => set((state) => ({ theme: getNextTheme(state.theme) })),
  })),
  {
    name: 'app-theme',
    storage: createJSONStorage(() => localStorage),
  },
);

export const useThemeStore = create(themeStoreCreator);

useThemeStore.subscribe(
  (state) => state.theme,
  (newTheme, oldTheme) => {
    console.log(`Theme changed, ${oldTheme} → ${newTheme}`);

    const { classList } = document.documentElement;
    classList.remove(oldTheme);
    classList.add(newTheme);
  },
);

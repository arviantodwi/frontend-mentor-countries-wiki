import { act } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { useThemeStore, type PersistedThemeStore } from './useThemeStore';

describe('Theme store', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('Persistency', () => {
    it('should initialize with system theme if no theme is in local storage', async () => {
      // Ensure local storage is empty for the 'app-theme'.
      const persistedAppTheme = JSON.parse(localStorage.getItem('app-theme') || 'null');
      expect(localStorage.getItem).toHaveBeenCalledWith('app-theme');
      expect(persistedAppTheme).toBeNull();

      // The theme should default to 'system' when no persisted state is found.
      expect(useThemeStore.getState().theme).toBe('system');
    });

    it('should prioritize theme from local storage over system preference', async () => {
      // Set a theme in local storage.
      const persistedAppTheme = JSON.stringify({ state: { theme: 'light' }, version: 0 });
      localStorage.setItem('app-theme', persistedAppTheme);
      expect(localStorage.setItem).toHaveBeenCalledWith('app-theme', persistedAppTheme);

      // Manually trigger the rehydration process to load the state from local storage.
      // In a real app, this happens automatically.
      await act(() => useThemeStore.persist.rehydrate());

      // The theme should be 'light' as loaded from local storage.
      expect(useThemeStore.getState().theme).toBe('light');
    });

    it('should persisting theme state update in local storage', () => {
      // Set the initial theme state to 'dark'.
      act(() => {
        useThemeStore.setState({ theme: 'dark' });
      });

      // The new theme ('dark') should be saved to local storage.
      const persistedAppTheme: PersistedThemeStore | null = JSON.parse(
        localStorage.getItem('app-theme') || 'null',
      );
      expect(localStorage.getItem).toHaveBeenCalledWith('app-theme');
      expect(persistedAppTheme).not.toBeNull();
      expect(persistedAppTheme!.state.theme).toBe('dark');
    });
  });

  describe('Actions', () => {
    it('should toggle theme cycle correctly (system -> dark -> light -> system)', () => {
      // Set the initial theme state.
      useThemeStore.setState(useThemeStore.getInitialState());
      const { toggleTheme } = useThemeStore.getState();

      // The theme should cycle from 'system' to 'dark'.
      toggleTheme();
      expect(useThemeStore.getState().theme).toBe('dark');

      // The theme should cycle from 'dark' to 'light'.
      toggleTheme();
      expect(useThemeStore.getState().theme).toBe('light');

      // The theme should cycle from 'light' to 'system'.
      toggleTheme();
      expect(useThemeStore.getState().theme).toBe('system');
    });
  });

  describe('Subscribe', () => {
    it('should add correct class to html when theme state updated', async () => {
      useThemeStore.setState(useThemeStore.getInitialState());
      const { toggleTheme } = useThemeStore.getState();

      // The HTML should have 'dark' class.
      toggleTheme();
      expect(document.documentElement).toHaveClass('dark');

      // The HTML should have 'light' class.
      toggleTheme();
      expect(document.documentElement).toHaveClass('light');

      // The HTML should have 'system' class.
      toggleTheme();
      expect(document.documentElement).toHaveClass('system');
    });
  });
});

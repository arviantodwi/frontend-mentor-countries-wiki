import { act } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useThemeStore, type PersistedThemeStore } from './useThemeStore';

describe('Theme store', () => {
  it('should initialize with system theme if no theme is in localStorage', async () => {
    // Ensure localStorage is empty for the 'app-theme'.
    const persistedAppTheme = JSON.parse(localStorage.getItem('app-theme') || 'null');
    expect(localStorage.getItem).toHaveBeenCalledWith('app-theme');
    expect(persistedAppTheme).toBeNull();

    // The theme should default to 'system' when no persisted state is found.
    expect(useThemeStore.getState().theme).toBe('system');
  });

  it('should prioritize theme from localStorage over system preference', async () => {
    // Set a theme in localStorage.
    const persistedAppTheme = JSON.stringify({ state: { theme: 'light' }, version: 0 });
    localStorage.setItem('app-theme', persistedAppTheme);
    expect(localStorage.setItem).toHaveBeenCalledWith('app-theme', persistedAppTheme);

    // Manually trigger the rehydration process to load the state from storage.
    // In a real app, this happens automatically.
    await act(() => useThemeStore.persist.rehydrate());

    // The theme should be 'light' as loaded from localStorage.
    expect(useThemeStore.getState().theme).toBe('light');
  });

  it('should toggle theme correctly from system to dark', () => {
    // Set the initial theme state to 'system'.
    useThemeStore.setState({ theme: 'system' });
    const { toggleTheme } = useThemeStore.getState();

    // Call the toggle function.
    toggleTheme();

    // The theme should cycle from 'system' to 'dark'.
    expect(useThemeStore.getState().theme).toBe('dark');
  });

  it('should toggle theme correctly from dark to light', () => {
    // Set the initial theme state to 'dark'.
    useThemeStore.setState({ theme: 'dark' });
    const { toggleTheme } = useThemeStore.getState();

    // Call the toggle function.
    toggleTheme();

    // The theme should cycle from 'dark' to 'light'.
    expect(useThemeStore.getState().theme).toBe('light');
  });

  it('should toggle theme correctly from light to system', () => {
    // Set the initial theme state to 'light'.
    useThemeStore.setState({ theme: 'light' });
    const { toggleTheme } = useThemeStore.getState();

    // Call the toggle function.
    toggleTheme();

    // The theme should cycle from 'light' to 'system'.
    expect(useThemeStore.getState().theme).toBe('system');
  });

  it('should persisting theme state update in local storage', () => {
    // Set the initial theme state to 'dark'.
    useThemeStore.setState({ theme: 'dark' });
    const { toggleTheme } = useThemeStore.getState();

    // Call the toggle function, which should also trigger persistence.
    toggleTheme();

    // The new theme ('light') should be saved to localStorage.
    const persistedAppTheme: PersistedThemeStore | null = JSON.parse(
      localStorage.getItem('app-theme') || 'null',
    );
    expect(localStorage.getItem).toHaveBeenCalledWith('app-theme');
    expect(persistedAppTheme).not.toBeNull();
    expect(persistedAppTheme!.state.theme).toBe('light');
  });
});

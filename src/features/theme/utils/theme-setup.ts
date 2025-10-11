/**
 * This script is executed early to set the theme class on the <html> element.
 * It reads the theme from localStorage and applies it before the main application
 * mounts, preventing a "flash" of the incorrect theme.
 */
import type { PersistedThemeStore } from '../hooks/useThemeStore';
import { THEME_CYCLE } from './helper';

const storageKey = 'app-theme';
const { classList } = document.documentElement;

// Default to 'system' theme if no valid theme is found in localStorage.
let theme = 'system';

try {
  // Attempt to retrieve and parse the theme from localStorage.
  const persistedTheme = JSON.parse(localStorage.getItem(storageKey) || 'null');

  if (persistedTheme) {
    const parsedTheme = (persistedTheme as PersistedThemeStore).state.theme;

    // Validate the persisted theme to ensure it's a supported value.
    if (typeof parsedTheme === 'string' && THEME_CYCLE.includes(parsedTheme)) {
      theme = parsedTheme;
    }
  }
} catch {
  // If localStorage is unavailable or the data is corrupt, the default 'system' theme is used.
  // This prevents the application from crashing in environments like private browsing.
  theme = 'system';
}

// Apply the determined theme class to the <html> element.
classList.remove('system', 'dark', 'light');
classList.add(theme);

import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('theme-setup script', () => {
  // Before each test, reset modules, DOM state, and mocks to ensure a clean slate.
  beforeEach(() => {
    // This ensures the setup script can be re-imported and re-executed for each test.
    vi.resetModules();
    // Clear any classes on the <html> element.
    document.documentElement.className = '';
    // Clear localStorage.
    localStorage.clear();
  });

  it('should apply "system" class by default when localStorage is empty', async () => {
    // Dynamically import the script to execute it.
    await import('./theme-setup');

    // The 'system' class should be added to the html element.
    expect(document.documentElement.classList.contains('system')).toBe(true);
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(document.documentElement.classList.contains('light')).toBe(false);
  });

  it('should apply "dark" class when "dark" is set in localStorage', async () => {
    // Set 'dark' theme in localStorage.
    const persistedState = { state: { theme: 'dark' }, version: 0 };
    localStorage.setItem('app-theme', JSON.stringify(persistedState));

    // Execute the script.
    await import('./theme-setup');

    // The 'dark' class should be present.
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(document.documentElement.classList.contains('light')).toBe(false);
    expect(document.documentElement.classList.contains('system')).toBe(false);
  });

  it('should apply "light" class when "light" is set in localStorage', async () => {
    // Set 'light' theme in localStorage.
    const persistedState = { state: { theme: 'light' }, version: 0 };
    localStorage.setItem('app-theme', JSON.stringify(persistedState));

    // Execute the script.
    await import('./theme-setup');

    // The 'light' class should be present.
    expect(document.documentElement.classList.contains('light')).toBe(true);
    expect(document.documentElement.classList.contains('system')).toBe(false);
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  it('should default to "system" class if localStorage contains an invalid theme', async () => {
    // Set an unsupported theme value in localStorage.
    const persistedState = { state: { theme: 'invalid-theme' }, version: 0 };
    localStorage.setItem('app-theme', JSON.stringify(persistedState));

    // Execute the script.
    await import('./theme-setup');

    // The class should fall back to 'system'.
    expect(document.documentElement.classList.contains('system')).toBe(true);
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(document.documentElement.classList.contains('light')).toBe(false);
  });

  it('should default to "system" class if localStorage contains corrupted JSON', async () => {
    // Set a malformed JSON string in localStorage.
    localStorage.setItem('app-theme', '{"state": malformed}');

    // Execute the script.
    await import('./theme-setup');

    // The class should fall back to 'system' due to the parsing error.
    expect(document.documentElement.classList.contains('system')).toBe(true);
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(document.documentElement.classList.contains('light')).toBe(false);
  });

  it('should default to "system" class if localStorage access throws an error', async () => {
    // Mock localStorage.getItem to throw a security error.
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('Local Storage error');
    });

    // Execute the script.
    await import('./theme-setup');

    // The class should fall back to 'system' due to the thrown error.
    expect(document.documentElement.classList.contains('system')).toBe(true);
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(document.documentElement.classList.contains('light')).toBe(false);
  });
});

import { describe, expect, it } from 'vitest';
import { getNextTheme } from './helper';

describe('Theme helpers', () => {
  describe('getNextTheme', () => {
    it('should return "dark" if current theme is "system"', () => {
      expect(getNextTheme('system')).toBe('dark');
    });

    it('should return "light" if current theme is "dark"', () => {
      expect(getNextTheme('dark')).toBe('light');
    });

    it('should return "system" if current theme is "light"', () => {
      expect(getNextTheme('light')).toBe('system');
    });
  });
});

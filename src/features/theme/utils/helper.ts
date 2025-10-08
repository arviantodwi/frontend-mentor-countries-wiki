/**
 * Defines the cycle of themes for toggling.
 */
const THEME_CYCLE = ['system', 'dark', 'light'] as const;

/**
 * Represents the possible theme values, derived from the theme cycle.
 */
export type Theme = (typeof THEME_CYCLE)[number];

/**
 * Returns the next theme in a predefined cycle (dark -> light -> system -> dark).
 *
 * @param currentTheme The current theme from the cycle.
 * @returns The next theme in the cycle.
 */
export function getNextTheme(currentTheme: Theme): Theme {
  const currentIndex = THEME_CYCLE.indexOf(currentTheme);
  const nextIndex = (currentIndex + 1) % THEME_CYCLE.length;
  return THEME_CYCLE[nextIndex];
}

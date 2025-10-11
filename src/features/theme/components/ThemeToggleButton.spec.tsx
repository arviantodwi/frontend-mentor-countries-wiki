import { act, render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { useThemeStore } from '../hooks/useThemeStore';
import { ThemeToggleButton } from './ThemeToggleButton';

describe('ThemeToggleButton', () => {
  // Reset theme store before each test to ensure isolation.
  beforeEach(() => {
    act(() => {
      useThemeStore.setState(useThemeStore.getInitialState());
    });
  });

  describe('Label and Icon', () => {
    const iconClassName = 'aspect-square w-5';

    it('should render dark mode label and icon when current theme is "system"', () => {
      // Set current theme to 'system', so the button should display the next theme, 'dark'.
      act(() => {
        useThemeStore.setState({ theme: 'system' });
      });

      render(<ThemeToggleButton />);
      const button = screen.getByRole('button');
      const icon = screen.getByTestId('moon-icon');

      expect(button).toHaveAccessibleName(/Dark Mode/i);
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveClass(iconClassName);
    });

    it('should render light mode label and icon when current theme is "dark"', () => {
      // Set current theme to 'dark', so the button should display the next theme, 'light'.
      act(() => {
        useThemeStore.setState({ theme: 'dark' });
      });

      render(<ThemeToggleButton />);
      const button = screen.getByRole('button');
      const icon = screen.getByTestId('sun-icon');

      expect(button).toHaveAccessibleName(/Light Mode/i);
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveClass(iconClassName);
    });

    it('should render system mode label and icon when current theme is "light"', () => {
      // Set current theme to 'light', so the button should display the next theme, 'system'.
      act(() => {
        useThemeStore.setState({ theme: 'light' });
      });

      render(<ThemeToggleButton />);
      const button = screen.getByRole('button');
      const icon = screen.getByTestId('moon-sun-icon');

      expect(button).toHaveAccessibleName(/Match System/i);
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveClass(iconClassName);
    });
  });

  it('should cycle through themes when clicked', async () => {
    const user = userEvent.setup();
    render(<ThemeToggleButton />);

    const themeToggleButton = screen.getByRole('button');

    // The button should initially display "Dark Mode", reflecting the next cycle
    // after default theme (system).
    expect(themeToggleButton).toHaveAccessibleName(/Dark Mode/i);
    expect(screen.getByTestId('moon-icon')).toBeInTheDocument();

    // Simulate a user clicking the button to cycle to the next theme.
    // The button text should update to "Light Mode" once clicked.
    await user.click(themeToggleButton);
    expect(themeToggleButton).toHaveAccessibleName(/Light Mode/i);
    expect(screen.getByTestId('sun-icon')).toBeInTheDocument();

    // Simulate a second click to cycle the theme again.
    // The button text should update to "Match System".
    await user.click(themeToggleButton);
    expect(themeToggleButton).toHaveAccessibleName(/Match System/i);
    expect(screen.getByTestId('moon-sun-icon')).toBeInTheDocument();
  });
});

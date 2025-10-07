import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { useThemeStore } from '../stores/theme';
import ThemeButton from './ThemeButton';

describe('ThemeButton Component', () => {
  it('should render with initial dark state of false', () => {
    render(<ThemeButton />);
    const toggleDarkThemeButton = screen.getByRole('button', { name: /Dark Mode/i });

    expect(useThemeStore.getInitialState().dark).toBe(false);
    expect(toggleDarkThemeButton).toBeInTheDocument();
  });

  it('should update dark state on button click', async () => {
    const user = userEvent.setup();
    render(<ThemeButton />);
    const toggleThemeButton = screen.getByRole('button');

    await user.click(toggleThemeButton);
    expect(useThemeStore.getState().dark).toBe(true);
    expect(toggleThemeButton).toHaveAccessibleName(/Light Mode/i);

    await user.click(toggleThemeButton);
    expect(useThemeStore.getState().dark).toBe(false);
    expect(toggleThemeButton).toHaveAccessibleName(/Dark Mode/i);
  });
});

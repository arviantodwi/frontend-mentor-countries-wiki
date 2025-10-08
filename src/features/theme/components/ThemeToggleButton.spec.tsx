import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { useThemeStore } from '../hooks/useThemeStore';
import { ThemeToggleButton } from './ThemeToggleButton';


describe('ThemeToggleButton Component', () => {
  it('should render with initial dark state of false', () => {
    render(<ThemeToggleButton />);
    const toggleDarkThemeButton = screen.getByRole('button', { name: /Dark Mode/i });

    expect(useThemeStore.getInitialState().theme).toBe('light');
    expect(toggleDarkThemeButton).toBeInTheDocument();
  });

  it('should update dark state on button click', async () => {
    const user = userEvent.setup();
    render(<ThemeToggleButton />);
    const toggleThemeButton = screen.getByRole('button');

    await user.click(toggleThemeButton);
    expect(useThemeStore.getState().theme).toBe('dark');
    expect(toggleThemeButton).toHaveAccessibleName(/Light Mode/i);

    await user.click(toggleThemeButton);
    expect(useThemeStore.getState().theme).toBe('light');
    expect(toggleThemeButton).toHaveAccessibleName(/Dark Mode/i);
  });
});

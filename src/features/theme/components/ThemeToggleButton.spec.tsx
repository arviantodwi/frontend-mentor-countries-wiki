import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { ThemeToggleButton } from './ThemeToggleButton';

describe('ThemeToggleButton', () => {
  it('should cycle through themes when clicked', async () => {
    const user = userEvent.setup();
    render(<ThemeToggleButton />);

    const themeToggleButton = screen.getByRole('button');

    // The button should initially display "Dark Mode", reflecting the next cycle
    // after default theme (system).
    expect(themeToggleButton).toHaveAccessibleName(/Dark Mode/i);

    // Simulate a user clicking the button to cycle to the next theme.
    // The button text should update to "Light Mode" once clicked.
    await user.click(themeToggleButton);
    expect(themeToggleButton).toHaveAccessibleName(/Light Mode/i);

    // Simulate a second click to cycle the theme again.
    // The button text should update to "Match System".
    await user.click(themeToggleButton);
    expect(themeToggleButton).toHaveAccessibleName(/Match System/i);
  });
});

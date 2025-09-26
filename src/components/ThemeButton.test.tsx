import { render } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { useThemeStore } from '../stores/theme';
import ThemeButton from './ThemeButton';

describe('ThemeButton Component', () => {
  it('should render with initial dark state of false', () => {
    const { getByText } = render(<ThemeButton />);
    expect(useThemeStore.getInitialState().dark).toBe(false);
    expect(getByText(/Dark Mode/i)).toBeDefined();
  });

  it('should update dark state on button click', async () => {
    const user = userEvent.setup();
    const { getByRole, getByText } = render(<ThemeButton />);
    const button = getByRole('button');

    await user.click(button);
    expect(useThemeStore.getState().dark).toBe(true);
    expect(getByText(/Light Mode/i)).toBeDefined();

    await user.click(button);
    expect(useThemeStore.getState().dark).toBe(false);
    expect(getByText(/Dark Mode/i)).toBeDefined();
  });
});

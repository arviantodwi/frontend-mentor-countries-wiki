import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import App from './App';

describe('App', () => {
  it('renders the menu bar', () => {
    render(<App />);
    const headerComponent = screen.getByTestId('header');

    expect(headerComponent).toBeInTheDocument();
  });
});

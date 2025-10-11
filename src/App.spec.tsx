import { RouterProvider } from '@tanstack/react-router';
import { act, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { router } from './router';

describe('App', () => {
  beforeEach(() => {
    render(<RouterProvider router={router} />);
  });

  it('should contain topbar header', async () => {
    await act(() => router.navigate({ to: '/' }));
    const headerComponent = screen.getByTestId('header');
    expect(headerComponent).toBeInTheDocument();
  });

  it('renders the index page and its content', async () => {
    await act(() => router.navigate({ to: '/' }));
    const indexPageContent = screen.getByTestId('country-list-content');
    expect(indexPageContent).toBeInTheDocument();
  });
});

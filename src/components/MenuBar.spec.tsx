import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import MenuBar from './MenuBar';

describe('MenuBar Component', () => {
  it('should render "Where in the world?" title', () => {
    render(<MenuBar />);
    const pageTitle = screen.getByText(/Where in the world?/i);

    expect(pageTitle).toBeInTheDocument();
  });
});

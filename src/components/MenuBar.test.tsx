import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import MenuBar from './MenuBar';

describe('MenuBar Component', () => {
  it('should render "Where in the world?" title', () => {
    const { getByText } = render(<MenuBar />);
    const pageTitle = getByText(/Where in the world?/i);
    expect(pageTitle).toBeDefined();
  });
});

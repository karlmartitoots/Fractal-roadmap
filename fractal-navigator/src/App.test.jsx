import { render, screen } from '@testing-library/react';
import App from './App';
import { describe, it, expect } from 'vitest';

describe('App', () => {
  it('renders the initial "Home" node heading', () => {
    render(<App />);
    const titleElement = screen.getByRole('heading', { name: /home/i, level: 1 });
    expect(titleElement).toBeInTheDocument();
  });
});

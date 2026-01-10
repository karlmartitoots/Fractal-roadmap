import { render, screen, fireEvent, within } from '@testing-library/react';
import App from './App';
import { describe, it, expect } from 'vitest';
import React from 'react';

// We need to mock localStorage because App initializes state from it
const localStorageMock = (function () {
  let store = {};
  return {
    getItem: function (key) {
      return store[key] || null;
    },
    setItem: function (key, value) {
      store[key] = value.toString();
    },
    clear: function () {
      store = {};
    }
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

describe('App', () => {
  it('renders the initial "Home" node heading', () => {
    render(<App />);
    const titleElement = screen.getByRole('heading', { name: /home/i, level: 1 });
    expect(titleElement).toBeInTheDocument();
  });

  it('adds magic subtasks when magic button is clicked on main title', async () => {
    render(<App />);

    // Find the heading
    const titleElement = screen.getByRole('heading', { name: /home/i, level: 1 });

    // The button is next to the heading, inside the same flex container
    const titleContainer = titleElement.closest('div');

    // Find the magic button within that container using aria-label
    const magicButton = within(titleContainer).getByRole('button', { name: /auto-generate subtasks/i });

    fireEvent.click(magicButton);

    // Should now see "Magic Subtask 1", "Magic Subtask 2", etc.
    expect(screen.getByText('Magic Subtask 1')).toBeInTheDocument();
    expect(screen.getByText('Magic Subtask 2')).toBeInTheDocument();
    expect(screen.getByText('Magic Subtask 3')).toBeInTheDocument();
  });

  it('adds magic subtasks when magic button is clicked on a subtask', async () => {
    // Reset local storage for clean state
    window.localStorage.clear();

    render(<App />);

    // Use "Project A" from initialData
    const subtaskTitle = screen.getByText('Project A');
    expect(subtaskTitle).toBeInTheDocument();

    // Find the list item containing "Project A"
    const listItem = subtaskTitle.closest('li');

    // Find the magic button within that list item using aria-label
    const magicButton = within(listItem).getByRole('button', { name: /auto-generate subtasks/i });

    fireEvent.click(magicButton);

    // Click on "Project A" text to zoom in (avoiding the magic button)
    fireEvent.click(subtaskTitle);

    // Now the main title should be "Project A"
    expect(screen.getByRole('heading', { name: /Project A/i, level: 1 })).toBeInTheDocument();

    // And we should see the magic subtasks
    expect(screen.getByText('Magic Subtask 1')).toBeInTheDocument();
  });
});

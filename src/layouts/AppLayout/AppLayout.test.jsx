import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

// Mock the router hooks used inside the layout
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    Outlet: () => null,
    useLocation: () => ({ pathname: '/' }),
    useNavigate: () => vi.fn()
  };
});

import AppLayout from './AppLayout';

describe('AppLayout', () => {
  it('renders domain title and nav buttons', () => {
    render(<AppLayout />);

    expect(screen.getByText('userprateek.com')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Home' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Projects' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Resume' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Contact' })).toBeInTheDocument();
  });

  it('buttons are clickable (no anchor navigation)', () => {
    render(<AppLayout />);

    const projects = screen.getByRole('button', { name: 'Projects' });
    fireEvent.click(projects);

    // If this were an <a>, it would show link role. Ensure it's still a button.
    expect(projects.tagName.toLowerCase()).toBe('button');
  });
});

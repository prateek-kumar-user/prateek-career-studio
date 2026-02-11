import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

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
  it('renders domain title and nav labels', () => {
    render(<AppLayout />);

    expect(screen.getByText('userprateek.com')).toBeInTheDocument();
    expect(screen.getByText('Home', { selector: 'button' })).toBeInTheDocument();
    expect(screen.getByText('Projects', { selector: 'button' })).toBeInTheDocument();
    expect(screen.getByText('Resume', { selector: 'button' })).toBeInTheDocument();
    expect(screen.getByText('Contact', { selector: 'button' })).toBeInTheDocument();
  });

  it('route controls are buttons', () => {
    render(<AppLayout />);

    const projects = screen.getByText('Projects', { selector: 'button' });
    fireEvent.click(projects);

    expect(projects.tagName.toLowerCase()).toBe('button');
  });
});

import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import AppLayout from '../layouts/AppLayout/AppLayout';
import HomePage from '../pages/HomePage/HomePage';
import ProjectsPage from '../pages/ProjectsPage/ProjectsPage';
import ResumePage from '../pages/ResumePage/ResumePage';
import ContactPage from '../pages/ContactPage/ContactPage';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <NotFoundPage />, // fallback for bad routes/errors
    children: [
      { index: true, element: <HomePage /> },
      { path: 'projects', element: <ProjectsPage /> },
      { path: 'resume', element: <ResumePage /> },
      { path: 'contact', element: <ContactPage /> }
    ]
  }
]);

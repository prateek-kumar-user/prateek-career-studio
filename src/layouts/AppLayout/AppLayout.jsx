import React from 'react';
import { Outlet } from 'react-router-dom';
import { AppBar, Box, Container, Toolbar, Typography } from '@mui/material';

import site from '../../content/site.json';
import ResponsiveNav from '../../components/ResponsiveNav/ResponsiveNav';

import styles from './AppLayout.module.scss';

export default function AppLayout() {
  return (
    <Box className={styles.root}>
      <AppBar position="sticky" color="transparent" elevation={0} className={styles.appBar}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700 }}>
            {site.domain}
          </Typography>

          <ResponsiveNav />
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" className={styles.container}>
        <Outlet />
      </Container>

      <Box className={styles.footer}>
        <Container maxWidth="lg">
          <Box className={styles.footerInner}>
            <Typography variant="body2" color="text.secondary">
              © {new Date().getFullYear()} {site.domain}
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

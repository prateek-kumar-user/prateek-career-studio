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
        <Container maxWidth="lg">
          <Toolbar disableGutters className={styles.toolbar}>
            <Box>
              <Typography variant="overline" className={styles.brandKicker}>
                Portfolio
              </Typography>
              <Typography variant="h6" className={styles.brand}>
                {site.domain}
              </Typography>
            </Box>

            <ResponsiveNav />
          </Toolbar>
        </Container>
      </AppBar>

      <Container maxWidth="lg" className={styles.container}>
        <Outlet />
      </Container>

      <Box component="footer" className={styles.footer}>
        <Container maxWidth="lg" className={styles.footerInner}>
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} {site.domain}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Built with React + MUI
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}

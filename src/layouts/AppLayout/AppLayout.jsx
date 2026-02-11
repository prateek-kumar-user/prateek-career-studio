import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  Avatar,
  Box,
  Button,
  Card,
  Container,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Typography
} from '@mui/material';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';

import site from '../../content/site.json';
import profile from '../../content/profile.json';
import avatar from '../../assets/profile/prateek-primary.jpg';

import styles from './AppLayout.module.scss';
import { getRuntimeDomain } from '../../utils/runtimeDomain';

export default function AppLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const runtimeDomain = getRuntimeDomain();

  const go = (path) => {
    setOpen(false);
    navigate(path);
  };

  const isRouteActive = (path) => (path === '/' ? location.pathname === '/' : location.pathname.startsWith(path));

  return (
    <Box className={styles.root}>
      <Box className={styles.backgroundPattern} aria-hidden="true" />

      <Container maxWidth="xl" className={styles.frame}>
        <Box className={styles.mobileTopBar}>
          <Box>
            <Typography variant="overline" className={styles.brandKicker}>
              Portfolio
            </Typography>
            <Typography variant="h6" className={styles.brand}>
              {runtimeDomain}
            </Typography>
          </Box>

          <IconButton aria-label="Open menu" onClick={() => setOpen(true)} color="inherit" size="large">
            <MenuRoundedIcon />
          </IconButton>
        </Box>

        <Box className={styles.layoutGrid}>
          <Card variant="outlined" className={styles.sidebar}>
            <Box className={styles.sidebarInner}>
              <Stack spacing={2}>
                <Avatar
                  src={avatar}
                  alt={profile.identity.name}
                  className={styles.profileAvatar}
                  imgProps={{ loading: 'lazy', decoding: 'async' }}
                />
                <Box>
                  <Typography variant="h3">{profile.identity.name}</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 0.6 }}>
                    {profile.identity.primary_title}
                  </Typography>
                </Box>
                <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                  <Button variant="contained" size="small" onClick={() => go('/contact')}>
                    Hire Prateek
                  </Button>
                  <Button variant="outlined" size="small" onClick={() => window.location.assign(site.contact.linkedin)}>
                    LinkedIn
                  </Button>
                </Stack>
              </Stack>

              <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />

              <Box className={styles.desktopNav} aria-label="Primary navigation">
                {site.routes.map((route) => (
                  <Button
                    key={route.path}
                    variant={isRouteActive(route.path) ? 'contained' : 'text'}
                    color={isRouteActive(route.path) ? 'primary' : 'inherit'}
                    onClick={() => go(route.path)}
                    className={styles.navButton}
                  >
                    {route.label}
                  </Button>
                ))}
              </Box>
            </Box>
          </Card>

          <Box className={styles.contentColumn}>
            <Outlet />
          </Box>
        </Box>

        <Card variant="outlined" className={styles.mobileProfileCard}>
          <Stack spacing={1.2} direction="row" alignItems="center">
            <Avatar
              src={avatar}
              alt={profile.identity.name}
              sx={{ width: 58, height: 58 }}
              imgProps={{ loading: 'lazy', decoding: 'async' }}
            />
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                {profile.identity.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {profile.identity.primary_title}
              </Typography>
            </Box>
          </Stack>
        </Card>

        <Box component="footer" className={styles.footer}>
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} {runtimeDomain}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Built with React + MUI
          </Typography>
        </Box>
      </Container>

      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 290, p: 2.25 }} role="presentation">
          <Typography variant="overline" color="text.secondary">
            Navigate
          </Typography>
          <List disablePadding sx={{ mt: 1 }}>
            {site.routes.map((r) => (
              <ListItem key={r.path} disablePadding>
                <ListItemButton selected={isRouteActive(r.path)} onClick={() => go(r.path)}>
                  <ListItemText primary={r.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider sx={{ mt: 2, borderColor: 'rgba(255,255,255,0.09)' }} />
        </Box>
      </Drawer>
    </Box>
  );
}

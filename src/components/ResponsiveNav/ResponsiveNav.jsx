import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography
} from '@mui/material';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';

import site from '../../content/site.json';

import styles from './ResponsiveNav.module.scss';

export default function ResponsiveNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = React.useState(false);

  const go = (path) => {
    setOpen(false);
    navigate(path);
  };

  return (
    <>
      <Box className={styles.desktopNav} aria-label="Primary navigation">
        {site.routes.map((r) => {
          const isActive = location.pathname === r.path;
          return (
            <Button
              key={r.path}
              variant={isActive ? 'contained' : 'text'}
              color={isActive ? 'primary' : 'inherit'}
              onClick={() => go(r.path)}
              className={styles.navButton}
            >
              {r.label}
            </Button>
          );
        })}
      </Box>

      <Box className={styles.mobileNav}>
        <IconButton aria-label="Open menu" onClick={() => setOpen(true)} color="inherit" size="large">
          <MenuRoundedIcon />
        </IconButton>

        <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
          <Box sx={{ width: 290, p: 2.25 }} role="presentation">
            <Typography variant="overline" color="text.secondary">
              Navigate
            </Typography>
            <List disablePadding sx={{ mt: 1 }}>
              {site.routes.map((r) => (
                <ListItem key={r.path} disablePadding>
                  <ListItemButton selected={location.pathname === r.path} onClick={() => go(r.path)}>
                    <ListItemText primary={r.label} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
            <Divider sx={{ mt: 2, borderColor: 'rgba(255,255,255,0.09)' }} />
          </Box>
        </Drawer>
      </Box>
    </>
  );
}

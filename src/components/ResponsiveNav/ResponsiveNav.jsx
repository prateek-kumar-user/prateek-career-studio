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
  ListItemText
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

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
      {/* Desktop nav: buttons */}
      <Box className={styles.desktopNav}>
        {site.routes.map((r) => (
          <Button
            key={r.path}
            variant={location.pathname === r.path ? 'contained' : 'text'}
            color={location.pathname === r.path ? 'primary' : 'inherit'}
            onClick={() => go(r.path)}
            sx={{ textTransform: 'none' }}
          >
            {r.label}
          </Button>
        ))}
      </Box>

      {/* Mobile nav: hamburger + drawer */}
      <Box className={styles.mobileNav}>
        <IconButton
          aria-label="Open menu"
          onClick={() => setOpen(true)}
          color="inherit"
          size="large"
        >
          <MenuIcon />
        </IconButton>

        <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
          <Box sx={{ width: 280, p: 2 }} role="presentation">
            <List disablePadding>
              {site.routes.map((r) => (
                <ListItem key={r.path} disablePadding>
                  <ListItemButton
                    selected={location.pathname === r.path}
                    onClick={() => go(r.path)}
                  >
                    <ListItemText primary={r.label} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
            <Divider sx={{ mt: 2, borderColor: 'rgba(0,0,0,0.08)' }} />
          </Box>
        </Drawer>
      </Box>
    </>
  );
}

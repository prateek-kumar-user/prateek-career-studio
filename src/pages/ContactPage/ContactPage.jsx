import React from 'react';
import { Box, Button, Card, CardContent, Stack, Typography } from '@mui/material';

import site from '../../content/site.json';

import styles from './ContactPage.module.scss';

function openExternal(url) {
  // Per request: no <a href>. Use imperative navigation.
  window.location.assign(url);
}

export default function ContactPage() {
  const { contact, domain } = site;

  return (
    <Box>
      <Stack spacing={2} sx={{ mb: 2 }}>
        <Typography variant="h4" sx={{ fontWeight: 800 }}>
          Contact
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Reach out for full-time roles, freelance work, or architecture/engineering discussions.
        </Typography>
      </Stack>

      <Box className={styles.grid}>
        <Card variant="outlined" sx={{ borderColor: 'rgba(255,255,255,0.12)' }}>
          <CardContent>
            <Stack spacing={1.5}>
              <Typography variant="h6" sx={{ fontWeight: 800 }}>
                Details
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Email and phone are copied from your resume PDF; we can adjust what’s public during the polish phase.
              </Typography>

              <Typography variant="body1">Email: {contact.email}</Typography>
              <Typography variant="body1">Phone: {contact.phone}</Typography>
            </Stack>
          </CardContent>
        </Card>

        <Card variant="outlined" sx={{ borderColor: 'rgba(255,255,255,0.12)' }}>
          <CardContent>
            <Stack spacing={1.5}>
              <Typography variant="h6" sx={{ fontWeight: 800 }}>
                Actions
              </Typography>

              <Box className={styles.actions}>
                <Button
                  variant="contained"
                  onClick={() => openExternal(`mailto:${contact.email}`)}
                  sx={{ textTransform: 'none' }}
                >
                  Send Email
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => openExternal(contact.linkedin)}
                  sx={{ textTransform: 'none' }}
                >
                  LinkedIn
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => openExternal(`https://${domain}`)}
                  sx={{ textTransform: 'none' }}
                >
                  {domain}
                </Button>
              </Box>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}

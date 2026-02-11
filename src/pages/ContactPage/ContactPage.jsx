import React from 'react';
import { Box, Button, Card, CardContent, Chip, Stack, Typography } from '@mui/material';
import MailOutlineRoundedIcon from '@mui/icons-material/MailOutlineRounded';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LanguageRoundedIcon from '@mui/icons-material/LanguageRounded';

import site from '../../content/site.json';
import resume from '../../content/resume.json';
import GoogleReadyContactForm from '../../components/GoogleReadyContactForm/GoogleReadyContactForm';

import styles from './ContactPage.module.scss';

function openExternal(url) {
  window.location.assign(url);
}

export default function ContactPage() {
  const { contact, domain } = site;

  return (
    <Box className={styles.page}>
      <Box className={styles.header}>
        <Typography variant="h2">Let’s build reliable products together</Typography>
        <Typography variant="body1" color="text.secondary">
          Open to full-time roles, consulting engagements, and architecture-focused collaborations.
        </Typography>
      </Box>

      <Box className={styles.grid}>
        <Card variant="outlined" className={styles.primaryCard}>
          <CardContent>
            <Stack spacing={1.5}>
              <Typography variant="h3">Hiring quick view</Typography>
              <Typography variant="body2" color="text.secondary">
                Best fit: teams modernizing complex product workflows and needing strong frontend/API execution.
              </Typography>
              <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                {resume.availability.full_time && <Chip label="Full-time" color="primary" />}
                {resume.availability.freelance && <Chip label="Freelance" color="secondary" />}
                {resume.availability.remote && <Chip label="Remote" variant="outlined" />}
              </Stack>

              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.4 }}>
                <strong>Email:</strong> {contact.email}
                <br />
                <strong>Phone:</strong> {contact.phone}
              </Typography>
            </Stack>
          </CardContent>
        </Card>

        <Card variant="outlined">
          <CardContent>
            <Typography variant="h3" sx={{ mb: 1.4 }}>Contact actions</Typography>
            <Stack spacing={1}>
              <Button variant="contained" startIcon={<MailOutlineRoundedIcon />} onClick={() => openExternal(`mailto:${contact.email}`)}>
                Send email
              </Button>
              <Button variant="outlined" startIcon={<LinkedInIcon />} onClick={() => openExternal(contact.linkedin)}>
                Open LinkedIn
              </Button>
              <Button variant="outlined" startIcon={<LanguageRoundedIcon />} onClick={() => openExternal(`https://${domain}`)}>
                Visit {domain}
              </Button>
            </Stack>
          </CardContent>
        </Card>

        <Card variant="outlined" className={styles.full}>
          <CardContent>
            <GoogleReadyContactForm />
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}

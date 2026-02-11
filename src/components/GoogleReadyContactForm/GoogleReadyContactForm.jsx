import React from 'react';
import { Alert, Box, Button, Stack, TextField, Typography } from '@mui/material';

import styles from './GoogleReadyContactForm.module.scss';

const GOOGLE_FORM_CONFIG = {
  enabled: true,
  viewUrl: 'https://docs.google.com/forms/d/e/1FAIpQLScRD1FumDKrbdyW36cOiPSnQRa7EjX13L7S3fouJxPgVwx8kQ/viewform',
  fields: {
    name: 'entry.2005620554',
    email: 'entry.1045781291',
    phone: 'entry.1166974658',
    company: 'entry.47388915',
    message: 'entry.456489416'
  }
};

export default function GoogleReadyContactForm() {
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const params = new URLSearchParams({ usp: 'pp_url' });

    Object.values(GOOGLE_FORM_CONFIG.fields).forEach((fieldName) => {
      const value = String(formData.get(fieldName) || '').trim();
      if (value) params.set(fieldName, value);
    });

    const prefillUrl = `${GOOGLE_FORM_CONFIG.viewUrl}?${params.toString()}`;
    window.open(prefillUrl, '_blank', 'noopener,noreferrer');
    setSubmitted(true);
  };

  if (!GOOGLE_FORM_CONFIG.enabled) return null;

  return (
    <Box>
      <Typography variant="h3" sx={{ mb: 1 }}>
        Contact for hiring
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 1.6 }}>
        Fill this form and continue to Google submission.
      </Typography>

      <Box component="form" className={styles.form} onSubmit={handleSubmit}>
        <Stack spacing={1.1}>
          <TextField label="Full name" name={GOOGLE_FORM_CONFIG.fields.name} fullWidth required />
          <TextField label="Email" type="email" name={GOOGLE_FORM_CONFIG.fields.email} fullWidth required />
          <TextField label="Phone number" name={GOOGLE_FORM_CONFIG.fields.phone} fullWidth />
          <TextField label="Company (optional)" name={GOOGLE_FORM_CONFIG.fields.company} fullWidth />
          <TextField
            label="Hiring need / project context"
            name={GOOGLE_FORM_CONFIG.fields.message}
            fullWidth
            required
            minRows={4}
            multiline
          />

          <Button variant="contained" type="submit">
            Continue to secure submit
          </Button>
        </Stack>
      </Box>

      {submitted && (
        <Alert severity="info" sx={{ mt: 1.4 }}>
          A Google Form tab has opened with your details prefilled. Click Submit there to complete inquiry.
        </Alert>
      )}
    </Box>
  );
}

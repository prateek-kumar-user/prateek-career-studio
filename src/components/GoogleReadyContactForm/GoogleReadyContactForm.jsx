import React from 'react';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';

import styles from './GoogleReadyContactForm.module.scss';

const GOOGLE_FORM_CONFIG = {
  enabled: false,
  actionUrl: '', // TODO: paste https://docs.google.com/forms/d/e/.../formResponse
  fields: {
    name: 'entry.REPLACE_NAME_ID',
    email: 'entry.REPLACE_EMAIL_ID',
    company: 'entry.REPLACE_COMPANY_ID',
    message: 'entry.REPLACE_MESSAGE_ID'
  }
};

export default function GoogleReadyContactForm() {
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = (event) => {
    if (!GOOGLE_FORM_CONFIG.enabled || !GOOGLE_FORM_CONFIG.actionUrl) {
      event.preventDefault();
      setSubmitted(true);
    }
  };

  return (
    <Box>
      <Typography variant="h3" sx={{ mb: 1 }}>
        Quick intro form
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 1.6 }}>
        Designed for Google Forms wiring. Replace action URL and entry IDs to activate.
      </Typography>

      <Box
        component="form"
        className={styles.form}
        action={GOOGLE_FORM_CONFIG.actionUrl || undefined}
        method="post"
        target="_blank"
        rel="noreferrer"
        onSubmit={handleSubmit}
      >
        <Stack spacing={1.1}>
          <TextField label="Your name" name={GOOGLE_FORM_CONFIG.fields.name} fullWidth required />
          <TextField label="Email" type="email" name={GOOGLE_FORM_CONFIG.fields.email} fullWidth required />
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
            {GOOGLE_FORM_CONFIG.enabled ? 'Send via form' : 'Preview form setup'}
          </Button>
        </Stack>
      </Box>

      {(submitted || !GOOGLE_FORM_CONFIG.enabled) && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1.2 }}>
          TODO: set <code>enabled: true</code>, add <code>actionUrl</code>, and replace each <code>entry.*</code> value using Google Form prefill IDs.
        </Typography>
      )}
    </Box>
  );
}

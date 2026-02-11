import React from 'react';
import { Box, Button, Card, CardContent, Chip, Stack, Typography } from '@mui/material';
import MailOutlineRoundedIcon from '@mui/icons-material/MailOutlineRounded';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PhoneInTalkRoundedIcon from '@mui/icons-material/PhoneInTalkRounded';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import TaskAltRoundedIcon from '@mui/icons-material/TaskAltRounded';

import site from '../../content/site.json';
import resume from '../../content/resume.json';

import styles from './ContactPage.module.scss';

function openExternal(url) {
  window.location.assign(url);
}

export default function ContactPage() {
  const { contact } = site;
  const [copied, setCopied] = React.useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contact.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <Box className={styles.page}>
      <Box className={styles.header}>
        <Typography variant="h2">Contact</Typography>
        <Typography variant="body1" color="text.secondary">
          Open to full-time roles, consulting, and architecture-focused product collaborations.
        </Typography>
      </Box>

      <Box className={styles.grid}>
        <Card variant="outlined" className={styles.primaryCard}>
          <CardContent>
            <Stack spacing={1.5}>
              <Typography variant="h3">Hiring quick view</Typography>
              <Typography variant="body2" color="text.secondary">
                Best fit: teams modernizing complex workflows and looking for strong React architecture plus API coordination.
              </Typography>
              <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                {resume.availability.full_time && <Chip label="Full-time" className={styles.availabilityChip} />}
                {resume.availability.freelance && <Chip label="Freelance" className={styles.availabilityChip} />}
                {resume.availability.remote && <Chip label="Remote" className={styles.availabilityChip} />}
              </Stack>

              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.4 }}>
                <strong>Email:</strong> {contact.email}
                <br />
                <strong>Phone:</strong> {contact.phone}
              </Typography>

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
                <Button
                  className={styles.actionButton}
                  variant={copied ? 'contained' : 'outlined'}
                  startIcon={copied ? <TaskAltRoundedIcon /> : <ContentCopyRoundedIcon />}
                  onClick={copyEmail}
                >
                  {copied ? 'Email copied' : 'Copy email address'}
                </Button>
                <Button
                  className={styles.actionButton}
                  variant="contained"
                  startIcon={<MailOutlineRoundedIcon />}
                  onClick={() => openExternal(`mailto:${contact.email}`)}
                >
                  Send email now
                </Button>
              </Stack>
            </Stack>
          </CardContent>
        </Card>

        <Card variant="outlined">
          <CardContent>
            <Typography variant="h3" sx={{ mb: 1.4 }}>Contact channels</Typography>
            <Stack spacing={1}>
              <Button className={styles.actionButton} variant="contained" startIcon={<MailOutlineRoundedIcon />} onClick={() => openExternal(`mailto:${contact.email}`)}>
                Send email
              </Button>
              <Button className={styles.actionButton} variant="outlined" startIcon={<LinkedInIcon />} onClick={() => openExternal(contact.linkedin)}>
                Open LinkedIn
              </Button>
              <Button className={styles.actionButton} variant="outlined" startIcon={<PhoneInTalkRoundedIcon />} onClick={() => openExternal(`tel:${contact.phone}`)}>
                Call phone
              </Button>
            </Stack>
          </CardContent>
        </Card>

        <Card variant="outlined" className={styles.full}>
          <CardContent>
            <Typography variant="h3" sx={{ mb: 1.2 }}>How to reach out</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1.6 }}>
              Share role context, current product constraints, and expected delivery timeline. Responses are prioritized for active hiring discussions.
            </Typography>
            <Box className={styles.messageGuide}>
              <Typography variant="subtitle2" sx={{ mb: 0.7 }}>Helpful first message format</Typography>
              <Stack spacing={0.7}>
                <Typography variant="body2">• Company and team context</Typography>
                <Typography variant="body2">• Product/workflow complexity you need help with</Typography>
                <Typography variant="body2">• Hiring timeline and interview process</Typography>
              </Stack>
            </Box>

            <Box className={styles.responseNote}>
              <Typography variant="subtitle2" sx={{ mb: 0.4 }}>Response expectation</Typography>
              <Typography variant="body2" color="text.secondary">
                Email is the fastest route for role discussions. Include job scope and hiring window for a quicker, relevant reply.
              </Typography>
            </Box>

            <Stack spacing={1} sx={{ mt: 1.5 }}>
              <Button className={styles.actionButton} variant="contained" startIcon={<MailOutlineRoundedIcon />} onClick={() => openExternal(`mailto:${contact.email}`)}>
                Email hiring details
              </Button>
              <Button className={styles.actionButton} variant="outlined" startIcon={<LinkedInIcon />} onClick={() => openExternal(contact.linkedin)}>
                Message on LinkedIn
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}

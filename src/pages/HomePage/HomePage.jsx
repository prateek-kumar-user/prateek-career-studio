import React from 'react';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  Stack,
  Typography
} from '@mui/material';
import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded';

import profile from '../../content/profile.json';
import resume from '../../content/resume.json';
import site from '../../content/site.json';
import avatar from '../../assets/avatar.png';

import styles from './HomePage.module.scss';

function FocusCard({ title, body }) {
  return (
    <Card variant="outlined" className={styles.focusCard}>
      <CardContent>
        <Typography variant="h3" sx={{ mb: 1.2 }}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {body}
        </Typography>
      </CardContent>
    </Card>
  );
}

function openExternal(url) {
  window.location.assign(url);
}

export default function HomePage() {
  const { identity, engineering_philosophy, technical_scope } = profile;

  const heroStyle = site.design?.hero_background_image
    ? { '--hero-bg': `url(${site.design.hero_background_image})` }
    : undefined;

  return (
    <Box className={styles.page}>
      <Card variant="outlined" className={styles.hero} style={heroStyle}>
        <Box className={styles.heroOverlay}>
          <Grid container spacing={{ xs: 3, md: 4 }}>
            <Grid size={{ xs: 12, md: 8 }}>
              <Stack spacing={2.1} className={styles.fadeUp}>
                <Chip label="Available for full-time and freelance roles" color="primary" sx={{ alignSelf: 'flex-start' }} />

                <Box className={styles.identityWrap}>
                  <Avatar src={avatar} alt={identity.name} sx={{ width: 76, height: 76, border: '2px solid rgba(255,255,255,0.25)' }} />
                  <Box>
                    <Typography variant="h1">{identity.name}</Typography>
                    <Typography variant="h3" color="text.secondary" sx={{ mt: 0.35 }}>
                      {identity.primary_title}
                    </Typography>
                  </Box>
                </Box>

                <Typography variant="body1" className={styles.heroLead}>
                  {identity.positioning}
                </Typography>

                <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 840 }}>
                  {identity.core_trait}.
                </Typography>

                <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" className={styles.tags}>
                  <Chip label={identity.engineering_identity} variant="outlined" />
                  <Chip label={`Based in ${identity.location}`} variant="outlined" />
                  {identity.availability?.remote && <Chip label="Remote-ready" variant="outlined" />}
                </Stack>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.2}>
                  <Button variant="contained" endIcon={<ArrowOutwardRoundedIcon />} onClick={() => openExternal(`mailto:${site.contact.email}`)}>
                    Hire Prateek
                  </Button>
                  <Button variant="outlined" onClick={() => openExternal(site.contact.linkedin)}>
                    View LinkedIn
                  </Button>
                </Stack>
              </Stack>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <Card variant="outlined" className={styles.philosophyCard}>
                <CardContent>
                  <Stack spacing={1.2}>
                    <Typography variant="overline" color="text.secondary">
                      Operating philosophy
                    </Typography>
                    {engineering_philosophy.problem_solving_style.slice(0, 3).map((point) => (
                      <Typography key={point} variant="body2">
                        • {point}
                      </Typography>
                    ))}
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Card>

      <Box className={styles.sectionHeader}>
        <Typography variant="h2">What I bring to engineering teams</Typography>
        <Typography variant="body1" color="text.secondary">
          Clear architecture, resilient interfaces, and execution quality that scales across products.
        </Typography>
      </Box>

      <Box className={styles.focusGrid}>
        <FocusCard title="Frontend architecture" body={technical_scope.primary_strengths[0]} />
        <FocusCard title="Client ↔ API boundaries" body={technical_scope.primary_strengths[1]} />
        <FocusCard title="Workflow platforms" body={technical_scope.primary_strengths[2]} />
      </Box>

      <Card variant="outlined" className={styles.skillBand}>
        <CardContent>
          <Typography variant="h3" sx={{ mb: 1.5 }}>
            Core stack highlights
          </Typography>
          <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
            {resume.core_skills.slice(0, 10).map((skill) => (
              <Chip key={skill} label={skill} />
            ))}
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}

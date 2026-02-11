import React from 'react';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
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

function useTypewriter(phrases, speed = 46, hold = 1500) {
  const [text, setText] = React.useState(phrases[0] ?? '');
  const [index, setIndex] = React.useState(0);
  const [deleting, setDeleting] = React.useState(false);
  const [charIndex, setCharIndex] = React.useState(phrases[0]?.length ?? 0);

  React.useEffect(() => {
    if (!phrases.length) return undefined;

    const full = phrases[index % phrases.length];

    const timeout = window.setTimeout(
      () => {
        if (!deleting && charIndex === full.length) {
          setDeleting(true);
          return;
        }

        if (deleting && charIndex === 0) {
          setDeleting(false);
          setIndex((prev) => (prev + 1) % phrases.length);
          return;
        }

        setCharIndex((prev) => prev + (deleting ? -1 : 1));
      },
      !deleting && charIndex === full.length ? hold : speed
    );

    return () => window.clearTimeout(timeout);
  }, [charIndex, deleting, hold, index, phrases, speed]);

  React.useEffect(() => {
    if (!phrases.length) return;
    const full = phrases[index % phrases.length];
    setText(full.slice(0, charIndex));
  }, [charIndex, index, phrases]);

  return text;
}

export default function HomePage() {
  const { identity, engineering_philosophy, technical_scope } = profile;

  const heroStyle = site.design?.hero_background_image
    ? { '--hero-bg': `url(${site.design.hero_background_image})` }
    : undefined;

  const attentionText = useTypewriter([
    identity.engineering_identity,
    technical_scope.primary_strengths[0],
    technical_scope.primary_strengths[1]
  ]);

  return (
    <Box className={styles.page}>
      <Card variant="outlined" className={styles.hero} style={heroStyle}>
        <Box className={styles.heroOverlay}>
          <Stack spacing={2.2} className={styles.fadeUp}>
            <Chip label="Available for full-time and freelance roles" color="primary" sx={{ alignSelf: 'flex-start' }} />

            <Typography variant="h1">{identity.name}</Typography>

            <Typography variant="h3" color="text.secondary" className={styles.typingRow}>
              <span className={styles.typingText}>{attentionText}</span>
              <span className={styles.cursor} aria-hidden="true">|</span>
            </Typography>

            <Typography variant="body1" className={styles.heroLead}>
              {identity.positioning}
            </Typography>

            <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 840 }}>
              {identity.core_trait}.
            </Typography>

            <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" className={styles.tags}>
              <Chip label={`Based in ${identity.location}`} variant="outlined" />
              {identity.availability?.remote && <Chip label="Remote-ready" variant="outlined" />}
              {identity.availability?.full_time && <Chip label="Open to full-time" variant="outlined" />}
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
        </Box>
      </Card>

      <Box className={styles.tileGrid}>
        <Box className={styles.leftTiles}>
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

        <Card variant="outlined" className={styles.profileTile}>
          <CardContent>
            <Stack spacing={2}>
              <Avatar src={avatar} alt={identity.name} className={styles.heroAvatar} />
              <Box>
                <Typography variant="h3">{identity.primary_title}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.8 }}>
                  {engineering_philosophy.problem_solving_style[0]}
                </Typography>
              </Box>

              <Box>
                <Typography variant="overline" color="text.secondary">
                  Operating philosophy
                </Typography>
                <Stack spacing={0.75} sx={{ mt: 0.6 }}>
                  {engineering_philosophy.problem_solving_style.slice(0, 3).map((point) => (
                    <Typography key={point} variant="body2">
                      • {point}
                    </Typography>
                  ))}
                </Stack>
              </Box>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}

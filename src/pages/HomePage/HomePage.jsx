import React from 'react';
import { useNavigate } from 'react-router-dom';
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
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';

import profile from '../../content/profile.json';
import resume from '../../content/resume.json';
import site from '../../content/site.json';
import avatar from '../../assets/avatar-placeholder.svg';

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

function ProofCard({ label, value, helper, qualitative = false }) {
  return (
    <Card variant="outlined" className={styles.proofCard}>
      <CardContent>
        <Stack spacing={0.8}>
          <Typography variant="overline" color="text.secondary">
            {qualitative ? 'Qualitative proof' : 'Quantified signal'}
          </Typography>
          <Typography variant="h3">{value}</Typography>
          <Typography variant="subtitle2">{label}</Typography>
          {helper && (
            <Typography variant="body2" color="text.secondary">
              {helper}
            </Typography>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}

function openExternal(url) {
  window.location.assign(url);
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = React.useState(false);

  React.useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  return reduced;
}

function useTypewriter(phrases, speed = 44, hold = 1700) {
  const reducedMotion = usePrefersReducedMotion();
  const cleanPhrases = React.useMemo(() => phrases.filter(Boolean), [phrases]);

  const [text, setText] = React.useState(cleanPhrases[0] ?? '');
  const [index, setIndex] = React.useState(0);
  const [deleting, setDeleting] = React.useState(false);
  const [charIndex, setCharIndex] = React.useState(cleanPhrases[0]?.length ?? 0);

  React.useEffect(() => {
    if (!cleanPhrases.length) return;

    if (reducedMotion) {
      setText(cleanPhrases[0]);
      return;
    }

    const full = cleanPhrases[index % cleanPhrases.length];

    const timeout = window.setTimeout(
      () => {
        if (!deleting && charIndex === full.length) {
          setDeleting(true);
          return;
        }

        if (deleting && charIndex === 0) {
          setDeleting(false);
          setIndex((prev) => (prev + 1) % cleanPhrases.length);
          return;
        }

        setCharIndex((prev) => prev + (deleting ? -1 : 1));
      },
      !deleting && charIndex === full.length ? hold : deleting ? speed * 0.72 : speed
    );

    return () => window.clearTimeout(timeout);
  }, [charIndex, cleanPhrases, deleting, hold, index, reducedMotion, speed]);

  React.useEffect(() => {
    if (!cleanPhrases.length || reducedMotion) return;
    const full = cleanPhrases[index % cleanPhrases.length];
    setText(full.slice(0, charIndex));
  }, [charIndex, cleanPhrases, index, reducedMotion]);

  return text;
}

function monthDiff(startYm, endYm) {
  const [startY, startM] = startYm.split('-').map(Number);
  const startDate = new Date(Date.UTC(startY, startM - 1, 1));
  const endDate = endYm === 'Present'
    ? new Date()
    : new Date(Date.UTC(Number(endYm.split('-')[0]), Number(endYm.split('-')[1]) - 1, 1));

  return (endDate.getUTCFullYear() - startDate.getUTCFullYear()) * 12 + (endDate.getUTCMonth() - startDate.getUTCMonth());
}

export default function HomePage() {
  const navigate = useNavigate();
  const { identity, engineering_philosophy, technical_scope, signature_projects } = profile;

  const heroStyle = site.design?.hero_background_image
    ? { '--hero-bg': `url(${site.design.hero_background_image})` }
    : undefined;

  const attentionText = useTypewriter([
    identity.engineering_identity,
    technical_scope.primary_strengths[0],
    technical_scope.primary_strengths[1],
    technical_scope.primary_strengths[2]
  ]);

  const totalMonths = resume.experience.reduce((sum, job) => sum + monthDiff(job.start, job.end), 0);
  const years = Math.max(1, Math.floor(totalMonths / 12));

  const quantifiedProof = [
    {
      label: 'Years of production software delivery',
      value: `${years}+ years`,
      helper: 'Calculated from listed experience timeline.'
    },
    {
      label: 'Signature case studies',
      value: `${Object.keys(signature_projects).length}`,
      helper: 'Portfolio case studies with architecture and delivery context.'
    },
    {
      label: 'Deadline-critical dual-platform launch',
      value: '1 week',
      helper: 'AWTAR / KSRTC Android + iOS delivery window.'
    }
  ];

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
              <Button variant="outlined" startIcon={<DescriptionRoundedIcon />} onClick={() => navigate('/resume')}>
                Review resume
              </Button>
              <Button variant="text" onClick={() => openExternal(site.contact.linkedin)}>
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

          <Card variant="outlined">
            <CardContent>
              <Typography variant="h3" sx={{ mb: 1.4 }}>
                Impact and proof
              </Typography>
              <Box className={styles.proofGrid}>
                {quantifiedProof.map((item) => (
                  <ProofCard key={item.label} label={item.label} value={item.value} helper={item.helper} />
                ))}
                <ProofCard
                  label="Production reliability improvement"
                  value="Strong qualitative evidence"
                  helper="Source data confirms significant stability gains, but no numeric KPI baseline is currently documented."
                  qualitative
                />
              </Box>
            </CardContent>
          </Card>
        </Box>

        <Card variant="outlined" className={styles.profileTile}>
          <CardContent>
            <Stack spacing={2}>
              <Avatar
                src={avatar}
                alt={identity.name}
                className={styles.heroAvatar}
                imgProps={{ loading: 'lazy', decoding: 'async' }}
              />
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

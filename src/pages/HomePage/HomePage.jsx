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
import primaryPhoto from '../../assets/profile/prateek-primary.jpg';

import styles from './HomePage.module.scss';

function MetricCard({ label, value, detail }) {
  return (
    <Card variant="outlined" className={styles.metricCard}>
      <CardContent>
        <Typography variant="h3">{value}</Typography>
        <Typography variant="subtitle2" sx={{ mt: 0.6 }}>
          {label}
        </Typography>
        {detail && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.8 }}>
            {detail}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}

function openExternal(url) {
  window.location.assign(url);
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
  const { identity, signature_projects } = profile;

  const heroStyle = site.design?.hero_background_image
    ? { '--hero-bg': `url(${site.design.hero_background_image})` }
    : undefined;

  const totalMonths = resume.experience.reduce((sum, job) => sum + monthDiff(job.start, job.end), 0);
  const years = Math.max(1, Math.floor(totalMonths / 12));

  const metrics = [
    {
      label: 'Production delivery experience',
      value: `${years}+ years`,
      detail: 'Based on listed engineering experience from 2019 to present.'
    },
    {
      label: 'Documented case studies',
      value: `${Object.keys(signature_projects).length}`,
      detail: 'Each project includes context, architecture choices, and outcomes.'
    },
    {
      label: 'Government mobile launch window',
      value: '1 week',
      detail: 'Delivered Android and iOS for AWTAR / KSRTC within deadline.'
    }
  ];

  const capabilities = [
    'React frontend architecture for workflow-heavy products',
    'API contract and client-boundary design with backend teams',
    'Performance and reliability improvements through targeted refactoring',
    'Reusable platform design for multi-tenant and white-label delivery',
    'Release coordination across planning, code review, and production support',
    'Mobile delivery strategy using React Native and pragmatic architecture decisions'
  ];

  const outcomes = [
    resume.selected_projects[0].impact,
    resume.selected_projects[1].impact,
    resume.selected_projects[2].impact
  ];

  return (
    <Box className={styles.page}>
      <Card variant="outlined" className={styles.hero} style={heroStyle}>
        <Box className={styles.heroOverlay}>
          <Box className={styles.heroContent}>
            <Stack spacing={2.2} className={styles.fadeUp}>
              <Chip label="Open to full-time and freelance engineering roles" color="primary" sx={{ alignSelf: 'flex-start' }} />

              <Typography variant="h1">{identity.name}</Typography>

              <Typography variant="h2" className={styles.headline}>
                Senior Software Engineer — React Architecture, API Integration, Production Delivery
              </Typography>

              <Typography variant="body1" className={styles.heroLead}>
                Role fit: {resume.summary[0]}
              </Typography>

              <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 880 }}>
                Business value: Helps teams ship faster and with lower maintenance overhead by improving frontend structure,
                API alignment, and release reliability.
              </Typography>

              <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" className={styles.tags}>
                <Chip label={`Based in ${identity.location}`} variant="outlined" />
                {identity.availability?.remote && <Chip label="Remote-ready" variant="outlined" />}
                {identity.availability?.full_time && <Chip label="Available for full-time" variant="outlined" />}
              </Stack>

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.2}>
                <Button variant="contained" endIcon={<ArrowOutwardRoundedIcon />} onClick={() => openExternal(`mailto:${site.contact.email}`)}>
                  Contact for hiring
                </Button>
                <Button variant="outlined" startIcon={<DescriptionRoundedIcon />} onClick={() => navigate('/resume')}>
                  Review resume
                </Button>
                <Button variant="text" onClick={() => navigate('/projects')}>
                  View project outcomes
                </Button>
              </Stack>
            </Stack>

            <Box className={styles.photoWrap}>
              <Avatar
                src={primaryPhoto}
                alt={identity.name}
                className={styles.profilePhoto}
                imgProps={{ loading: 'lazy', decoding: 'async' }}
              />
            </Box>
          </Box>
        </Box>
      </Card>

      <Card variant="outlined">
        <CardContent>
          <Typography variant="h3" sx={{ mb: 1.2 }}>
            Quick proof points
          </Typography>
          <Box className={styles.metricGrid}>
            {metrics.map((item) => (
              <MetricCard key={item.label} label={item.label} value={item.value} detail={item.detail} />
            ))}
          </Box>
        </CardContent>
      </Card>

      <Box className={styles.tileGrid}>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h3" sx={{ mb: 1.2 }}>
              Top capabilities
            </Typography>
            <Stack spacing={0.9}>
              {capabilities.map((item) => (
                <Typography key={item} variant="body2">
                  • {item}
                </Typography>
              ))}
            </Stack>
            <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" sx={{ mt: 1.8 }}>
              {resume.core_skills.slice(0, 10).map((skill) => (
                <Chip key={skill} label={skill} />
              ))}
            </Stack>
          </CardContent>
        </Card>

        <Card variant="outlined">
          <CardContent>
            <Typography variant="h3" sx={{ mb: 1.2 }}>
              Selected outcomes
            </Typography>
            <Stack spacing={1.2}>
              {outcomes.map((outcome) => (
                <Typography key={outcome} variant="body2" color="text.secondary">
                  • {outcome}
                </Typography>
              ))}
            </Stack>

            <Typography variant="h3" sx={{ mt: 2.2, mb: 1.1 }}>
              Hiring CTA
            </Typography>
            <Typography variant="body2" color="text.secondary">
              If your team needs a senior engineer for React architecture, API coordination, and reliable delivery,
              use the contact page or email directly.
            </Typography>
            <Button variant="contained" sx={{ mt: 1.4 }} onClick={() => navigate('/contact')}>
              Go to contact details
            </Button>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}

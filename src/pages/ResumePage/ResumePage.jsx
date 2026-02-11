import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Divider,
  Stack,
  Typography,
  Chip
} from '@mui/material';

import resume from '../../content/resume.json';

import styles from './ResumePage.module.scss';

function Section({ title, children, className }) {
  return (
    <Card
      variant="outlined"
      className={className}
      sx={{ borderColor: 'rgba(255,255,255,0.12)' }}
    >
      <CardContent>
        <Stack spacing={1.5}>
          <Typography variant="h6" sx={{ fontWeight: 800 }}>
            {title}
          </Typography>
          <Divider sx={{ borderColor: 'rgba(255,255,255,0.10)' }} />
          {children}
        </Stack>
      </CardContent>
    </Card>
  );
}

function ymLabel(ym) {
  if (!ym) return '';
  const [y, m] = ym.split('-');
  const month = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ][Number(m) - 1];
  return `${month} ${y}`;
}

export default function ResumePage() {
  return (
    <Box>
      <Box className={styles.header}>
        <Typography variant="h4" sx={{ fontWeight: 800 }}>
          Resume
        </Typography>
        <Typography variant="body1" color="text.secondary">
          ATS-friendly profile tailored for senior frontend and systems-oriented software roles.
        </Typography>
      </Box>

      <Box className={styles.grid}>
        <Section title="Summary" className={styles.card}>
          <Stack spacing={1}>
            {resume.summary.map((s) => (
              <Typography key={s} variant="body2" color="text.secondary">
                {s}
              </Typography>
            ))}
          </Stack>
        </Section>

        <Section title="Core skills" className={styles.card}>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {resume.core_skills.map((s) => (
              <Chip key={s} label={s} variant="outlined" />
            ))}
          </Stack>
        </Section>

        <Section title="Experience" className={styles.full}>
          <Stack spacing={2}>
            {resume.experience.map((job) => (
              <Box key={`${job.company}-${job.role}`}>
                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  spacing={1}
                  justifyContent="space-between"
                >
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>
                      {job.role} — {job.company}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {job.location}
                    </Typography>
                  </Box>

                  <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: 'nowrap' }}>
                    {ymLabel(job.start)} — {job.end === 'Present' ? 'Present' : ymLabel(job.end)}
                  </Typography>
                </Stack>

                <Stack spacing={0.75} sx={{ mt: 1.25 }}>
                  {job.highlights.map((b) => (
                    <Typography key={b} variant="body2">
                      • {b}
                    </Typography>
                  ))}
                </Stack>

                {job.stack?.length ? (
                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mt: 1.25 }}>
                    {job.stack.map((t) => (
                      <Chip key={t} label={t} size="small" />
                    ))}
                  </Stack>
                ) : null}

                <Divider sx={{ mt: 2, borderColor: 'rgba(255,255,255,0.10)' }} />
              </Box>
            ))}
          </Stack>
        </Section>

        <Section title="Education" className={styles.card}>
          <Stack spacing={1}>
            {resume.education.map((e) => (
              <Box key={e.school}>
                <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>
                  {e.degree}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {e.school} ({e.start}–{e.end})
                </Typography>
              </Box>
            ))}
          </Stack>
        </Section>

        <Section title="Certifications" className={styles.card}>
          <Stack spacing={0.75}>
            {resume.certifications.map((c) => (
              <Typography key={c} variant="body2">
                • {c}
              </Typography>
            ))}
          </Stack>
        </Section>

        <Section title="Languages" className={styles.card}>
          <Stack spacing={0.75}>
            {resume.languages.map((l) => (
              <Typography key={l.name} variant="body2">
                • {l.name} — {l.level}
              </Typography>
            ))}
          </Stack>
        </Section>
      </Box>
    </Box>
  );
}

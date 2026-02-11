import React from 'react';
import { Box, Card, CardContent, Chip, Divider, Stack, Typography } from '@mui/material';

import resume from '../../content/resume.json';

import styles from './ResumePage.module.scss';

function ymLabel(ym) {
  if (!ym) return '';
  const [y, m] = ym.split('-');
  const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][Number(m) - 1];
  return `${month} ${y}`;
}

function skillGroups(skills) {
  return {
    'Frontend': skills.filter((s) => /React|Redux|JavaScript|HTML|CSS|Responsive|Performance/i.test(s)),
    'API & Backend Collaboration': skills.filter((s) => /REST|PHP|MySQL|boundary/i.test(s)),
    'DevOps & Delivery': skills.filter((s) => /Apache|Nginx|AWS|Linux|CI\/CD/i.test(s))
  };
}

export default function ResumePage() {
  const grouped = skillGroups(resume.core_skills);

  return (
    <Box className={styles.page}>
      <Box className={styles.header}>
        <Typography variant="h2">Resume overview</Typography>
        <Typography variant="body1" color="text.secondary">
          Experience and skills organized for fast hiring review while staying ATS-friendly.
        </Typography>
      </Box>

      <Box className={styles.grid}>
        <Card variant="outlined" className={styles.summaryCard}>
          <CardContent>
            <Typography variant="h3" sx={{ mb: 1.25 }}>Professional summary</Typography>
            <Stack spacing={0.75}>
              {resume.summary.map((line) => (
                <Typography key={line} variant="body2" color="text.secondary">
                  • {line}
                </Typography>
              ))}
            </Stack>
          </CardContent>
        </Card>

        <Card variant="outlined" className={styles.summaryCard}>
          <CardContent>
            <Typography variant="h3" sx={{ mb: 1.25 }}>Availability</Typography>
            <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
              {resume.availability?.full_time && <Chip label="Full-time" color="primary" />}
              {resume.availability?.freelance && <Chip label="Freelance" color="secondary" />}
              {resume.availability?.remote && <Chip label="Remote" variant="outlined" />}
            </Stack>
          </CardContent>
        </Card>

        <Card variant="outlined" className={styles.full}>
          <CardContent>
            <Typography variant="h3" sx={{ mb: 2 }}>Experience timeline</Typography>
            <Box className={styles.timeline}>
              {resume.experience.map((job, index) => (
                <Box key={`${job.company}-${job.role}`} className={styles.timelineItem}>
                  <Box className={styles.dot} aria-hidden="true" />
                  <Box>
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} justifyContent="space-between">
                      <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 760 }}>
                          {job.role}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {job.company} • {job.location}
                        </Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: 'nowrap' }}>
                        {ymLabel(job.start)} — {job.end === 'Present' ? 'Present' : ymLabel(job.end)}
                      </Typography>
                    </Stack>

                    <Stack spacing={0.7} sx={{ mt: 1.1 }}>
                      {job.highlights.map((point) => (
                        <Typography key={point} variant="body2">
                          • {point}
                        </Typography>
                      ))}
                    </Stack>

                    <Stack direction="row" spacing={0.8} useFlexGap flexWrap="wrap" sx={{ mt: 1.1 }}>
                      {job.stack.map((tech) => (
                        <Chip key={tech} label={tech} size="small" variant="outlined" />
                      ))}
                    </Stack>

                    {index !== resume.experience.length - 1 && <Divider sx={{ mt: 2.1, borderColor: 'rgba(255,255,255,0.1)' }} />}
                  </Box>
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>

        <Card variant="outlined" className={styles.full}>
          <CardContent>
            <Typography variant="h3" sx={{ mb: 1.25 }}>Skill groups</Typography>
            <Box className={styles.skillGroups}>
              {Object.entries(grouped).map(([groupName, list]) => (
                <Box key={groupName}>
                  <Typography variant="subtitle2" sx={{ mb: 1 }}>{groupName}</Typography>
                  <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                    {list.map((skill) => (
                      <Chip key={skill} label={skill} />
                    ))}
                  </Stack>
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>

        <Card variant="outlined">
          <CardContent>
            <Typography variant="h3" sx={{ mb: 1.2 }}>Education</Typography>
            {resume.education.map((edu) => (
              <Box key={edu.school}>
                <Typography variant="subtitle1">{edu.degree}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {edu.school} ({edu.start}–{edu.end})
                </Typography>
              </Box>
            ))}
          </CardContent>
        </Card>

        <Card variant="outlined">
          <CardContent>
            <Typography variant="h3" sx={{ mb: 1.2 }}>Certifications & languages</Typography>
            <Stack spacing={0.7}>
              {resume.certifications.map((cert) => (
                <Typography key={cert} variant="body2">• {cert}</Typography>
              ))}
            </Stack>
            <Divider sx={{ my: 1.3, borderColor: 'rgba(255,255,255,0.1)' }} />
            <Stack spacing={0.7}>
              {resume.languages.map((lang) => (
                <Typography key={lang.name} variant="body2">• {lang.name} — {lang.level}</Typography>
              ))}
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}

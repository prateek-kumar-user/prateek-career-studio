import React from 'react';
import { Box, Card, CardContent, Chip, Divider, Stack, Typography } from '@mui/material';

import profile from '../../content/profile.json';

import styles from './ProjectsPage.module.scss';

function StorySection({ label, items, emphasize = false }) {
  if (!items?.length) return null;

  return (
    <Box>
      <Typography variant="overline" color="text.secondary">
        {label}
      </Typography>
      <Stack spacing={0.75} sx={{ mt: 0.4 }}>
        {items.map((item) => (
          <Typography key={item} variant={emphasize ? 'body1' : 'body2'}>
            • {item}
          </Typography>
        ))}
      </Stack>
    </Box>
  );
}

function ProjectBlock({ title, project }) {
  const challenge = [project.context, project.scope].filter(Boolean);
  const action = [project.core_shift, project.judgment_call, ...(project.decisions ?? [])].filter(Boolean);
  const result = [...(project.outcomes ?? []), ...(project.result ?? [])].filter(Boolean);

  return (
    <Card variant="outlined" className={styles.card}>
      <CardContent>
        <Stack spacing={1.5}>
          <Box className={styles.titleRow}>
            <Typography variant="h3">{title}</Typography>
            {project.status && <Chip size="small" label={project.status} color="primary" variant="outlined" />}
          </Box>

          {project.system_role && (
            <Typography variant="body2" color="text.secondary">
              <strong>Ownership:</strong> {project.system_role}
            </Typography>
          )}

          <Box className={styles.scanRow}>
            <Chip size="small" label={`${action.length || 1} key decisions`} variant="outlined" />
            <Chip size="small" label={`${result.length || 1} delivery outcomes`} variant="outlined" />
            {project.durability && <Chip size="small" label="Durable architecture" color="secondary" variant="outlined" />}
          </Box>

          <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />

          <StorySection label="Challenge" items={challenge} />
          <StorySection label="Action" items={action} emphasize />
          <StorySection label="Result" items={result} />

          {project.durability && (
            <Typography variant="body2" color="text.secondary">
              <strong>Durability signal:</strong> {project.durability}
            </Typography>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}

export default function ProjectsPage() {
  const projects = profile.signature_projects;

  return (
    <Box className={styles.page}>
      <Box className={styles.header}>
        <Typography variant="h2">Selected projects</Typography>
        <Typography variant="body1" color="text.secondary">
          Case studies written in a challenge → action → result format for fast recruiter and hiring manager review.
        </Typography>
      </Box>

      <Box className={styles.grid}>
        <ProjectBlock title="Cargo Web Modernization" project={projects.cargo_web} />
        <ProjectBlock title="Platform Consolidation System" project={projects.platform_consolidation} />
        <ProjectBlock title="AWTAR / KSRTC Launch" project={projects.awtar_ksrtc} />
      </Box>
    </Box>
  );
}

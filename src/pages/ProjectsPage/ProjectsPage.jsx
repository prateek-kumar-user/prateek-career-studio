import React from 'react';
import { Box, Card, CardContent, Divider, Stack, Typography } from '@mui/material';

import profile from '../../content/profile.json';

import styles from './ProjectsPage.module.scss';

function BulletList({ title, items }) {
  if (!items?.length) return null;

  return (
    <>
      <Divider sx={{ borderColor: 'rgba(255,255,255,0.10)' }} />
      <Box>
        <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>
          {title}
        </Typography>
        <Stack spacing={0.5} sx={{ mt: 1 }}>
          {items.map((t) => (
            <Typography key={t} variant="body2">
              • {t}
            </Typography>
          ))}
        </Stack>
      </Box>
    </>
  );
}

function ProjectCard({ title, project }) {
  return (
    <Card
      variant="outlined"
      className={styles.card}
      sx={{ borderColor: 'rgba(255,255,255,0.12)' }}
    >
      <CardContent>
        <Stack spacing={1.5}>
          <Typography variant="h6" sx={{ fontWeight: 800 }}>
            {title}
          </Typography>

          {project.context && (
            <Typography variant="body2" color="text.secondary">
              {project.context}
            </Typography>
          )}

          {project.core_shift && <Typography variant="body1">{project.core_shift}</Typography>}
          {project.judgment_call && <Typography variant="body1">{project.judgment_call}</Typography>}

          {project.system_role && (
            <Typography variant="body2" color="text.secondary">
              Role: {project.system_role}
            </Typography>
          )}

          {project.scope && (
            <Typography variant="body2" color="text.secondary">
              Scope: {project.scope}
            </Typography>
          )}

          <BulletList title="Decisions" items={project.decisions} />
          <BulletList title="Outcomes" items={project.outcomes} />
          <BulletList title="Result" items={project.result} />

          {project.status && (
            <Typography variant="caption" color="text.secondary">
              Status: {project.status}
            </Typography>
          )}

          {project.durability && (
            <Typography variant="caption" color="text.secondary">
              Durability: {project.durability}
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
    <Box>
      <Box className={styles.header}>
        <Typography variant="h4" sx={{ fontWeight: 800 }}>
          Projects
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Case studies focused on system boundaries, durability, and operational clarity.
        </Typography>
      </Box>

      <Box sx={{ mt: 2 }} className={styles.grid}>
        <ProjectCard title="Cargo Web" project={projects.cargo_web} />
        <ProjectCard title="Platform Consolidation" project={projects.platform_consolidation} />
        <ProjectCard title="AWTAR / KSRTC" project={projects.awtar_ksrtc} />
      </Box>
    </Box>
  );
}

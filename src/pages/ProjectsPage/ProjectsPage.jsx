import React from 'react';
import { Box, Card, CardContent, Chip, Divider, Stack, Typography } from '@mui/material';

import profile from '../../content/profile.json';

import styles from './ProjectsPage.module.scss';

function ProjectBlock({ title, project }) {
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
              <strong>Role:</strong> {project.system_role}
            </Typography>
          )}

          {project.scope && (
            <Typography variant="body2" color="text.secondary">
              <strong>Scope:</strong> {project.scope}
            </Typography>
          )}

          {project.context && <Typography variant="body2" color="text.secondary">{project.context}</Typography>}
          {project.core_shift && <Typography variant="body1">{project.core_shift}</Typography>}
          {project.judgment_call && <Typography variant="body1">{project.judgment_call}</Typography>}

          <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />

          {project.decisions?.length ? (
            <Box>
              <Typography variant="overline" color="text.secondary">
                Technical decisions
              </Typography>
              <Stack spacing={0.75} sx={{ mt: 0.4 }}>
                {project.decisions.map((d) => (
                  <Typography key={d} variant="body2">
                    • {d}
                  </Typography>
                ))}
              </Stack>
            </Box>
          ) : null}

          {project.outcomes?.length ? (
            <Box>
              <Typography variant="overline" color="text.secondary">
                Outcomes
              </Typography>
              <Stack spacing={0.75} sx={{ mt: 0.4 }}>
                {project.outcomes.map((o) => (
                  <Typography key={o} variant="body2">
                    • {o}
                  </Typography>
                ))}
              </Stack>
            </Box>
          ) : null}

          {project.result?.length ? (
            <Box>
              <Typography variant="overline" color="text.secondary">
                Delivery result
              </Typography>
              <Stack spacing={0.75} sx={{ mt: 0.4 }}>
                {project.result.map((r) => (
                  <Typography key={r} variant="body2">
                    • {r}
                  </Typography>
                ))}
              </Stack>
            </Box>
          ) : null}

          {project.durability && (
            <Typography variant="body2" color="text.secondary">
              <strong>Durability:</strong> {project.durability}
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
          Case studies focused on architecture ownership, implementation choices, and measurable delivery outcomes.
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

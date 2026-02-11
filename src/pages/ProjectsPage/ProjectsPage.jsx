import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Stack,
  Typography
} from '@mui/material';

import profile from '../../content/profile.json';

import styles from './ProjectsPage.module.scss';

const PROJECT_PRESENTATION = {
  cargo_web: {
    title: 'Cargo Web Modernization Program',
    subtitle: 'Legacy desktop-to-web migration for production logistics workflow',
    visualSlots: [
      {
        src: '/projects/cargo-web/screenshot-operations-dashboard.png',
        caption: 'Operations dashboard and workflow execution surface',
        fallbackLabel: 'Drop dashboard screenshot here'
      },
      {
        src: '/projects/cargo-web/diagram-api-boundary.png',
        caption: 'Client-to-API boundary and request orchestration diagram',
        fallbackLabel: 'Drop API boundary diagram here'
      }
    ]
  },
  platform_consolidation: {
    title: 'Platform Consolidation Initiative',
    subtitle: 'Unified architecture for website builder, booking, payment, and mobile delivery',
    visualSlots: [
      {
        src: '/projects/platform-consolidation/screenshot-admin-workflow.png',
        caption: 'Shared administration workflow across consolidated modules',
        fallbackLabel: 'Drop admin workflow screenshot here'
      },
      {
        src: '/projects/platform-consolidation/diagram-platform-modules.png',
        caption: 'Reusable platform modules and shared release pipeline',
        fallbackLabel: 'Drop platform module diagram here'
      }
    ]
  },
  awtar_ksrtc: {
    title: 'AWTAR / KSRTC Delivery Program',
    subtitle: 'Deadline-critical cross-platform mobile release for government timeline',
    visualSlots: [
      {
        src: '/projects/awtar-ksrtc/screenshot-mobile-webview.png',
        caption: 'Cross-platform mobile interface delivered with React Native wrapper',
        fallbackLabel: 'Drop mobile UI screenshot here'
      },
      {
        src: '/projects/awtar-ksrtc/diagram-delivery-plan.png',
        caption: 'One-week execution plan for Android and iOS launch',
        fallbackLabel: 'Drop delivery plan diagram here'
      }
    ]
  }
};

function StorySection({ label, items }) {
  if (!items?.length) return null;

  return (
    <Box>
      <Typography variant="overline" color="text.secondary" className={styles.sectionLabel}>
        {label}
      </Typography>
      <Stack spacing={0.65} sx={{ mt: 0.45 }}>
        {items.map((item) => (
          <Typography key={item} variant="body2">
            • {item}
          </Typography>
        ))}
      </Stack>
    </Box>
  );
}

function ProjectVisualSlot({ slot }) {
  const [hasError, setHasError] = React.useState(false);

  return (
    <figure className={styles.visualSlot}>
      {!hasError ? (
        <img
          src={slot.src}
          alt={slot.caption}
          loading="lazy"
          decoding="async"
          onError={() => setHasError(true)}
        />
      ) : (
        <div className={styles.visualFallback}>
          <img
            src="/projects/placeholders/project-visual-placeholder.svg"
            alt="Project visual placeholder"
          />
          <Typography variant="caption" color="text.secondary">
            {slot.fallbackLabel}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Expected file: <code>{slot.src.replace(/^\//, 'public/')}</code>
          </Typography>
        </div>
      )}
      <figcaption>{slot.caption}</figcaption>
    </figure>
  );
}

function ProjectBlock({ projectKey, project }) {
  const presentation = PROJECT_PRESENTATION[projectKey];
  const challenge = [project.context, project.scope].filter(Boolean);
  const decisions = [project.core_shift, project.judgment_call, ...(project.decisions ?? [])].filter(Boolean);
  const outcomes = [...(project.outcomes ?? []), ...(project.result ?? [])].filter(Boolean);

  return (
    <Card variant="outlined" className={styles.card}>
      <CardContent>
        <Stack spacing={1.6}>
          <Box className={styles.titleRow}>
            <Box>
              <Typography variant="h3">{presentation.title}</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.25 }}>
                {presentation.subtitle}
              </Typography>
            </Box>
            {project.status && <Chip size="small" label={project.status} color="primary" variant="outlined" />}
          </Box>

          {project.system_role && (
            <Typography variant="body2" color="text.secondary">
              <strong>Role scope:</strong> {project.system_role}
            </Typography>
          )}

          <Box className={styles.scanRow}>
            <Chip size="small" label={`${decisions.length || 1} architectural decisions`} variant="outlined" />
            <Chip size="small" label={`${outcomes.length || 1} delivery outcomes`} variant="outlined" />
            {project.durability && <Chip size="small" label="Long-term production durability" color="secondary" variant="outlined" />}
          </Box>

          <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />

          <Box className={styles.detailGrid}>
            <StorySection label="Business and delivery context" items={challenge} />
            <StorySection label="Technical strategy" items={decisions} />
            <StorySection label="Execution outcomes" items={outcomes} />
          </Box>

          {project.durability && (
            <Typography variant="body2" color="text.secondary">
              <strong>Durability signal:</strong> {project.durability}
            </Typography>
          )}

          <Box>
            <Typography variant="overline" color="text.secondary" className={styles.sectionLabel}>
              Visual evidence (screenshots and workflow diagrams)
            </Typography>
            <Box className={styles.visualGrid}>
              {presentation.visualSlots.map((slot) => (
                <ProjectVisualSlot key={slot.src} slot={slot} />
              ))}
            </Box>
          </Box>
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
        <Typography variant="h2">Project portfolio highlights</Typography>
        <Typography variant="body1" color="text.secondary">
          Recruiter and hiring-manager oriented case studies grounded in canonical project stories: context, technical decisions, and measurable delivery outcomes.
        </Typography>
      </Box>

      <Box className={styles.grid}>
        <ProjectBlock projectKey="cargo_web" project={projects.cargo_web} />
        <ProjectBlock projectKey="platform_consolidation" project={projects.platform_consolidation} />
        <ProjectBlock projectKey="awtar_ksrtc" project={projects.awtar_ksrtc} />
      </Box>
    </Box>
  );
}

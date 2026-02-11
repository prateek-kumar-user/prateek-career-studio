import React from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Stack,
  Typography
} from '@mui/material';
import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded';
import { useNavigate } from 'react-router-dom';

import profile from '../../content/profile.json';
import projectStories from '../../../data-bank/project-stories.json';

import styles from './ProjectsPage.module.scss';

const PROJECT_PRESENTATION = {
  cargo_web: {
    title: 'Cargo Web Modernization Program',
    subtitle: 'Desktop-to-web migration for nationwide logistics workflows',
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
    subtitle: 'Unified architecture for booking, payments, and delivery surfaces',
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

const storyMap = Object.fromEntries(projectStories.project_stories.map((story) => [story.id, story]));

function StorySection({ label, items }) {
  if (!items?.length) return null;

  return (
    <Box className={styles.storySection}>
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

function resolveStory(projectKey) {
  if (projectKey === 'cargo_web') return storyMap['cargo-web'];
  if (projectKey === 'platform_consolidation') return storyMap['platform-consolidation'];
  if (projectKey === 'awtar_ksrtc') return storyMap['awtar-ksrtc'];
  return undefined;
}

function ProjectBlock({ projectKey, project, onDiscuss }) {
  const presentation = PROJECT_PRESENTATION[projectKey];
  const story = resolveStory(projectKey);
  const challenge = [project.context, project.scope, story?.problem].filter(Boolean);
  const decisions = [project.core_shift, project.judgment_call, ...(project.decisions ?? []), ...(story?.actions ?? [])].filter(Boolean);
  const outcomes = [...(project.outcomes ?? []), ...(project.result ?? []), ...(story?.outcomes ?? [])].filter(Boolean);

  return (
    <Card variant="outlined" className={styles.card}>
      <CardContent>
        <Stack spacing={1.8}>
          <Box className={styles.titleRow}>
            <Box>
              <Typography variant="h3">{presentation.title}</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.25 }}>
                {presentation.subtitle}
              </Typography>
            </Box>
            {project.status && <Chip size="small" label={project.status} color="primary" className={styles.badgeChip} />}
          </Box>

          {story?.elevator_pitch && (
            <Typography variant="body2" className={styles.elevatorPitch}>
              {story.elevator_pitch}
            </Typography>
          )}

          {project.system_role && (
            <Typography variant="body2" color="text.secondary">
              <strong>Role:</strong> {project.system_role}
            </Typography>
          )}

          <Box className={styles.scanRow}>
            <Chip size="small" label={`${decisions.length || 1} technical decisions`} className={styles.infoChip} />
            <Chip size="small" label={`${outcomes.length || 1} outcomes`} className={styles.infoChip} />
            {project.durability && <Chip size="small" label="Long-term durability" className={styles.infoChip} />}
            {story?.best_for_roles?.[0] && <Chip size="small" label={`Best fit: ${story.best_for_roles[0]}`} className={styles.infoChip} />}
          </Box>

          <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />

          <Box className={styles.detailGrid}>
            <StorySection label="Context" items={challenge} />
            <StorySection label="Approach" items={decisions} />
            <StorySection label="Results" items={outcomes} />
          </Box>

          {project.durability && (
            <Typography variant="body2" color="text.secondary">
              <strong>Durability:</strong> {project.durability}
            </Typography>
          )}

          <Box>
            <Typography variant="overline" color="text.secondary" className={styles.sectionLabel}>
              Visual evidence (screenshots + diagrams)
            </Typography>
            <Box className={styles.visualGrid}>
              {presentation.visualSlots.map((slot) => (
                <ProjectVisualSlot key={slot.src} slot={slot} />
              ))}
            </Box>
          </Box>

          <Button
            variant="outlined"
            endIcon={<ArrowOutwardRoundedIcon />}
            className={styles.discussButton}
            onClick={onDiscuss}
          >
            Discuss a similar architecture challenge
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default function ProjectsPage() {
  const projects = profile.signature_projects;
  const navigate = useNavigate();

  return (
    <Box className={styles.page}>
      <Box className={styles.header}>
        <Typography variant="h2">Project case studies</Typography>
        <Typography variant="body1" color="text.secondary">
          Databank-grounded portfolio stories showing business context, architecture choices, and delivery outcomes.
        </Typography>
      </Box>

      <Card variant="outlined" className={styles.scanGuide}>
        <CardContent>
          <Typography variant="h3" sx={{ mb: 1.2 }}>How to scan these case studies quickly</Typography>
          <Stack spacing={0.8}>
            <Typography variant="body2" color="text.secondary">• Start with <strong>Context</strong> to see business constraints and scale.</Typography>
            <Typography variant="body2" color="text.secondary">• Use <strong>Approach</strong> to understand architecture and decision quality.</Typography>
            <Typography variant="body2" color="text.secondary">• Validate with <strong>Results</strong> and visual evidence for delivery credibility.</Typography>
          </Stack>
        </CardContent>
      </Card>

      <Box className={styles.grid}>
        <ProjectBlock projectKey="cargo_web" project={projects.cargo_web} onDiscuss={() => navigate('/contact')} />
        <ProjectBlock projectKey="platform_consolidation" project={projects.platform_consolidation} onDiscuss={() => navigate('/contact')} />
        <ProjectBlock projectKey="awtar_ksrtc" project={projects.awtar_ksrtc} onDiscuss={() => navigate('/contact')} />
      </Box>
    </Box>
  );
}

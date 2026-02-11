import React from 'react';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Stack,
  Typography
} from '@mui/material';

import profile from '../../content/profile.json';
import avatar from '../../assets/avatar.png';

import styles from './HomePage.module.scss';

function HighlightCard({ title, body }) {
  return (
    <Card variant="outlined" className={styles.card} sx={{ borderColor: 'rgba(255,255,255,0.12)' }}>
      <CardContent>
        <Stack spacing={1}>
          <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {body}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default function HomePage() {
  const { identity, engineering_philosophy, technical_scope } = profile;

  return (
    <Box>
      <Box className={styles.hero}>
        <Box>
          <Box className={styles.avatarWrap}>
            <Avatar
              src={avatar}
              alt={identity.name}
              sx={{ width: 84, height: 84, border: '1px solid rgba(255,255,255,0.18)' }}
            />
            <Box>
              <Typography variant="h3" sx={{ fontWeight: 800, lineHeight: 1.1 }}>
                {identity.name}
              </Typography>
              <Typography variant="h5" color="text.secondary" sx={{ mt: 0.5 }}>
                {identity.primary_title}
              </Typography>
            </Box>
          </Box>

          <Typography variant="body1" color="text.secondary" sx={{ mt: 2, maxWidth: 950 }}>
            {identity.positioning}
          </Typography>

          <Typography variant="body1" sx={{ mt: 1.5, maxWidth: 900 }}>
            {identity.core_trait}.
          </Typography>

          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mt: 2 }}>
            <Chip label={identity.engineering_identity} />
            <Chip label={identity.location} variant="outlined" />
            {identity.availability?.remote && <Chip label="Remote" variant="outlined" />}
            {identity.availability?.full_time && <Chip label="Full-time" variant="outlined" />}
            {identity.availability?.freelance && <Chip label="Freelance" variant="outlined" />}
          </Stack>
        </Box>

        <Card variant="outlined" sx={{ borderColor: 'rgba(255,255,255,0.12)' }}>
          <CardContent>
            <Stack spacing={1.5}>
              <Typography variant="h6" sx={{ fontWeight: 800 }}>
                How I work
              </Typography>
              <Divider sx={{ borderColor: 'rgba(255,255,255,0.10)' }} />
              <Typography variant="body2" color="text.secondary">
                {engineering_philosophy.problem_solving_style.join(' • ')}
              </Typography>
            </Stack>
          </CardContent>
        </Card>
      </Box>

      <Box className={styles.highlights}>
        <HighlightCard
          title="Frontend architecture"
          body={technical_scope.primary_strengths[0]}
        />
        <HighlightCard
          title="System boundaries"
          body={technical_scope.primary_strengths[1]}
        />
        <HighlightCard
          title="Workflow platforms"
          body={technical_scope.primary_strengths[2]}
        />
      </Box>
    </Box>
  );
}

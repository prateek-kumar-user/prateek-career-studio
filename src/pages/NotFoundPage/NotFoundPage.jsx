import React from 'react';
import { useNavigate, useRouteError } from 'react-router-dom';
import { Box, Button, Stack, Typography } from '@mui/material';

export default function NotFoundPage() {
  const navigate = useNavigate();
  const error = useRouteError();

  return (
    <Box sx={{ py: 6 }}>
      <Stack spacing={2}>
        <Typography variant="h4" sx={{ fontWeight: 800 }}>
          Page not found
        </Typography>

        {error?.statusText || error?.message ? (
          <Typography variant="body2" color="text.secondary">
            {error.statusText || error.message}
          </Typography>
        ) : null}

        <Box>
          <Button variant="contained" onClick={() => navigate('/')} sx={{ textTransform: 'none' }}>
            Go Home
          </Button>
        </Box>
      </Stack>
    </Box>
  );
}

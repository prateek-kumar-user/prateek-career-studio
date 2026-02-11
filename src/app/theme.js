import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#0b0f14',
      paper: '#0f1620'
    },
    primary: {
      main: '#7dd3fc'
    },
    secondary: {
      main: '#a78bfa'
    }
  },
  typography: {
    fontFamily: [
      'Inter',
      'ui-sans-serif',
      'system-ui',
      '-apple-system',
      'Segoe UI',
      'Roboto',
      'Arial',
      'sans-serif'
    ].join(',')
  },
  shape: {
    borderRadius: 12
  }
});

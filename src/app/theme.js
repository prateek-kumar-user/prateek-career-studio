import { alpha, createTheme } from '@mui/material/styles';

const baseTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#73d9ff' },
    secondary: { main: '#b18cff' },
    background: {
      default: '#070b13',
      paper: '#0f1726'
    },
    text: {
      primary: '#eef4ff',
      secondary: '#b7c3d8'
    }
  },
  shape: { borderRadius: 16 },
  typography: {
    fontFamily: [
      'Inter',
      'Manrope',
      'ui-sans-serif',
      'system-ui',
      '-apple-system',
      'Segoe UI',
      'Roboto',
      'Arial',
      'sans-serif'
    ].join(','),
    h1: { fontSize: 'clamp(2.1rem, 6vw, 3.7rem)', fontWeight: 800, letterSpacing: '-0.03em' },
    h2: { fontSize: 'clamp(1.7rem, 4vw, 2.7rem)', fontWeight: 760, letterSpacing: '-0.025em' },
    h3: { fontSize: 'clamp(1.25rem, 2.3vw, 1.65rem)', fontWeight: 700 },
    body1: { fontSize: '1rem', lineHeight: 1.75 },
    body2: { fontSize: '0.95rem', lineHeight: 1.68 }
  }
});

export const theme = createTheme(baseTheme, {
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background:
            'radial-gradient(1200px 550px at 12% -8%, rgba(115,217,255,0.17), transparent 62%), radial-gradient(900px 500px at 98% 0%, rgba(177,140,255,0.14), transparent 54%), #070b13',
          color: '#eef4ff'
        },
        '::selection': {
          background: alpha(baseTheme.palette.primary.main, 0.35)
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backdropFilter: 'blur(6px)',
          backgroundImage: 'none',
          borderColor: alpha('#ffffff', 0.1),
          backgroundColor: alpha('#111a2c', 0.72),
          boxShadow: '0 10px 28px rgba(3, 8, 19, 0.35)',
          transition: 'transform 180ms ease, box-shadow 200ms ease, border-color 200ms ease'
        }
      }
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: 'none',
          fontWeight: 650
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 10
        }
      }
    }
  }
});

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#6C63FF',
      light: '#8B83FF',
      dark: '#4B44CC',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#00D9FF',
      light: '#33E1FF',
      dark: '#00A8CC',
      contrastText: '#000000',
    },
    success: {
      main: '#00E676',
      light: '#33EB91',
      dark: '#00B248',
    },
    warning: {
      main: '#FFB300',
      light: '#FFC233',
      dark: '#CC8F00',
    },
    error: {
      main: '#FF5252',
      light: '#FF7474',
      dark: '#CC4141',
    },
    background: {
      default: '#0A0A0F',
      paper: '#12121A',
    },
    surface: {
      main: '#1A1A2E',
      card: '#16213E',
      glass: 'rgba(255,255,255,0.05)',
    },
    text: {
      primary: '#F0F0FF',
      secondary: '#9090B0',
      disabled: '#505070',
    },
    divider: 'rgba(255,255,255,0.08)',
    gradient: {
      primary: 'linear-gradient(135deg, #6C63FF 0%, #00D9FF 100%)',
      dark: 'linear-gradient(135deg, #12121A 0%, #1A1A2E 100%)',
      card: 'linear-gradient(135deg, rgba(108,99,255,0.1) 0%, rgba(0,217,255,0.05) 100%)',
      hero: 'linear-gradient(135deg, #0A0A0F 0%, #1A1A2E 50%, #0A0A0F 100%)',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '3.5rem',
      fontWeight: 800,
      letterSpacing: '-0.02em',
      lineHeight: 1.1,
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 700,
      letterSpacing: '-0.01em',
      lineHeight: 1.2,
    },
    h3: {
      fontSize: '2rem',
      fontWeight: 700,
      letterSpacing: '-0.01em',
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.7,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
    },
    caption: {
      fontSize: '0.75rem',
      letterSpacing: '0.04em',
    },
    button: {
      fontWeight: 600,
      letterSpacing: '0.02em',
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    'none',
    '0 2px 8px rgba(0,0,0,0.3)',
    '0 4px 16px rgba(0,0,0,0.4)',
    '0 8px 24px rgba(0,0,0,0.5)',
    '0 12px 32px rgba(0,0,0,0.5)',
    '0 16px 48px rgba(0,0,0,0.6)',
    '0 20px 60px rgba(0,0,0,0.6)',
    '0 0 0 rgba(0,0,0,0)',
    '0 0 0 rgba(0,0,0,0)',
    '0 0 0 rgba(0,0,0,0)',
    '0 0 0 rgba(0,0,0,0)',
    '0 0 0 rgba(0,0,0,0)',
    '0 0 0 rgba(0,0,0,0)',
    '0 0 0 rgba(0,0,0,0)',
    '0 0 0 rgba(0,0,0,0)',
    '0 0 0 rgba(0,0,0,0)',
    '0 0 0 rgba(0,0,0,0)',
    '0 0 0 rgba(0,0,0,0)',
    '0 0 0 rgba(0,0,0,0)',
    '0 0 0 rgba(0,0,0,0)',
    '0 0 0 rgba(0,0,0,0)',
    '0 0 0 rgba(0,0,0,0)',
    '0 0 0 rgba(0,0,0,0)',
    '0 0 0 rgba(0,0,0,0)',
    '0 24px 80px rgba(108,99,255,0.3)',
  ],
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#0A0A0F',
          color: '#F0F0FF',
          scrollbarWidth: 'thin',
          scrollbarColor: '#6C63FF #12121A',
          '&::-webkit-scrollbar': {
            width: '6px',
          },
          '&::-webkit-scrollbar-track': {
            background: '#12121A',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#6C63FF',
            borderRadius: '3px',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '10px',
          padding: '10px 24px',
          fontWeight: 600,
          transition: 'all 0.3s ease',
        },
        contained: {
          background: 'linear-gradient(135deg, #6C63FF 0%, #8B83FF 100%)',
          boxShadow: '0 4px 20px rgba(108,99,255,0.4)',
          '&:hover': {
            background: 'linear-gradient(135deg, #5A52E0 0%, #7A73EE 100%)',
            boxShadow: '0 8px 30px rgba(108,99,255,0.6)',
            transform: 'translateY(-2px)',
          },
        },
        outlined: {
          borderColor: 'rgba(108,99,255,0.5)',
          '&:hover': {
            borderColor: '#6C63FF',
            background: 'rgba(108,99,255,0.1)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: 'rgba(22, 33, 62, 0.6)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '16px',
          transition: 'all 0.3s ease',
          '&:hover': {
            border: '1px solid rgba(108,99,255,0.3)',
            boxShadow: '0 8px 40px rgba(108,99,255,0.2)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '10px',
            background: 'rgba(255,255,255,0.03)',
            '& fieldset': {
              borderColor: 'rgba(255,255,255,0.1)',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(108,99,255,0.5)',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#6C63FF',
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          fontWeight: 500,
        },
        filled: {
          background: 'rgba(108,99,255,0.2)',
          color: '#6C63FF',
          '&:hover': {
            background: 'rgba(108,99,255,0.3)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          background: 'rgba(18, 18, 26, 0.9)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.06)',
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: '4px',
          background: 'rgba(255,255,255,0.1)',
          height: '6px',
        },
        bar: {
          borderRadius: '4px',
          background: 'linear-gradient(90deg, #6C63FF, #00D9FF)',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          background: 'rgba(10, 10, 15, 0.95)',
          backdropFilter: 'blur(20px)',
          borderRight: '1px solid rgba(255,255,255,0.06)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'rgba(10, 10, 15, 0.8)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          boxShadow: 'none',
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(135deg, #6C63FF, #00D9FF)',
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: 'rgba(255,255,255,0.06)',
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          background: 'rgba(22, 33, 62, 0.95)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '8px',
          fontSize: '0.8rem',
        },
      },
    },
  },
});

export default theme;

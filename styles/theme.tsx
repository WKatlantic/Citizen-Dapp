import { createTheme } from '@mui/material/styles'
import palette from './palette'

declare module '@mui/material/styles' {
  interface PaletteOptions {
    black?: SimplePaletteColorOptions
    gray?: SimplePaletteColorOptions
    white?: SimplePaletteColorOptions
  }
  interface SimplePaletteColorOptions {
    60?: string
    70?: string
    80?: string
    90?: string
    100?: string
  }
}

export const DefaultTheme = createTheme({
  palette: { ...palette },
  typography: {
    fontFamily: 'Montserrat, Arial',
    body1: {
      fontSize: 15,
    },
    body2: {
      fontSize: 13,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          height: '100vh',
          color: 'white',
          backgroundImage: 'url(/images/app/background.jpg)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100% 100%',
          '*::-webkit-scrollbar': {
            width: '10px',
            height: '10px',
          },
          '*::-webkit-scrollbar-track': {
            background: '#E4EFEF50',
            borderRadius: '10px',
            '&:hover': {
              background: '#E4EFEFA8',
            },
          },
          '*::-webkit-scrollbar-thumb': {
            background: '#320E3280',
            borderRadius: '10px',
          },
          '@keyframes LoadingRowSection': {
            '0%': {
              backgroundPosition: 'top right',
            },
            '50%': {
              backgroundPosition: 'top left',
            },
            '100%': {
              backgroundPosition: 'top right',
            },
          },
        },
        fallbacks: [
          {
            '@font-face': {
              fontFamily: 'Montserrat',
              fontStyle: 'normal',
              fontWeight: 400,
              src: `local(''), url('./fonts/montserrat-v23-latin-regular.woff2') format('woff2'), url('./fonts/montserrat-v23-latin-regular.woff') format('woff');`,
            },
          },
          {
            '@font-face': {
              fontFamily: 'Montserrat',
              fontStyle: 'normal',
              fontWeight: 700,
              src: `local(''), url('./fonts/montserrat-v23-latin-700.woff2') format('woff2'), url('./fonts/montserrat-v23-latin-700.woff') format('woff');`,
            },
          },
          {
            '@font-face': {
              fontFamily: 'Montserrat',
              fontStyle: 'normal',
              fontWeight: 800,
              src: `local(''), url('./fonts/montserrat-v23-latin-800.woff2') format('woff2'), url('./fonts/montserrat-v23-latin-800.woff') format('woff');`,
            },
          },
        ],
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          wordWrap: 'break-word',
          hyphens: 'auto',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          color: 'white',
          fontSize: '12px',
          fontWeight: 'bold',
          border: 'none',
          borderRadius: '10px',
          backgroundColor: '#6419C8A0',
          padding: '4px 20px',
          '&:hover': {
            backgroundColor: '#b4abf5',
          },
        },
      },
      variants: [
        {
          props: { color: 'success' },
          style: {
            color: palette.white[100],
            backgroundColor: palette.secondary[100],
          },
        },
        {
          props: { color: 'error' },
          style: {
            color: palette.white[100],
            backgroundColor: palette.error[100],
          },
        },
      ],
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#281A48',
        },
      },
    },
  },
})

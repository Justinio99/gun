import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
  }
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      light: '#7a5af5', // Assuming Primary - 300
      main: '#9171f8', // Assuming Primary - 400
      dark: '#a688fa', // Assuming Primary - 500
      contrastText: '#ffffff', // You might need to adjust this based on your requirements
    },
    // Assuming 'Dark' colors are for background and surfaces
    background: {
      paper: '#121212', // Assuming Dark - 100
      default: '#121212', // Assuming Dark - 200
    },
    // You might want to use 'Mixed' colors for secondary, error, warning, info, success, etc.
    secondary: {
      light: '#645d75', // Assuming Mixed - 400
      main: '#7c758b', // Assuming Mixed - 500
      dark: '#958fa1', // Assuming Mixed - 600
      contrastText: '#ffffff',
    },
    // Add other color shades as needed for your design
  },
  components: {
  },
});

export { lightTheme, darkTheme };
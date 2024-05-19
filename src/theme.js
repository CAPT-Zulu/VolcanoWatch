'use client';
import { createTheme } from '@mui/material/styles';
// Import the custom styles
import './assets/styles/index.css'
import './assets/styles/backdrop.css'

// The custom theme
const theme = createTheme({
  palette: {
    mode: 'dark',
  },
  colors: {
    text: '#000',
    background: '#fff',
    primary: '#33e',
  },
});

export default theme;

import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import AppRouter from './AppRouter';
import AuthHandler from './AuthHandler';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Router>
          <AuthHandler>
            <AppRouter />
          </AuthHandler>
        </Router>
      </Box>
    </ThemeProvider>
  );
};

export default App;

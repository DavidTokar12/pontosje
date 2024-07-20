import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import PontosjeAppDrawer from './components/Drawer';
import HomePage from './pages/HomePage';
import PricingPage from './pages/PricingPage';
import SignUpPage from './pages/SignUpPage';
import ProfilePage from './pages/ProfilePage';
import GrammarCorrectionWrapper from './pages/grammarCorrection/GrammarCorrectionWrapper';
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';
import { selectIsDrawerOpen, selectDrawerWidth } from './slices/appSlice'; // Adjust the path as necessary
import CssBaseline from '@mui/material/CssBaseline';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';

// const DrawerHeader = styled('div')(({ theme }) => ({
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'flex-end',
//   ...theme.mixins.toolbar,
// }));


const App = () => {

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Router>
        <Navbar />
        <PontosjeAppDrawer />

        <Box component="main" sx={{ flexGrow: 1, p: 3 }} style={{ height: "calc( 100vh - 64px )", width: "100wh", margin: 0, marginTop: "64px", padding: 0 }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/write" element={<GrammarCorrectionWrapper />} />
          </Routes>

        </Box>
      </Router >
    </Box>
  );
};

export default App;
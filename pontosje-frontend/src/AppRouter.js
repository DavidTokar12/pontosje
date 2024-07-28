import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import PontosjeAppDrawer from './components/Drawer';
import HomePage from './pages/HomePage';
import PricingPage from './pages/PricingPage';
import SignUpPage from './pages/SignUpPage';
import ProfilePage from './pages/ProfilePage';
import GrammarCorrectionWrapper from './pages/grammarCorrection/GrammarCorrectionWrapper';
import Box from '@mui/material/Box';
import ProtectedRoute from './components/ProtectedRoute';

const AppRouter = () => {
    return (
        <>
            <Navbar />
            <PontosjeAppDrawer />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }} style={{ height: "calc( 100vh - 64px )", width: "100wh", margin: 0, marginTop: "64px", padding: 0 }}>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/arazas" element={<PricingPage />} />
                    <Route path="/regisztracio" element={<SignUpPage />} />
                    <Route path="/profil" element={<ProtectedRoute element={ProfilePage} />} />
                    <Route path="/helyesiras" element={<ProtectedRoute element={GrammarCorrectionWrapper} />} />
                </Routes>
            </Box>
        </>
    );
};

export default AppRouter;

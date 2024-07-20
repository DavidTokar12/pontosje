import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PricingPage from './pages/PricingPage';
import SignUpPage from './pages/SignUpPage';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import ProfilePage from './pages/ProfilePage';
import WriteGrammarCorrection from './pages/WriteGrammarCorrection'; // Import the new component
import { useState, useRef, useEffect } from 'react';


const App = () => {
  const [navbarHeight, setNavbarHeight] = useState(0);
  const appBarRef = useRef(null);

  useEffect(() => {
    if (appBarRef.current) {
      setNavbarHeight(appBarRef.current.offsetHeight);
    }
  }, [appBarRef.current]);

  return (
    <Router>
      <div>
        <AppBar position="static" ref={appBarRef}>
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              pontosje
            </Typography>
            <Button color="inherit" component={Link} to="/">
              Főoldal
            </Button>
            <Button color="inherit" component={Link} to="/pricing">
              Árazás
            </Button>
            <Button color="inherit" component={Link} to="/signup">
              Regisztráció
            </Button>
          </Toolbar>
        </AppBar>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/write" element={<WriteGrammarCorrection navbarHeight={navbarHeight} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
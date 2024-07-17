import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <AppBar position="static">
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
    );
};

export default Navbar;

import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import { toggleDrawer, selectIsDrawerOpen, selectDrawerWidth } from '../slices/appSlice'; // Adjust the path as necessary
import { useDispatch, useSelector } from 'react-redux';
import { useTheme, } from '@mui/material/styles';

const Navbar = () => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const isDrawerOpen = useSelector(selectIsDrawerOpen);
    const drawerWidth = useSelector(selectDrawerWidth);

    return (
        <AppBar position="fixed"

            style={{
                zIndex: theme.zIndex.drawer + 1,
                transition: theme.transitions.create(['width', 'margin'], {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                overflowX: 'hidden',
                marginLeft: drawerWidth,
                width: `calc(100% - ${isDrawerOpen ? drawerWidth : 0}px)`,
            }}
        >
            <Toolbar>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    // onClick={toggleDrawer}
                    sx={{ mr: 2 }}
                >
                    <MenuIcon onClick={() => dispatch(toggleDrawer())} />
                </IconButton>
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
        </AppBar >
    );
};

export default Navbar;
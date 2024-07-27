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
        <AppBar position="fixed" color="primary"
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
                    sx={{ mr: 2 }}
                >
                    <MenuIcon sx={{ color: theme.palette.text.secondary }} onClick={() => dispatch(toggleDrawer())} />
                </IconButton>
                <Typography variant="h5" sx={{ flexGrow: 1, color: theme.palette.text.primary }}>
                    pontosjé
                </Typography>
                <Button sx={{ color: theme.palette.text.secondary }} component={Link} to="/">
                    Főoldal
                </Button>
                <Button sx={{ color: theme.palette.text.secondary }} component={Link} to="/pricing">
                    Árazás
                </Button>
                <Button sx={{
                    color: theme.palette.primary.main,
                    backgroundColor: theme.palette.text.primary,
                    fontWeight: 'bold',
                    border: `2px solid ${theme.palette.secondary.main}`,
                    '&:hover': {
                        backgroundColor: theme.palette.primary.highlighted,
                    }
                }} component={Link} to="/signup">
                    Regisztráció: Ingyen!
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
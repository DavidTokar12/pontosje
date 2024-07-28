import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useLocation } from 'react-router-dom';
import { toggleDrawer, selectIsDrawerOpen, selectDrawerWidth } from '../slices/appSlice'; // Adjust the path as necessary
import { useDispatch, useSelector } from 'react-redux';
import { useTheme, } from '@mui/material/styles';
import RegistrationButton from './buttons/RegistrationButton'
import BasicLinkButton from './buttons/BasicLinkButton'

const Navbar = () => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const isDrawerOpen = useSelector(selectIsDrawerOpen);
    const drawerWidth = useSelector(selectDrawerWidth);
    const location = useLocation();

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

                {location.pathname === '/' && (
                    <>
                        <BasicLinkButton link={"/termek"} text={"Termék"} />
                        <BasicLinkButton link={"/pricing"} text={"Árak"} />
                    </>
                )}

                <RegistrationButton />
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;

import React from 'react';
import Drawer from "@mui/material/Drawer";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import { selectIsDrawerOpen, selectDrawerWidth } from '../slices/appSlice';
import { useSelector } from 'react-redux';
const PontosjeAppDrawer = () => {
    const isDrawerOpen = useSelector(selectIsDrawerOpen);
    const drawerWidth = useSelector(selectDrawerWidth);

    return (
        <Drawer
            variant="temporary"
            open={isDrawerOpen}
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                    transition: 'width 0.3s',
                },
            }}
        >
            <Divider />
            <List>

                <ListItem key="xd">
                    XD
                </ListItem>
            </List>
        </Drawer>
    );
};

export default PontosjeAppDrawer;
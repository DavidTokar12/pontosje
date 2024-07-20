import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    drawerWidth: 240,
    isDrawerOpen: false,
};

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        toggleDrawer: (state) => {
            state.isDrawerOpen = !state.isDrawerOpen;
        },
    },
});

export const { toggleDrawer } = appSlice.actions;

export const selectDrawerWidth = (state) => state.app.drawerWidth;
export const selectIsDrawerOpen = (state) => state.app.isDrawerOpen;

export default appSlice.reducer;

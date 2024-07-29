import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#fff',
            highlighted: "#006064"
        },
        secondary: {
            main: '#fff',
            highlighted: "#b2ebf2"
        },
        background: {
            default: '#fff',
            shaded: '#e0f7fa',
        },

        text: {
            primary: '#00bcd4',
            secondary: '#0e101a',
        },


        error: {
            main: '#f44336',
        },
        warning: {
            main: '#ff9800',
        },
        info: {
            main: '#2196f3',
        },
        success: {
            main: '#4caf50',
        },

    },
});

export default theme;
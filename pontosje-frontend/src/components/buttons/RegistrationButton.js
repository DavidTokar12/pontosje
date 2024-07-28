import React from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';


const RegistrationButton = ({ style }) => {
    const theme = useTheme();

    return (
        <Button sx={{
            color: theme.palette.primary.main,
            backgroundColor: theme.palette.text.primary,
            fontWeight: 'bold',
            border: `2px solid ${theme.palette.secondary.main}`,
            '&:hover': {
                backgroundColor: theme.palette.primary.highlighted,
            },
            ...style
        }} component={Link} to="/signup">
            Regisztráció: Ingyen!
        </Button>
    );
};

export default RegistrationButton;
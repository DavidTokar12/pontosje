import React from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';


const BasicLinkButton = ({ style, text, link }) => {
    const theme = useTheme();

    return (
        <Button sx={{
            color: theme.palette.text.secondary,
            '&:hover': {
                backgroundColor: theme.palette.secondary.highlighted,
            },
            ...style
        }} component={Link} to={link}>
            {text}
        </Button>
    );
};

export default BasicLinkButton;
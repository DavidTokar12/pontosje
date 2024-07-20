import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const SignUpPage = () => {
    const navigate = useNavigate();

    const handleGoogleSignUp = () => {

        navigate('/write');
    };

    return (
        <Container>
            <Typography variant="h2" gutterBottom>
                Regisztráció
            </Typography>
            <Typography variant="body1" gutterBottom>
                Regisztráljon Google vagy e-mail segítségével.
            </Typography>
            <Button variant="contained" color="primary" onClick={handleGoogleSignUp}>
                Regisztráció Google-lal
            </Button>
            <Button variant="contained" color="secondary">
                Regisztráció e-maillel
            </Button>
        </Container>
    );
};

export default SignUpPage;

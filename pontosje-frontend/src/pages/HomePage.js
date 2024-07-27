import React from 'react';
import { Button, Container, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const HomePage = () => {
    return (
        <Container>
            <Typography variant="h2" gutterBottom>
                Üdvözöljük a pontosje oldalon!
            </Typography>
            <Typography variant="body1" gutterBottom>
                Itt megtudhatja, hogyan működik a pontosje.
            </Typography>
            <Button variant="contained" color="primary" component={RouterLink} to="/signup">
                Regisztráljon ingyen
            </Button>
        </Container>
    );
};

export default HomePage;

import React from 'react';
import { Container, Typography, Button } from '@mui/material';

const ProfilePage = () => {
    return (
        <Container>
            <Typography variant="h2" gutterBottom>
                Profilkezelés
            </Typography>
            <Button variant="contained" color="primary">
                Előfizetés lemondása
            </Button>
            <Button variant="contained" color="secondary">
                További információ hozzáadása
            </Button>
        </Container>
    );
};

export default ProfilePage;

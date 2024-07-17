// src/pages/DashboardPage.js
import React from 'react';
import { Container, Typography, Button, List, ListItem, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
    const navigate = useNavigate();

    const handleWriteNew = () => {
        navigate('/write'); // Navigate to the write page
    };

    const handleProfile = () => {
        navigate('/profile');
    };

    const handleSignOut = () => {
        // TODO: Add sign-out logic
        alert("Signed out");
    };

    return (
        <Container>
            <Typography variant="h2" gutterBottom>
                Irányítópult
            </Typography>
            <List>
                <ListItem>
                    <ListItemText primary="Page 1" />
                </ListItem>
                <ListItem>
                    <ListItemText primary="Page 2" />
                </ListItem>
                <ListItem>
                    <ListItemText primary="Page 3" />
                </ListItem>
                {/* Add more pages as needed */}
            </List>
            <Button variant="contained" color="primary" onClick={handleWriteNew}>
                Új bejegyzés írása
            </Button>
            <Button variant="contained" color="secondary" onClick={handleProfile} sx={{ marginLeft: 2 }}>
                Profilkezelés
            </Button>
            <Button variant="contained" color="error" onClick={handleSignOut} sx={{ marginLeft: 2 }}>
                Kijelentkezés
            </Button>
        </Container>
    );
};

export default DashboardPage;

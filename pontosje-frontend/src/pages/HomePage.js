import React from 'react';
import { Button, Container, Typography, Grid } from '@mui/material';
import { useTheme, } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import GoogleButton from 'react-google-button'
const HomePage = () => {
    const theme = useTheme();
    return (
        <Container>
            <Grid container spacing={4} alignItems="center" justifyContent="center" style={{ minHeight: '100vh' }}>
                <Grid item xs={12} md={6}>
                    <Typography variant="h2" gutterBottom sx={{ textDecoration: 'underline' }}>
                        Helyesen, gyorsan, pontosan. Az AI erelyével.
                    </Typography>
                    <Typography sx={{ color: theme.palette.text.secondary }} variant="body1" gutterBottom>
                        A pontosje olyan Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Button sx={{
                                color: theme.palette.primary.main,
                                backgroundColor: theme.palette.text.primary,
                                fontWeight: 'bold',
                                border: `2px solid ${theme.palette.secondary.main}`,
                                '&:hover': {
                                    backgroundColor: theme.palette.primary.highlighted,
                                },
                                width: '100%',
                                height: '4rem',
                                boxShadow: `${theme.palette.primary.main} 0px 2px 4px 0px`
                            }} component={Link} to="/signup">
                                Regisztráció: Ingyen!
                            </Button>
                        </Grid>
                        <Grid item xs={6}>
                            <GoogleButton
                                type="light"
                                style={{
                                    width: '100%',
                                    height: '4rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                                onClick={() => { console.log('Google button clicked') }}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={6}>
                    {/* Add any content you want on the right side, e.g., an image */}
                    <img src="path/to/your/image.jpg" alt="Landing Page Image" style={{ width: '100%', height: 'auto' }} />
                </Grid>
            </Grid>
        </Container>
    );
};

export default HomePage;
import React from 'react';
import { Button, Container, Typography, Grid } from '@mui/material';
import { useTheme, } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import GoogleButton from 'react-google-button'
import RegistrationButton from '../components/buttons/RegistrationButton';

const HomePage = () => {
    const theme = useTheme();
    return (
        <Container>

            <Grid container spacing={4} alignItems="center" justifyContent="center" style={{ minHeight: '100vh' }}>
                <Grid item xs={12} md={6}>

                    <Typography variant="h2" gutterBottom sx={{ textDecoration: 'underline' }}>
                        Okos, meggyőző, gyors AI írnok.
                    </Typography>

                    <Typography sx={{ color: theme.palette.text.secondary }} variant="body1" gutterBottom>
                        Bízd a helyesírás trükkjeit az AI asszisztensedre, hogy te fejfájás nélkül megírd azt a fontos levelet, emailt, vagy irodalom házit.
                        Te csináld azt amiben a legjobb vagy és bízd a helyesírást a saját intelligens AI írnokodra.
                        Villámgyors kontextus elemzés, hangnem finomhangolás, természetes szöveg írás hibák nélkül.
                    </Typography>

                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <RegistrationButton style={{
                                width: '100%',
                                height: '4rem'
                            }} />

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

                    <img src="path/to/your/image.jpg" alt="Landing Page Image" style={{ width: '100%', height: 'auto', background: "blue" }} />
                </Grid>
            </Grid>
        </Container>
    );
};

export default HomePage;
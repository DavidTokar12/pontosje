import React from 'react';
import { TextField, Button, Container, Typography, Box, Card, CardContent, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useFormik } from 'formik';
import * as yup from 'yup';
import GoogleButton from 'react-google-button';
import BasicLinkButton from '../components/buttons/BasicLinkButton';
import { useDispatch } from 'react-redux';
import { signup } from '../slices/authSlice';

const validationSchema = yup.object({
    name: yup.string().required('A név kötelező'),
    email: yup.string().email('Kérlek, adj meg egy érvényes email címet').required('Az email cím kötelező'),
    password: yup.string()
        .min(8, 'A jelszónak legalább 8 karakter hosszúnak kell lennie')
        .matches(/[0-9]/, 'A jelszónak tartalmaznia kell egy számot')
        .required('A jelszó kötelező'),
    repeatPassword: yup.string()
        .oneOf([yup.ref('password'), null], 'A jelszavaknak egyeznie kell')
        .required('A jelszó ismétlése kötelező'),
});


const SignUpPage = () => {

    const dispatch = useDispatch();

    const theme = useTheme();

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            repeatPassword: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            dispatch(signup({ "username": values.name, "email": values.email, "password": values.password }));
        },
        validateOnChange: true,
        validateOnBlur: true,
    });

    return (
        <Container maxWidth="sm">
            <Box
                sx={{
                    marginTop: theme.spacing(2),
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Card sx={{ mt: 3, width: '100%' }}>
                    <CardContent>

                        <Grid container spacing={4} justifyContent="space-between">
                            <Grid item  >
                                <Typography variant="h4" gutterBottom>
                                    Regisztráció
                                </Typography>
                            </Grid>
                            <Grid item >
                                <BasicLinkButton text={"Már van fiókom"} link={"/bejelentkezes"} />
                            </Grid>
                        </Grid>

                        <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>

                            <TextField
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                id="name"
                                label="Name"
                                name="name"
                                autoComplete="name"
                                autoFocus
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                error={formik.touched.name && Boolean(formik.errors.name)}
                                helperText={formik.touched.name && formik.errors.name}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                id="email"
                                label="Email Cím"
                                name="email"
                                autoComplete="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                error={formik.touched.email && Boolean(formik.errors.email)}
                                helperText={formik.touched.email && formik.errors.email}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                name="password"
                                label="Jelszó"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                error={formik.touched.password && Boolean(formik.errors.password)}
                                helperText={formik.touched.password && formik.errors.password}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                name="repeatPassword"
                                label="Jelszó Ismétlése"
                                type="password"
                                id="repeatPassword"
                                value={formik.values.repeatPassword}
                                onChange={formik.handleChange}
                                error={formik.touched.repeatPassword && Boolean(formik.errors.repeatPassword)}
                                helperText={formik.touched.repeatPassword && formik.errors.repeatPassword}
                            />

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
                                marginBottom: theme.spacing(2),
                                marginTop: theme.spacing(2),
                            }}
                                onClick={formik.handleSubmit}
                            >
                                Regisztráció
                            </Button>


                            <GoogleButton
                                type="light"
                                label='Regisztráció Google fiókkal'
                                style={{
                                    width: '100%',
                                    height: "4rem",
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                                onClick={() => { console.log('Google button clicked') }}
                            />


                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </Container>
    );
};

export default SignUpPage;
import React, { useState } from 'react';
import { Button, TextField, Grid, Typography, Box, Avatar, Container, CssBaseline } from '@mui/material';
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link } from 'react-router-dom';
import { useGun } from '../context/gun';
import useGunUser from '../context/useGunUser';


function Login() {
    const { logIn, user } = useGunUser();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    // Handle input change
    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    // Handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        logIn(formData.email, formData.password)
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    boxShadow: 2,
                    p: 2,
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
                >
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Login
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </Grid>

                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Login
                    </Button>

                </Box>
            </Box>
        </Container>
    );
}

export default Login;

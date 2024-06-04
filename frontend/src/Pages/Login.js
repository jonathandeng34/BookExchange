import React, { useState } from 'react';
import {
    Avatar,
    Button,
    Container,
    CssBaseline,
    TextField,
    Grid,
    Box,
    Typography,
    Snackbar,
    CircularProgress,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Endpoints from '../Endpoints.js';
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory

const theme = createTheme();





//Login component
export function Login() {

    const navigate = useNavigate(); // Use useNavigate instead of useHistory
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);



        Endpoints.doLogin(formData.email, formData.password).then(async (response) => {
            console.log(response)
            if (!response.ok)
            {
                let errorText = await response.text();
                throw errorText;
            }
            navigate('/');
        }).catch(
            err => {console.log(err)}
            )
            




        

        /*
        // Mock API call
        setTimeout(() => {
            setLoading(false);
            setOpen(true);
        }, 2000);
        */
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Log In
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
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
                                    autoComplete="current-password"
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
                            disabled={loading}
                        >
                            {loading ? <CircularProgress size={24} /> : 'Log In'}
                        </Button>
                    </Box>
                </Box>
                <Snackbar
                    open={open}
                    autoHideDuration={6000}
                    onClose={() => setOpen(false)}
                    message="Logged in successfully!"
                />
            </Container>
        </ThemeProvider>
    );
}

import React, { useState } from 'react';
import {
    Avatar,
    Button,
    Container,
    CssBaseline,
    TextField,
    Box,
    Typography,
    Snackbar,
    CircularProgress,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Endpoints from '../Endpoints';
import logo from '../Assets/bruinBookExchangeLogo.png';

const theme = createTheme();

const largeLogoStyle = {
    height: '200px', 
    margin: '20px auto 0', 
    display: 'block'
};

export function ResetPassword() { 
    const [loading, setLoading] = useState(false);
    const [resetLoading, setResetLoading] = useState(false);
    const [snackbarText, setSnackbarText] = useState("");
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
    });
    const [resetFormData, setResetFormData] = useState({
        code: '',
        newPassword: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleResetChange = (e) => {
        const { name, value } = e.target;
        setResetFormData({
            ...resetFormData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        Endpoints.doCreateForgotPasswordRequest(formData.email).then(async (response) => {
            if(!response.ok) {
                throw (await response.json());
            }
            setSnackbarText("Password Change Request Created. Check your Email.");
            setOpen(true);
            setLoading(false);
        }).catch(e => {
            setSnackbarText(e["reason"] || "Internal Error");
            setOpen(true);
            setLoading(false);
        });
        
    };

    const handleResetSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        if(resetFormData.newPassword.trim().length == 0) {
            setSnackbarText("Please Set a New Password");
            setOpen(true);
            return;
        }

        Endpoints.doResetPassword(resetFormData.code, resetFormData.newPassword).then(async (response) => {
            if(!response.ok) {
                throw (await response.json());
            }
            setSnackbarText("Password Changed Successfully");
            setOpen(true);
            setLoading(false);
        })
        .catch(e => {
            setSnackbarText(e["reason"] || "Internal Error");
            setOpen(true);
            setLoading(false);
        });

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
                    <img src={logo} alt="Logo" style={largeLogoStyle} />

                    <Typography component="h1" variant="h5">
                        Reset Password
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
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
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            disabled={loading}
                        >
                            {loading ? <CircularProgress size={24} /> : 'Send Reset Link'}
                        </Button>
                    </Box>
                    <Box component="form" onSubmit={handleResetSubmit} noValidate sx={{ mt: 3 }}>
                        <TextField
                            required
                            fullWidth
                            id="code"
                            label="Forgot Password Code"
                            name="code"
                            value={resetFormData.code}
                            onChange={handleResetChange}
                        />
                        <TextField
                            required
                            fullWidth
                            id="password"
                            label="New Password"
                            name="newPassword"
                            type="password"
                            value={resetFormData.newPassword}
                            onChange={handleResetChange}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            disabled={loading}
                        >
                            {resetLoading ? <CircularProgress size={24} /> : 'Reset Password'}
                        </Button>
                    </Box>
                </Box>
                <Snackbar
                    open={open}
                    autoHideDuration={6000}
                    onClose={() => setOpen(false)}
                    message={snackbarText}
                />
            </Container>
        </ThemeProvider>
    );
}

export default ResetPassword;

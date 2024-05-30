import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory

export function Verification() {
    const navigate = useNavigate(); // Use useNavigate instead of useHistory

    const goToDashboard = () => {
        // Navigate to the dashboard page
        navigate('/');
    };

    return (
        <Container maxWidth="sm" style={{ marginTop: '50px' }}>
            <Typography variant="h4" align="center" gutterBottom>
                Account Verified
            </Typography>
            <Typography variant="body1" align="center" gutterBottom>
                Congratulations! Your account has been successfully verified.
            </Typography>
            <Button variant="contained" color="primary" onClick={goToDashboard} fullWidth style={{ marginTop: '20px' }}>
                Go to Dashboard
            </Button>
        </Container>
    );
}


/*
export function Verification(){
    return(
        <>
            <h1> This is the verification page. </h1>
        </>
    )
}
*/
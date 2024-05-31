import React from 'react';
import { Button, Typography, Box, Container, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import '../index.css';

export function Home() {
    const navigate = useNavigate();
    const userRating = 4.5; // Example user rating, replace with dynamic value
    const mostExchangedGenre = "Science Fiction"; // Example genre, replace with dynamic value

    const handleStatusClick = () => {
        navigate('/exchanges'); // Adjust this path as necessary
    };

    const handlePostNewBookClick = () => {
        navigate('/post-new-book'); // Adjust this path as necessary
    };

    return (
        <Container 
            className="catalog-page" 
            sx={{ 
                pt: '100px', // Ensure there's enough space at the top
                background: '#FBFFFF', 
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                overflowY: 'auto' // Allow content to be scrollable
            }}
        >
            <Box mt={4}>
                <Button 
                    variant="contained" 
                    onClick={handleStatusClick}
                    sx={{ 
                        backgroundColor: '#E8DFCA', 
                        color: '#4D869C', 
                        fontFamily: 'Inter', 
                        fontWeight: 600, 
                        textTransform: 'uppercase',
                        padding: '10px 20px',
                        borderRadius: '8px',
                        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.3)',
                        '&:hover': {
                            backgroundColor: '#d8cfc0',
                        }
                    }}
                >
                    Click for status of current exchanges
                </Button>
            </Box>
            
            <Box mt={4}>
                <Typography 
                    variant="h6" 
                    sx={{ 
                        fontFamily: 'Inter', 
                        fontWeight: 600, 
                        color: '#000000'
                    }}
                >
                    Your user rating: {userRating}
                </Typography>
            </Box>

            <Box mt={4}>
                <Button 
                    variant="contained" 
                    onClick={handlePostNewBookClick}
                    sx={{ 
                        backgroundColor: '#4D869C', 
                        color: '#FFFFFF', 
                        fontFamily: 'Inter', 
                        fontWeight: 600, 
                        textTransform: 'uppercase',
                        padding: '10px 20px',
                        borderRadius: '8px'
                    }}
                >
                    Post new book
                </Button>
            </Box>

            <Box mt={6} component={Paper} sx={{ background: '#FFFFFF', borderRadius: '8px', boxShadow: 3, p: 3, width: '100%', maxWidth: '600px' }}>
                <Typography 
                    variant="h6" 
                    sx={{ 
                        fontFamily: 'Inter', 
                        fontWeight: 600, 
                        color: '#000000'
                    }}
                >
                    We noticed that you exchanged most for {mostExchangedGenre} genre of books. 
                    Here are more books from this genre which you haven’t exchanged for yet:
                </Typography>
                {/* This section will list books from the genre. Replace with dynamic content */}
                <Box mt={2}>
                    <Typography variant="body1" sx={{ fontFamily: 'Inter', color: '#000000', mt: 2 }}>Book 1</Typography>
                    <Typography variant="body1" sx={{ fontFamily: 'Inter', color: '#000000', mt: 2 }}>Book 2</Typography>
                    <Typography variant="body1" sx={{ fontFamily: 'Inter', color: '#000000', mt: 2 }}>Book 3</Typography>
                </Box>
            </Box>
        </Container>
    );
}

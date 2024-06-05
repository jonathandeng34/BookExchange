import React, { useEffect, useState } from 'react';
import { Button, Typography, Box, Container, Paper, Snackbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import '../index.css';
import Endpoints from '../Endpoints';

export function Home() {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [snackbarText, setSnackbarText] = useState("");
    const [user, setUser] = useState({});
    const [recommendations, setRecommendations] = useState({});

    useEffect(() => {
        Endpoints.doGetSelf().then(async (response) => {
            const json = await response.json();
            if(!response.ok) {
                throw json;
            }
            return json;
        }).then(json => {
            setUser(json);
        }).catch(e => {
            setSnackbarText(e["reason"] || "Internal Error");
            setOpen(true);
        });

        Endpoints.doGetRecommendations().then(async (response) => {
            const json = await response.json();
            if(!response.ok) {
                throw json;
            }
            return json;
        }).then(json => {
            setRecommendations(json);
        }).catch(e => {
            setSnackbarText(e["reason"] || "Internal Error");
            setOpen(true);
        });


    }, []);

    const handleStatusClick = () => {
        navigate('/DirectMessage'); // Adjust this path as necessary
    };

    const handlePostNewBookClick = () => {
        navigate('/BookListing'); // Adjust this path as necessary
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
                overflowY: 'auto', // Allow content to be scrollable
                fontFamily: 'var(--secondary-font)', // Use custom font
                color: '#476B70', // Matching text color
                fontSize: '16px', // Matching font size
            }}
        >

            <Box mt={4}>
                <Typography 
                    variant="h6" 
                    sx={{ 
                        fontWeight: 600, 
                        color: '#000000',
                        fontFamily: 'var(--secondary-font)', // Use custom font
                    }}
                >
                    Welcome, {user["username"] || "Loading..."}
                </Typography>
            </Box>

            <Box mt={4}>
                <Button 
                    variant="contained" 
                    onClick={handleStatusClick}
                    sx={{ 
                        backgroundColor: '#FBFFFF', 
                        color: '#4D869C', 
                        fontFamily: 'var(--secondary-font)', // Use custom font
                        fontWeight: 600, 
                        textTransform: 'none', // Change text transformation to none
                        padding: '10px 20px',
                        borderRadius: '8px',
                        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.3)',
                        '&:hover': {
                            backgroundColor: '#FFFFFF',
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
                        fontWeight: 600, 
                        color: '#000000',
                        fontFamily: 'var(--secondary-font)', // Use custom font
                    }}
                >
                    Your user rating: {user["userRating"] || "Loading..."}
                </Typography>
            </Box>

            <Box mt={4}>
                <Button 
                    variant="contained" 
                    onClick={handlePostNewBookClick}
                    sx={{ 
                        backgroundColor: '#4D869C', 
                        color: '#FFFFFF', 
                        fontFamily: 'var(--secondary-font)', // Use custom font
                        fontWeight: 600, 
                        textTransform: 'none',
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
                        fontWeight: 600, 
                        color: '#000000',
                        fontFamily: 'var(--secondary-font)', // Use custom font
                    }}
                >

                    {recommendations.genre ? 
                        "We noticed that you exchanged most for the genre: " + recommendations.genre + ".\nHere are some more books from this genre which you haven't exchanged for yet"
                    : "No Recommendations Yet! Exchange some books to get started!"}

                </Typography>
                {/* This section will list books from the genre. Replace with dynamic content */}
                <Box mt={2}>
                    {
                        recommendations.books ? recommendations.books.map(book => (
                            <Typography key = {book._id} onClick={() => navigate('/BookInformation/'+book._id)} variant="body1" sx={{ color: '#000000', mt: 2, fontFamily: 'var(--secondary-font)' }}>{book.title}</Typography>
                        ))
                        : null
                    }
                   
                </Box>
            </Box>
            <Snackbar
                    open={open}
                    autoHideDuration={60000}
                    onClose={() => setOpen(false)}
                    message={snackbarText}
                />
        </Container>
    );
}

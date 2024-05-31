import React, { useState } from 'react';
import { TextField, InputAdornment, IconButton, Grid, Typography, MenuItem } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import BookIcon from '@mui/icons-material/Book';
import '../index.css'; // Assuming the CSS file is named styles.css

export function Catalog() {
    // State for search query and selected genre
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedGenre, setSelectedGenre] = useState('');

    // Dummy book data (replace with your actual book data)
    const books = [
        { title: 'Book 1', author: 'Author 1', genre: 'Fiction' },
        { title: 'Book 2', author: 'Author 2', genre: 'Mystery' },
        { title: 'Book 3', author: 'Author 3', genre: 'Science Fiction' }
    ];

    // Filter books based on search query and selected genre
    const filteredBooks = books.filter(book =>
        (book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            book.author.toLowerCase().includes(searchQuery.toLowerCase())) &&
        (selectedGenre === '' || book.genre === selectedGenre)
    );

    // Array of available genres
    const genres = [
        'Fiction', 'Non-fiction', 'Mystery', 'Thriller', 'Science Fiction',
        'Fantasy', 'Biography', 'History', 'Romance', 'Horror'
    ];

    return (
        <div className="catalog-page">
            {/* Search Bar */}
            <TextField
                label="Search by Title or Author"
                variant="outlined"
                size="small"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <IconButton>
                                <SearchIcon />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
                style={{ marginBottom: '20px', width: '100%' }}
            />

            {/* Genre Filter Dropdown */}
            <TextField
                select
                label="Filter by Genre"
                variant="outlined"
                size="small"
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
                style={{ marginBottom: '20px', width: '100%' }}
            >
                <MenuItem value="">All</MenuItem>
                {genres.map((genre, index) => (
                    <MenuItem key={index} value={genre}>{genre}</MenuItem>
                ))}
            </TextField>

            {/* Display Filtered Books */}
            <Grid container spacing={2}>
                {filteredBooks.map((book, index) => (
                    <Grid item xs={4} key={index}>
                        <div className="book-container">
                            <BookIcon fontSize="large" />
                            <Typography variant="h6">{book.title}</Typography>
                            <Typography variant="subtitle1">{book.author}</Typography>
                            <Typography variant="subtitle2">{book.genre}</Typography>
                            {/* Link to book information page */}
                            <a href="#" className="book-info-link">Link to book information page</a>
                        </div>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}

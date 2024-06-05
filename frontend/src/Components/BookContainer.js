import React from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Typography } from "@mui/material";
import { BookImage } from "./BookImage.js";

export function BookContainer({ books, exchange }) {
    const navigate = useNavigate();

    const getBookURL = (bookId) => {
        if(!exchange) {
            return '/BookInformation/'+bookId;
        }
        else {
            return '/BookInformation/'+bookId+'?exchange='+exchange;
        }
    }

    return (
        <Grid container spacing={2}>
                {books.map((book, index) => (
                    <Grid item xs={4} key={index}>
                        <div className="book-container" onClick={() => { navigate(getBookURL(book._id)); }}>
                            {/*<BookIcon fontSize="large" />*/}
                            <BookImage book={book}/>
                            <Typography variant="h6">{book.title}</Typography>
                            <Typography variant="subtitle1">{book.author}</Typography>
                            <Typography variant="subtitle2">{book.genre}</Typography>
                        </div>
                    </Grid>
                ))}
            </Grid>
    );
}
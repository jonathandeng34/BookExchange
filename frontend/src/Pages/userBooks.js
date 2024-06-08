import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Endpoints from "../Endpoints";
import { BookContainer } from "../Components/BookContainer";
import { Snackbar, Box, Typography } from "@mui/material";
import { useQuery } from "../utils";

export function BooksByUser() {

    const [user, setUser] = useState([]);
    const [books, setBooks] = useState([]);
    const [open, setOpen] = useState(false);
    const [snackbarText, setSnackbarText] = useState("");

    const { userId } = useParams();
    let query = useQuery();

    useEffect(() => {
        Endpoints.doGetUser(userId).then(async (response) => {
            const json = await response.json();
            if(!response.ok) {
                throw json;
            }
            return json;
        }).then(json => {
            setUser(json);
        }).catch(e => {
            setSnackbarText(e["reason"] || "Internal Error Fetching User");
            setOpen(true);
        });
    }, []);

    useEffect(() => {

        //Make sure we have loaded the user data before loading the book data
        if(!user["_id"]) {
            return;
        }

        Endpoints.doGetBooksOwnedBy(user["_id"]).then(response => {
            if(!response.ok) {
                throw "Response Failure"
            }
            return response.json();
        }).then(json => {
            setBooks(json);
        }).catch(e => {
            console.log(e);
            setSnackbarText("Server Unable to Send Book Data");
            setOpen(true);
        });
    }, [user])

    return (
        <>
            <Box mt={4}>
                <Typography 
                    variant="h6" 
                    sx={{ 
                        fontWeight: 600, 
                        color: '#000000',
                        fontFamily: 'var(--secondary-font)', // Use custom font
                    }}
                >
                    Books From: {user["username"] || "Loading..."}
                </Typography>
            </Box>
            <BookContainer books={books} exchange={query.get("exchange")}/>
            <Snackbar
                    open={open}
                    autoHideDuration={6000}
                    onClose={() => setOpen(false)}
                    message={snackbarText}
                />
        </>
    );
}
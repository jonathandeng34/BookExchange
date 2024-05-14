import mongoose from 'mongoose'
import express from 'express'
import Book from '../db_models/book_model.js';
import User from '../db_models/user_model.js';

const router = express.Router();

/*
This controller manages all endpoints that have to do with the retrieval
and posting of book information.
*/

router.get('/get/:id', (req, res) => {
    Book.findOne({
        _id: req.params.id
    }).then((book) => {
        if(!book) {
            res.status(404);
            res.send("Book Not Found!");
        }
        //TODO: Aggregate User Data into the Book document being sent
        res.send(book);
    }).catch((e) => {
        res.status(500);
        //TODO: Remove this. We don't want to send internal errors to the client
        res.send(e);
    });
});

export { router as BookController };
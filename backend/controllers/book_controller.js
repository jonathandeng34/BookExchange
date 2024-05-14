import mongoose from 'mongoose'
import express from 'express'
import Book from '../db_models/book_model.js';
import User from '../db_models/user_model.js';

const router = express.Router();

/*
This controller manages all endpoints that have to do with the retrieval
and posting of book information.
*/

/**
 * Takes in the Object ID of a book and returns a JSON object of that book.
 * Replaces the bookOwner field in the database document from the owner's
 * Object ID to an object with the owner's Object ID and username.
 */
router.get('/get/:id', (req, res) => {
    Book.findOne({
        _id: req.params.id
    }).populate('bookOwner', '_id username').then((book) => {
        if(!book) {
            res.status(404);
            res.send("Book Not Found!");
        }
        res.send(book);
    }).catch((e) => {
        res.status(500);
        //TODO: Remove this. We don't want to send internal errors to the client
        res.send(e);
    });
});

/**
 * Take in the JSON for a new book and upload it under the user who posted it
 * Since JWT isn't implemented yet, I'm hardcoding the owner right now.
 * 
 * Expected Body:
 * Title, Author, Genre
 */
//TODO: Replace the Hardcoded User with the User Encoded in JWT Token
router.post('/upload', (req, res) => {
    let newBook = new Book({
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre,
        isBookOutForExchange: false,
        bookOwner: new mongoose.Types.ObjectId('6643d77345389a92052ed220')
    });
    newBook.save().then(doc => {
        res.send("Upload Successful");
    });
});

export { router as BookController };
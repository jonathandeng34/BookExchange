import mongoose from 'mongoose'
import express from 'express'
import Book from '../db_models/book_model.js';
import { distance as editDistance } from 'fastest-levenshtein'
import constants from '../constants.js'
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

/**
 * Search for books based on the title and genre
 * Uses Levenshtein Distance
 * JSON: Query String (searchQuery), Selected Genres (array of strings) (genreFilter)
 * genreFilter is optional. If it isn't provided, genre isn't taken into account in the filter
 * If searchQuery is empty or all whitespace, we'll just return all books
 */
router.get('/search', (req, res) => {
    //First, let's get all the books that match a particular genre
    //If genreFilter isn't present, ignore this filter
    Book.find((req.body.genreFilter) ? {
        genre: {
            $in: req.body.genreFilter
        }
    } : {}).populate('bookOwner', '_id username').then(books => {
        //Next, we'll assign each book title an edit distance using Levenshtein Distance
        //TODO: Maybe we should implement this ourselves because of the whole you should code
        //  most of it yourself thing in the grading. For now, this is just using an NPM package
        //  I found

        if(req.body.searchQuery.trim().length == 0) {
            res.send(books);
            return;
        }

        for (let book of books) {
            book['editDistance'] = editDistance(req.body.searchQuery, book['title'])
        }
        //console.log(books)

        //Next, let's filter out books above a certain edit distance threshold and then sort
        // the remaining in ascending order by edit distance
        const finalList = books.filter(book => (book['editDistance'] <= constants['maximumEditDistance']))
            .sort((book1, book2) => book1['editDistance']-book2['editDistance'])
        
        //Send over the final list of filtered books!
        res.send(finalList)

    })
})

export { router as BookController };
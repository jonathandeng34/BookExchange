import mongoose, { mongo } from 'mongoose'
import express from 'express'
import Book from '../db_models/book_model.js';
import { distance as editDistance } from 'fastest-levenshtein'
import User from '../db_models/user_model.js';
import validateJWT from '../security/validate_jwt.js';
import { isIDValid, validateID } from '../frontend_models/validate_schema.js';
import BookComment from '../db_models/book_comment_model.js';

import validateSchema from '../frontend_models/validate_schema.js';
import { UploadBookSchema, SearchSchema, BookCommentSchema } from '../frontend_models/book_schemas.js';
import multer from "multer";
import { Readable } from 'stream';


const router = express.Router();
const upload = multer({});


const withinDistance = (query, name, editDistance) => {
    return editDistance <= parseInt(process.env.MAXIMUM_EDIT_DISTANCE) 
    || isSubset(query, name);
}

const isSubset = (query, name) => {
    return name.toLowerCase().includes(query.toLowerCase());
}

//Calculate the Damerau-Levenshtein distance between two strings (I have no clue how this works)
const calculateDistance = (str1, str2) => {
    let distanceMatrix = [];
    for (let i = 0; i <= str2.length; i++) {
        let row = [i];
        distanceMatrix.push(row);
    }
    let firstRow = distanceMatrix[0];
    for (let j = 0; j <= str1.length; j++) {
        firstRow.push(j);
    }
    for (let i = 1; i <= str2.length; i++) {
        for (let j = 1; j <= str1.length; j++) {
            if (str2.charAt(i-1) == str1.charAt(j-1)) {
                distanceMatrix[i][j] = distanceMatrix[i-1][j-1];
            } else {
                distanceMatrix[i][j] = Math.min(distanceMatrix[i-1][j-1] + 1, // substitution
                                                distanceMatrix[i][j-1] + 1, // insertion
                                                distanceMatrix[i-1][j] + 1); // deletion
            }
            if (i > 1 && j > 1 && str2.charAt(i-1) == str1.charAt(j-2) && str2.charAt(i-2) == str1.charAt(j-1)) {
                distanceMatrix[i][j] = Math.min(distanceMatrix[i][j], distanceMatrix[i-2][j-2] + 1); // transposition
            }
        }
    }
    return distanceMatrix[str2.length][str1.length];
}

/*
This controller manages all endpoints that have to do with the retrieval
and posting of book information.
*/

router.get('/all', (req, res) => {
    Book.find({}).populate('bookOwner', '_id username userRating').then(books => {
        res.send(books);
    }).catch(e => {
        console.log(e);
        res.sendStatus(500);
    });
});

/**
 * Takes in the Object ID of a book and returns a JSON object of that book.
 * Replaces the bookOwner field in the database document from the owner's
 * Object ID to an object with the owner's Object ID, username, and user rating.
 */
router.get('/get/:id', validateID(), (req, res) => {
    Book.findOne({
        _id: req.params.id
    }).populate('bookOwner', '_id username userRating').then((book) => {
        if(!book) {
            res.status(404);
            res.json({
                "reason": "Book Not Found!"
            });
            return;
        }
        res.send(book);
    }).catch((e) => {
        res.sendStatus(500);
        //res.send(e);
    });
});

/**
 * Takes in a User ID as a parameter and gives all books that are owned by that user.
 * Replaces the bookOwner Object ID with more information about the user.
 */
router.get('/ownedby/:id', validateID(), (req, res) => {
    Book.find({
        bookOwner: req.params.id
    }).populate('bookOwner', '_id username userRating').then((books) => {
        res.send(books);
    }).catch((e) => {
        console.log(e);
        res.sendStatus(500);
    });
});


/**
 * Takes in the Object ID of a book and returns the star rating of that book.
 
 router.get('/get/:id/starRating', (req, res) => {
    Book.findOne({
        _id: req.params.id
    }).select('starRating').then((book) => {
        if (!book) {
            res.status(404).send("Book Not Found!");
            return;
        }
        res.json({ starRating: book.starRating });
    }).catch((e) => { //i guess we will probably remove this
        res.status(500).send("Internal Server Error");
    });
});

*/


/**
 * Take in the JSON for a new book and upload it under the user who posted it
 * Since JWT isn't implemented yet, I'm hardcoding the owner right now.
 * 
 * Expected Body:
 * Title, Author, Genre
 */
//TODO: Replace the Hardcoded User with the User Encoded in JWT Token
router.post('/upload', validateSchema(UploadBookSchema), validateJWT(), (req, res) => {
    let newBook = new Book({
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre,
        isBookOutForExchange: false,
        bookOwner: req.userId
    });
    newBook.save().then(doc => {
        res.json({
            "reason": "Upload Successful",
            _id: doc._id
        });
    });
});

router.post('/uploadImage/:bookId', validateID(), validateJWT(), upload.single('bookImg'), async (req, res) => {
    let bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db);
    const stream = Readable.from(req.file.buffer);
    const book = await Book.findById(req.params.bookId);
    if(!book) {
        res.status(404);
        res.json({
            "reason": "Book Does Not Exist"
        });
        return;
    }
    if(book.bookOwner.toString() != req.userId) {
        res.status(400);
        res.json({
            "reason": "Unauthorized"
        });
        return;
    }

    //TODO: Delete the Old File if it Exists
    const oldFiles = await bucket.find({filename: req.params.bookId}).toArray();
    for(const old of oldFiles) {
        await bucket.delete(old._id);
    }
    
    stream.pipe(bucket.openUploadStream(req.params.bookId));


    res.sendStatus(200);
});

router.get('/downloadImage/:bookId', validateID(), async (req, res) => {
    let bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db);
    const book = await Book.findById(req.params.bookId);
    if(!book) {
        res.status(404);
        res.json({
            "reason": "Book Does Not Exist"
        });
        return;
    }

    const file = await bucket.find({filename: req.params.bookId});
    if(!(await file.hasNext())) {
        res.status(404);
        res.json({
            "reason": "Book Does Not Have Image"
        });
        return;
    }

    try {
        let readStream = bucket.openDownloadStreamByName(req.params.bookId);
        readStream.pipe(res);
    }
    catch(e) {
        res.status(404);
        res.json({
            "reason": "Book does not have Image"
        });
    }
});

router.delete('/:id', validateJWT(), (req, res) => {
    Book.findById(req.params.id).then((book) => {

        if(!book) {
            res.sendStatus(404);
            return;
        }
        if(book.isBookOutForExchange) {
            res.status(400);
            res.json({
                "reason": "Book Out for Exchange"
            });
            return;
        }

        if(book.bookOwner.toString() != req.userId) {
            res.status(400);
            res.json({
                "reason": "Unauthorized for Given Exchange"
            });
            return;
        }

        Book.findByIdAndDelete(req.params.id).then(() => {
            res.status(200);
            res.send({
                "reason": "Book Deleted Successfully"
            });
        }).catch(e => {
            console.log(e);
            res.sendStatus(500);
        })

    })
    .catch(e => {
        console.log(e);
        res.sendStatus(500);
    })
});

/**
 * Search for books based on the title and genre
 * Uses Levenshtein Distance
 * JSON: Query String (searchQuery), Selected Genres (array of strings) (genreFilter)
 * genreFilter is optional. If it isn't provided, genre isn't taken into account in the filter
 * If searchQuery is empty or all whitespace, we'll just return all books
 */
router.get('/search', validateSchema(SearchSchema), (req, res) => {
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
            book['editDistance'] = calculateDistance(req.body.searchQuery, book['title']);
            book['shouldKeep'] = withinDistance(req.body.searchQuery, book['title'], book['editDistance']);
        }
        //console.log(books)

        //Next, let's filter out books above a certain edit distance threshold and then sort
        // the remaining in ascending order by edit distance
        const finalList = books.filter(book => book['shouldKeep'])
            .sort((book1, book2) => {
                let one = isSubset(req.body.searchQuery, book1["title"]);
                let two = isSubset(req.body.searchQuery, book2["title"]);
                if(one && !two) return -1;
                else if(two && !one) return 1;
                return (book1['editDistance'] - book2['editDistance']);
            })
        
        //Send over the final list of filtered books!
        res.send(finalList)

    })
});

router.get('/comments/:id', validateID(), (req, res) => {
    BookComment.find({
        bookId: req.params.id
    }).populate('userId', '_id username').then(comments => {
        res.send(comments);
    })
    .catch(e => {
        console.log(e);
        res.sendStatus(500);
    })
});

/**
 * Expected JSON:
 * Comment Text
 * Star Rating (between 1 and 5)
 */
router.post('/comment/:id', validateSchema(BookCommentSchema), validateID(), validateJWT(), async (req, res) => {

    if(req.body.starRating < 1 || req.body.starRating > 5) {
        res.json({
            "reason": "Book Star Rating must be between 1 and 5!"
        });
        res.status(400);
        return;
    }

    User.findById(req.userId).then(async (user) => {
        if(!user) {
            res.status(400);
            res.json({
                "reason": "Invalid User"
            });
            return;
        }

        const book = await Book.findById(req.params.id);
        if(!book) {
            res.status(400);
            res.json({
                "reason": "Invalid Book"
            });
            return;
        }

        let exchangedBookStrings = user.exchangedBooks.map(el => el.toString());
        if(!exchangedBookStrings.includes(req.params.id)) {
            //The user hasn't exchanged for this book yet, so they can't send a comment
            res.status(400);
            res.json({
                "reason": "You haven't made a complete exchange for this book yet!"
            });
            return;
        }

        //Delete any old comment
        await BookComment.deleteOne({
            userId: req.userId,
            bookId: req.params.id
        });

        const newComment = new BookComment({
            userId: req.userId,
            bookId: req.params.id,
            commentText: req.body.text,
            starRating: req.body.starRating
        });

        newComment.save().then(doc => {
            res.sendStatus(200);
        });

    })
    .catch(e => {
        console.log(e);
        res.sendStatus(500);
    })
});

export { router as BookController };

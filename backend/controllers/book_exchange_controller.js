import express from 'express'
import mongoose from 'mongoose'
import User from '../db_models/user_model.js'
import Book from '../db_models/book_model.js'
import BookExchange from '../db_models/book_exchange_model.js'
import validateJWT from '../security/validate_jwt.js'

import validateSchema from '../frontend_models/validate_schema.js'

import { CreateExchangeSchema, AcceptTwoSchema } from '../frontend_models/book_exchange_schemas.js';

const router = express.Router();



router.get('/get/:id', (req, res) => {
    BookExchange.findById(req.params.id).then(bookExchange => {
        if(!bookExchange) {
            res.status(404);
            res.send("No Such Book Exchange Found");
            return;
        }
        res.json(bookExchange);
    });
});

router.get('/getbyuser', validateJWT(), (req, res) => {
    BookExchange.find({
        $or: [
            {participantOne: req.userId},
            {participantTwo: req.userId}
        ]
    }).then(exchanges => {
        res.json(exchanges);
    })
    .catch(e => {
        console.log(e);
        res.setStatus(500);
    })
});

/**
 * JSON:
 * Selected Book ID
 */
router.post('/createExchange', validateSchema(CreateExchangeSchema), validateJWT(), (req, res) => {
    Book.findById(req.body.bookId).then(async (book) => {
        if(!book) {
            res.status(404);
            res.json({
                "reason": "Book Doesn't Exist"
            });
            return;
        }

        if(book.bookOwner.toString() == req.userId) {
            res.status(400);
            res.json({
                "reason": "Exchange with Self"
            });
            return;
        }

        if(book.isBookOutForExchange) {
            res.status(400);
            res.json({
                "reason": "Book already Out for Exchange"
            });
            return;
        }

        await Book.findByIdAndUpdate(req.body.bookId, {
            isBookOutForExchange: true
        });

        const newExchange = new BookExchange({
            participantOne: req.userId,
            participantTwo: book.bookOwner,
            bookOne: req.body.bookId,
            acceptedOne: false,
            acceptedTwo: false,
            exchangeStatus: 0,
            readStatus: 0,
            reexchangeStatus: 0
        });

        newExchange.save().then(doc => {
            res.json(doc);
        });
    })
});

/*
First User Requests and Exchange
Second User Accepts Exchange, States the book they want in return
Expected JSON: book_title, type: string
*/
router.post('/acceptTwo/:id', validateSchema(AcceptTwoSchema), validateJWT(), (req, res) => {
    BookExchange.findById(req.params.id).then(async (exchange) => {
        if(!exchange) {
            res.status(404);
            res.json({
                "reason": "Exchange Doesn't Exist"
            });
            return;
        }

        if(exchange.acceptedOne) {
            res.status(400);
            res.json({
                "reason": "Too Late"
            });
            return;
        }

        if(exchange.participantTwo.toString() != req.userId) {
            res.sendStatus(401);
            return;
        }
        
        const requestedBook = await Book.findById(req.body.bookId);
        if(!requestedBook) {
            res.status(404);
            res.json({
                "reason": "Book Doesn't Exist"
            });
            return;
        }

        await Book.findByIdAndUpdate(req.body.bookId, {
            isBookOutForExchange: true
        });

        if(requestedBook.bookOwner.toString() != exchange.participantOne.toString()) {
            res.status(400);
            res.json({
                "reason": "Book Not Owned by Other Participant"
            });
            return;
        }

        if(requestedBook.isBookOutForExchange) {
            res.status(400);
            res.json({
                "reason": "Book already Out for Exchange"
            });
            return;
        }

        const doc = await BookExchange.findByIdAndUpdate(exchange._id,
            {
                acceptedTwo: true,
                bookTwo: new mongoose.Types.ObjectId(req.body.bookId)
            });
        
        res.json(doc);

    }).catch(e => {
        console.log(e);
        res.sendStatus(500);
    });
});

router.post('/acceptOne/:id', validateJWT(), (req, res) => {
    BookExchange.findById(req.params.id).then(async (exchange) => {
        if(!exchange) {
            res.status(404);
            res.json({
                "reason": "Exchange Doesn't Exist"
            });
            return;
        }


        if(!exchange.acceptedTwo) {
            res.status(400);
            res.json({
                "reason": "Too Early"
            });
            return;
        }
        if(exchange.exchangeStatus != 0) {
            res.status(400);
            res.json({
                "reason": "Too Late"
            });
            return;
        }

        if(exchange.participantOne.toString() != req.userId) {
            res.sendStatus(401);
            return;
        }

        const doc = await BookExchange.findByIdAndUpdate(exchange._id,
            {
                acceptedOne: true
            },
            {
                new: true
            }
            );
        
        res.json(doc);

    }).catch(e => {
        console.log(e);
        res.sendStatus(500);
    });
});

router.post('/confirmexchange/:id', validateJWT(), (req, res) => {
    BookExchange.findById(req.params.id).then(async (exchange) => {
        if(!exchange) {
            res.status(404);
            res.json({
                "reason": "Exchange Doesn't Exist"
            });
            return;
        }

        if(!exchange.acceptedOne) {
            res.status(400);
            res.json({
                "reason": "Too Early"
            });
            return;
        }
        if(exchange.readStatus != 0) {
            res.status(400);
            res.json({
                "reason": "Too Late"
            });
            return;
        }

        let updateBody = {};

        if(exchange.participantOne.toString() == req.userId) {
            updateBody["exchangeStatus"] = exchange.exchangeStatus | 1;
        }
        else if(exchange.participantTwo.toString() == req.userId) {
            updateBody["exchangeStatus"] = exchange.exchangeStatus | 2;
        }
        else {
            res.sendStatus(401);
            return;
        }

        const doc = await BookExchange.findByIdAndUpdate(exchange._id,
            updateBody, {new: true});
        
        res.json(doc);

    }).catch(e => {
        console.log(e);
        res.sendStatus(500);
    });
});

router.post('/confirmread/:id', validateJWT(), (req, res) => {
    BookExchange.findById(req.params.id).then(async (exchange) => {
        if(!exchange) {
            res.status(404);
            res.json({
                "reason": "Exchange Doesn't Exist"
            });
            return;
        }

        if(exchange.exchangeStatus != 3) {
            res.status(400);
            res.json({
                "reason": "Too Early"
            });
            return;
        }
        if(exchange.reexchangeStatus != 0) {
            res.status(400);
            res.json({
                "reason": "Too Late"
            });
            return;
        }

        let updateBody = {};

        if(exchange.participantOne.toString() == req.userId) {
            updateBody["readStatus"] = exchange.readStatus | 1;
        }
        else if(exchange.participantTwo.toString() == req.userId) {
            updateBody["readStatus"] = exchange.readStatus | 2;
        }
        else {
            res.sendStatus(401);
            return;
        }

        const doc = await BookExchange.findByIdAndUpdate(exchange._id,
            updateBody, {new: true});
        
        res.json(doc);

    }).catch(e => {
        console.log(e);
        res.sendStatus(500);
    });
});

router.post('/confirmreexchange/:id', validateJWT(), (req, res) => {
    BookExchange.findById(req.params.id).then(async (exchange) => {
        if(!exchange) {
            res.status(404);
            res.json({
                "reason": "Exchange Doesn't Exist"
            });
            return;
        }

        if(exchange.readStatus != 3) {
            res.status(400);
            res.json({
                "reason": "Too Early"
            });
            return;
        }

        let updateBody = {};

        if(exchange.participantOne.toString() == req.userId) {
            updateBody["reexchangeStatus"] = exchange.reexchangeStatus | 1;
        }
        else if(exchange.participantTwo.toString() == req.userId) {
            updateBody["reexchangeStatus"] = exchange.reexchangeStatus | 2;
        }
        else {
            res.sendStatus(401);
            return;
        }

        const doc = await BookExchange.findByIdAndUpdate(exchange._id,
            updateBody, {new: true});

        if(doc.reexchangeStatus == 3) {
            await User.updateMany({
                $or: [
                    {_id: exchange.participantOne},
                    {_id: exchange.participantTwo}
                ]
            }, {
                $inc: {
                    userRating: 1
                }
            });

            await User.findByIdAndUpdate(exchange.participantOne, {
                $push: {
                    exchangedBooks: exchange.bookOne
                }
            });

            await User.findByIdAndUpdate(exchange.participantTwo, {
                $push: {
                    exchangedBooks: exchange.bookTwo
                }
            });

            if(!(await removeBooksFromExchange(req, res))) {
                res.sendStatus(404);
                return;
            }

            await BookExchange.findByIdAndDelete(exchange._id);

            res.json({
                "reason": "Complete"
            });
            return;
        }
        
        res.json(doc);

    }).catch(e => {
        console.log(e);
        res.sendStatus(500);
    });
});

router.delete('/cancel/:id', validateJWT(), async (req, res) => {

    if(!(await isUserFromExchange(req, res))) {
        res.sendStatus(401);
    }

    //First set the books to no longer in exchange
    if(!(await removeBooksFromExchange(req, res))) {
        res.sendStatus(404);
        return;
    }



    BookExchange.findByIdAndDelete(req.params.id).then(async () => {
        res.sendStatus(200);
    }).catch(e => {
        console.log(e);
        res.sendStatus(400);
    });
});

async function removeBooksFromExchange(req, res) {
    //First set the books to no longer in exchange

    const exchange = await BookExchange.findById(req.params.id);
    if(!exchange) {
        return false;
    }

    const updateBody = {
        isBookOutForExchange: false
    }

    await Book.findByIdAndUpdate(exchange.bookOne, updateBody);
    if(exchange.bookTwo) {
        await Book.findByIdAndUpdate(exchange.bookTwo, updateBody);
    }

    return true;
}

async function isUserFromExchange(req, res) {
    const exchangeDoc = await BookExchange.findById(req.params.id);
    if(!exchangeDoc) {
        return false;
    }
    if(exchangeDoc.participantOne.toString() == req.userId) {
        return true;
    }
    if(exchangeDoc.participantTwo.toString() == req.userId) {
        return true;
    }
    return false;
}



export { router as BookExchangeController };
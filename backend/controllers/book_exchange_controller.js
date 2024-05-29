import express from 'express'
import mongoose from 'mongoose'
import User from '../db_models/user_model.js'
import Book from '../db_models/book_model.js'
import BookExchange from '../db_models/book_exchange_model.js'
import validateJWT from '../security/validate_jwt.js'

const router = express.Router();

/*
Endpoints Needed:
Get Book Exchanges by User ID
Start Book Exchange
Choose Offer on Requested Exchange
Accept Full Exchange
Confirm Exchange
Confirm Finished Reading
Confirm Re-Exchange
*/

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

router.get('/getbyuser/:id', (req, res) => {
    BookExchange.find({
        $or: [
            {participantOne: req.params.id},
            {participantTwo: req.params.id}
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
router.post('/createExchange', validateJWT(), (req, res) => {
    Book.findById(req.body.bookId).then(book => {
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

router.post('/acceptTwo/:id', validateJWT(), (req, res) => {
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

        if(requestedBook.bookOwner != exchange.participantOne) {
            res.status(400);
            res.json({
                "reason": "Book Not Owned by Other Participant"
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
            });
        
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
            updateBody["exchangeStatus"] = exchange.exchangeStatus & 1;
        }
        else if(exchange.participantTwo.toString() == req.userId) {
            updateBody["exchangeStatus"] = exchange.exchangeStatus & 2;
        }
        else {
            res.sendStatus(401);
            return;
        }

        const doc = await BookExchange.findByIdAndUpdate(exchange._id,
            updateBody);
        
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
            updateBody["readStatus"] = exchange.exchangeStatus & 1;
        }
        else if(exchange.participantTwo.toString() == req.userId) {
            updateBody["readStatus"] = exchange.exchangeStatus & 2;
        }
        else {
            res.sendStatus(401);
            return;
        }

        const doc = await BookExchange.findByIdAndUpdate(exchange._id,
            updateBody);
        
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
            updateBody["reexchangeStatus"] = exchange.exchangeStatus & 1;
        }
        else if(exchange.participantTwo.toString() == req.userId) {
            updateBody["reexchangeStatus"] = exchange.exchangeStatus & 2;
        }
        else {
            res.sendStatus(401);
            return;
        }

        if(reexchangeStatus == 3) {
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
                    exchangedBooks: exchange.bookTwo
                }
            });

            await User.findByIdAndUpdate(exchange.participantTwo, {
                $push: {
                    exchangedBooks: exchange.bookOne
                }
            });

            await BookExchange.findByIdAndDelete(exchange._id);

            res.json({
                "reason": "Complete"
            });
            return;
        }

        const doc = await BookExchange.findByIdAndUpdate(exchange._id,
            updateBody);
        
        res.json(doc);

    }).catch(e => {
        console.log(e);
        res.sendStatus(500);
    });
});

router.delete('/cancel/:id', (req, res) => {
    BookExchange.deleteById(req.params.id).then(() => {
        res.sendStatus(200);
    }).catch(e => {
        console.log(e);
        res.sendStatus(400);
    });
});



export { router as BookExchangeController };
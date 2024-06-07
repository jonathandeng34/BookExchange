import mongoose from 'mongoose'
import express from 'express'
import User from '../db_models/user_model.js';
import Book from '../db_models/book_model.js'
import { validateID } from '../frontend_models/validate_schema.js';
import validateJWT from '../security/validate_jwt.js';



const router = express.Router();


function shuffle(array) {
    let currentIndex = array.length;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  }

//TODO: getUserByID -- first draft
router.get('/get/:id', validateID(), (req, res) => {
    User.findOne({
        _id: req.params.id
    }).select('_id username userRating').then((user) => {
        if (!user) {
            res.status(404).json({
                "reason": "User Not Found!"
            });
            return;
        }
        res.json(user);
    }).catch((e) => {
        console.log(e);
        res.sendStatus(500);
    });
});

router.get('/getself', validateJWT(), (req, res) => {
    User.findOne({
        _id: req.userId
    }).then((user) => {
        if (!user) {
            res.status(404).json({
                "reason": "User Not Found!"
            });
            return;
        }
        res.json(user);
    }).catch((e) => {
        console.log(e);
        res.sendStatus(500);
    });
});

router.get('/recommendation', validateJWT(), (req, res) => {
    User.findById(req.userId)
    .populate('exchangedBooks', '_id genre')
    .then(async (user) => {
        if(!user) {
            res.status(404);
            res.json({
                "reason": "Unable to find User in Database"
            });
            return;
        }

        //Find the Most Common Genre
        let m = new Map();

        for (const i in user.exchangedBooks) {
            if (!m.get(user.exchangedBooks[i]["genre"])) m.set(user.exchangedBooks[i]["genre"], 1);
            else {
                m.set(user.exchangedBooks[i]["genre"], m.get(user.exchangedBooks[i]["genre"]) + 1);
            }
        }
        let max = 0;
        let el;
        m.forEach((val, key) => {
            if (max < val) {
                max = val;
                el = key;
            }
        });
        if(!el) {
            res.json({
                "genre": null
            });
            return;
        }

        const validBooks = await Book.find({
            genre: el
        });
        const exchangedIds = user.exchangedBooks.map(book => book["_id"].toString());

        let recommendedBooks = validBooks.filter(book => {
            return (!(exchangedIds.includes(book._id.toString())) && (book.bookOwner.toString() !== user._id.toString()));
        });
        shuffle(recommendedBooks);
        recommendedBooks = recommendedBooks.slice(0,3);

        res.json({
            "genre": el,
            "books": recommendedBooks
        });

    });
});



export { router as UserController };


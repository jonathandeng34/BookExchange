import mongoose from 'mongoose'
import express from 'express'
import User from '../db_models/user_model.js';



const router = express.Router();

//TODO: getUserByID -- first draft
router.get('/:id', (req, res) => {
    User.findOne({
        _id: req.params.id
    }).select('_id username userRating').then((user) => {
        if (!user) {
            res.status(404).send("User Not Found!");
            return;
        }
        res.json(user);
    }).catch((e) => {
        console.log(e);
        res.status(500).send("Internal Server Error");
    });
});



export { router as UserController };


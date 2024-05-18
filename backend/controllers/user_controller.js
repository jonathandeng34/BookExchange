import mongoose from 'mongoose'
import express from 'express'
import Book from '../db_models/book_model.js';
import { distance as editDistance } from 'fastest-levenshtein'
import constants from '../constants.js'
import User from '../db_models/user_model.js';





//TODO: getUserByID -- first draft
router.get('/user/:id', (req, res) => {
    User.findOne({
        _id: req.params.id
    }).select('username').then((user) => {
        if (!user) {
            res.status(404).send("User Not Found!");
            return;
        }
        res.json({ username: user.username });
    }).catch((e) => {
        res.status(500).send("Internal Server Error");
    });
});



export { router as UserController };


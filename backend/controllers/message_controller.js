import express from 'express'
import mongoose from 'mongoose'
import User from '../db_models/user_model.js'
import validateJWT from '../security/validate_jwt.js'
import Message from '../db_models/message_model.js'

const router = express.Router();

router.post('/send/:id', validateJWT(), (req, res) => {
    try {
            let newMessage = new Message({
                senderID: req.userId,
                recipientID: req.params.id,
                content: req.body.content,
            });
            newMessage.save().then(doc => {
                res.json(doc);
            });
    } catch (e) {
        console.log(e);
        res.status(500).send("Internal Server Error");      
    }
});




export { router as MessageController };
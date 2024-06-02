import express from 'express'
import mongoose from 'mongoose'
import User from '../db_models/user_model.js'
import validateJWT from '../security/validate_jwt.js'
import Message from '../db_models/message_model.js'

const router = express.Router();

router.get('/:id', validateJWT(), async (req, res) => {
    try {
            let sendUser = await User.findById(req.userId);
            if (!sendUser) {
                res.status(404);
                res.json({
                    "reason": "Sender Doesn't Exist"
                });
                return;
            }
            let recvUser = await User.findById(req.params.id);
            if (!recvUser) {
                res.status(404);
                res.json({
                    "reason": "Recipient Doesn't Exist"
                });
                return;
            }
            const messageHistory = await Message.find({
                $and: [
                    { senderID: new mongoose.Types.ObjectId(req.userId) },
                    { recipientID: new mongoose.Types.ObjectId(req.params.id) }
                ]
            });
            res.status(200);
            res.json(messageHistory);
            return;
    } catch (e) {
        console.log(e);
        res.status(500).send("Internal Server Error");      
    }
    return;
});

router.post('/send/:id', validateJWT(), async (req, res) => {
    try {
            if (req.params.id == req.userId)
            {
                res.status(400);
                res.json({
                    "reason": "Message With Self"
                });
                return;
            }
            let sendUser = await User.findById(req.userId);
            if (!sendUser) {
                res.status(404);
                res.json({
                    "reason": "Sender Doesn't Exist"
                });
                return;
            }
            let recvUser = await User.findById(req.params.id);
            if (!recvUser) {
                res.status(404);
                res.json({
                    "reason": "Recipient Doesn't Exist"
                });
                return;
            }
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
    return;
});




export { router as MessageController };
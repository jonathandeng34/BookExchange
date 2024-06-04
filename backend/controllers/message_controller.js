import express from 'express'
import mongoose from 'mongoose'
import User from '../db_models/user_model.js'
import validateJWT from '../security/validate_jwt.js'
import Message from '../db_models/message_model.js'
import { io, userSocketId } from '../socket.js'
import { validateID } from '../frontend_models/validate_schema.js'
import BookExchange from '../db_models/book_exchange_model.js'
import { MessageSchema } from '../frontend_models/book_exchange_schemas.js'
import validateSchema from '../frontend_models/validate_schema.js'

const router = express.Router();

router.get('/:id', validateID(), validateJWT(), async (req, res) => {
    try {
            let sendUser = await User.findById(req.userId);
            if (!sendUser) {
                res.status(404);
                res.json({
                    "reason": "Sender Doesn't Exist"
                });
                return;
            }

            let exchange = await BookExchange.findById(req.params.id);

            if(!exchange) {
                res.status(404);
                res.json({
                    "reason": "Book Exchange Doesn't Exist"
                });
                return;
            }

            const messageHistory = await Message.find({
                exchangeID: req.params.id
            }).populate('senderID', '_id username');


            res.status(200);
            res.json(messageHistory);
            return;
    } catch (e) {
        console.log(e);
        res.status(500).send("Internal Server Error");      
    }
    return;
});

router.post('/send/:id', validateID(), validateSchema(MessageSchema), validateJWT(), async (req, res) => {
    try {
            let sendUser = await User.findById(req.userId);
            if (!sendUser) {
                res.status(404);
                res.json({
                    "reason": "Sender Doesn't Exist"
                });
                return;
            }

            let exchange = await BookExchange.findById(req.params.id);
            if(!exchange) {
                res.status(404);
                res.json({
                    "reason": "Exchange Doesn't Exist"
                });
                return;
            }

            let newMessage = new Message({
                senderID: req.userId,
                exchangeID: req.params.id,
                content: req.body.content,
            });

            const revSockets = userSocketId(req.params.id);

            if(revSockets) {
                for(const sock in revSockets) {
                    io.to(revSockets[sock]).emit("message", newMessage);
                }
            }

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
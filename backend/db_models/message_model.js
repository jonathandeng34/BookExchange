import mongoose from 'mongoose'

const MessageSchema = new mongoose.Schema({
    senderID: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    recipientID: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    content: {
        type: String,
        minlength: 1,
        required: true,
    }
}, {timestamps: true});

const Message = mongoose.model('Message', MessageSchema)

export default Message;

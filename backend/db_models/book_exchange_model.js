import mongoose from "mongoose";

//Properties:
// Participant 1 (Object ID)
// Participant 2 (Object ID)
// Book 1 (Book ID)
// Book 2 (Book ID; optional)
// Accepted Participant 2 (Boolean)
// Accepted Participant 1 (Boolean)
// Exchange Status (0-3)
// Read Status (0-3)
// Re-Exchange Status (0-3)

const BookExchangeSchema = new mongoose.Schema({
    participantOne: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    participantTwo: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    bookOne: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'Book'
    },
    bookTwo: {
        type: mongoose.Types.ObjectId,
        required: false,
        ref: 'Book'
    },
    acceptedOne: {
        type: Boolean,
        required: true
    },
    acceptedTwo: {
        type: Boolean,
        required: true
    },
    exchangeStatus: {
        type: Number,
        required: true,
        min: 0,
        max: 3
    },
    readStatus: {
        type: Number,
        required: true,
        min: 0,
        max: 3
    },
    reexchangeStatus: {
        type: Number,
        required: true,
        min: 0,
        max: 3
    }
});

const BookExchange = mongoose.model('BookExchange', BookExchangeSchema);

export default BookExchange;
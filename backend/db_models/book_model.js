import mongoose from 'mongoose'

const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    author: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    genre: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    isBookOutForExchange: {
        type: Boolean,
        required: true,
        default: false
    },
    bookOwner: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'User'
    }
});

//Create a model for the "books" collection
const Book = mongoose.model('Book', BookSchema)

export default Book;
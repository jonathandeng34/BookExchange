import mongoose, { mongo } from 'mongoose';

const BookCommentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    bookId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'Book'
    },
    publicationDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    commentText: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    starRating:  {
        type: Number,
        required: true,
        min: 1,
        max: 5
    }
});

// Create a model for the "bookComments" collection
const BookComment = mongoose.model('BookComment', BookCommentSchema);

export default BookComment;

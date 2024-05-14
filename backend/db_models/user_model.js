import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    password: { //Should be encrypted or something
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    userRating: {
        type: Number,
        required: true,
        default: 0
    }
});

//Create a model for the "users" collection
const User = mongoose.model('User', UserSchema)

export default User;
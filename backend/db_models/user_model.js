import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

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
    },
    exchangedBooks: [{
        type: mongoose.Types.ObjectId,
        ref: 'Book'
    }]
});

UserSchema.pre(/(^save|[Uu]pdate)/, async function(next) {

    let updateObj = this;

    if(this.getUpdate) {
        updateObj = this.getUpdate();
    }

    if (this.isModified && !this.isModified('password')) {
        return next();
    }
    if(!updateObj.password) {
        return next();
    }



    const salt = await bcrypt.genSalt();
    updateObj.password = await bcrypt.hash(updateObj.password, salt);
    next();
});

//Create a model for the "users" collection
const User = mongoose.model('User', UserSchema)

export default User;
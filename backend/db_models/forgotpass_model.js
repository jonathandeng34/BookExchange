import mongoose from 'mongoose';

const ForgotPasswordSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    code: {
        type: String,
        required: true,
        minlength: 4,
        trim: true
    },
    expirationDate: {
        type: Date,
        required: true
    }
});

const ForgotPasswordModel = mongoose.model('ForgotPassword', ForgotPasswordSchema);

export default ForgotPasswordModel;
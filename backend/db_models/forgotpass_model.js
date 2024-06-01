import mongoose from 'mongoose';

const ForgotPasswordSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    expirationDate: {
        type: Date,
        required: true
    }
});

const ForgotPasswordModel = mongoose.model('ForgotPassword', ForgotPasswordSchema);

export default ForgotPasswordModel;
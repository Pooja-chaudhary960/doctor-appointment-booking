import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: "data:image/png;base64,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"
    },
    address: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        default: "Not Selected"
    },

    dob: {
        type: String,
        default: "Not selected"
    },
    phone: {
        type: String,
        default: '000000000'
    }


})

const userModel = mongoose.models.user || mongoose.model('user', userSchema)


export default userModel;
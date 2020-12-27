const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    email: {
        type: String,
        trim: true,
        required: true
    },
    password :{
        type: String,
        trim: true,
        required: true
    }
}, {timestamps: true})

const User = mongoose.model('User', UserSchema);
module.exports = User;
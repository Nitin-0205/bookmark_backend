const mongoose = require('mongoose');

let date = new Date();
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: String,
        default: date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear(),
    }

});

mongoose.model("User", userSchema);

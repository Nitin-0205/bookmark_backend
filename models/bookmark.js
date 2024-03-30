const mongoose = require('mongoose');

let date = new Date();
const bookmarkSchema = new mongoose.Schema({
    title: {
        type: String,
        required: false
    },
    category: {
        type: String,
        required: false,
        default: "unsorted",
    },
    url: {
        type: String,
        required: false
    },
    tag: {
        type: [String],
        required: false
    },
    date: {
        type: String,
        default: date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear(),
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

mongoose.model("Bookmark", bookmarkSchema);

const mongoose = require('mongoose')

const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    books: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Book"
        }
    ]
});
const bookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    publishedDate: {
        type: String,
    },
    genres: {
        type: [String]
    },
    //_id : 1234567532
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Author"
    }
})
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    role: {
        type: String,
        required: true
    }
})
let User = mongoose.model("User", userSchema)
let Book = mongoose.model("Book", bookSchema)
let Author = mongoose.model("Author", authorSchema)
module.exports = { Book, Author , User};
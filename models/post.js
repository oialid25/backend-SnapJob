const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    content: String,
    userid: mongoose.Schema.Types.ObjectId,
    username: String,
    profilePic: String,
    likes: []
}, { timestamps: true });

module.exports = mongoose.model('post', postSchema);
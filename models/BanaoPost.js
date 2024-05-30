const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true, trim: true },
    likes: { type: Number, default: 0 },
    comments: [{
        author: {
            type: String,
            required: true
        },
        text: {
            type: String,
            required: true
        }
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('BanaoPost', postSchema);

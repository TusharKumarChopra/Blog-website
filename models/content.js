const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema( {
    title: {
        type: String,
        required: true
    },
    bodyContent: {
        type: String,
        required: true
    }
});

const Content = mongoose.model('Content', contentSchema);

module.exports = Content;
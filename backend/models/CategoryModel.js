const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String
    },
    titleimage: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Category', categorySchema);

const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    _id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true,
        unique: true
    }
});

module.exports = mongoose.model('Category', categorySchema);

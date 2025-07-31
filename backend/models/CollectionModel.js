const mongoose = require("mongoose");

const collectionSchema = new mongoose.Schema({
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    name: {
        type: String,
        required: true
    },
    titleImage: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
});

module.exports = mongoose.model("Collection", collectionSchema);
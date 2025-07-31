const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    collection: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Collection",
        required: true
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Product", productSchema);
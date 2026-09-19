const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    catNo: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
    },
    collectionRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Collection',
      required: true,
    },
    description: {
      type: String,
      trim: true,
    },
    price:{
      type: Number,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
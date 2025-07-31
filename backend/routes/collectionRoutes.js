const express = require('express');
const router = express.Router();
const {
  getAllCategories,
  getAllCollectionsbyCategory,
  getProductsbyCollectionId,
  createCollection,
  deleteCollection,
} = require('../controllers/collectionController');

router.get('/getcategories', getAllCategories);
router.get('/collections/:collectionId', getProductsbyCollectionId);
router.get('/:categoryId', getAllCollectionsbyCategory);
router.post('/collections', createCollection);
router.delete('/collections/:collectionId', deleteCollection);

module.exports = router;
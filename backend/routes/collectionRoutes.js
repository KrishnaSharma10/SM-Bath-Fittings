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
router.post('/createcollection', createCollection);
router.get('/collections/:collectionId', getProductsbyCollectionId);
router.get('/:categoryId', getAllCollectionsbyCategory);
router.delete('/collections/delete/:collectionId', deleteCollection);

module.exports = router;
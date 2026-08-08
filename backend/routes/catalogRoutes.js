const express = require('express');
const router = express.Router();
const {
  getAllCategories,
  getAllCollectionsbyCategory,
  getProductsbyCollectionId,
} = require('../controllers/catalogController');

router.get('/categories', getAllCategories);
router.get('/collections/:categoryId', getAllCollectionsbyCategory);
router.get('/collections/:collectionId/products', getProductsbyCollectionId);

// router.post('/collections/create', authMiddleware, createCollection);
// router.delete('/collections/delete/:collectionId', authMiddleware, deleteCollection);

module.exports = router;
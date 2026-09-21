const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const uploadSingleImage = require('../middleware/uploadMiddleware');
const { uploadImage } = require('../controllers/uploadController');
const {
  getAllCategories,
  getAllCollectionsbyCategory,
  getProductsbyCollectionId,
  getAllCollections,
  getCollectionById,
  getAllProducts,
  getProductById,
  createCollection,
  updateCollection,
  deleteCollection,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/catalogController');

/* ---------- Public (the website) ---------- */
router.get('/categories', getAllCategories);
router.get('/collections/:categoryId', getAllCollectionsbyCategory);
router.get('/collections/:collectionId/products', getProductsbyCollectionId);

/* ---------- Reads for the admin edit lists and forms ---------- */
router.get('/collections', getAllCollections);          // ?category=&q=
router.get('/collection/:collectionId', getCollectionById);
router.get('/products', getAllProducts);                // ?collection=&category=&q=
router.get('/products/:productId', getProductById);

/* ---------- Admin only (needs a valid login token) ---------- */
// Login is checked first, so only the admin can upload. Returns { url }.
router.post('/upload', authMiddleware, uploadSingleImage, uploadImage);

router.post('/collections', authMiddleware, createCollection);
router.put('/collections/:collectionId', authMiddleware, updateCollection);
router.delete('/collections/:collectionId', authMiddleware, deleteCollection);

router.post('/products', authMiddleware, createProduct);
router.put('/products/:productId', authMiddleware, updateProduct);
router.delete('/products/:productId', authMiddleware, deleteProduct);

module.exports = router;
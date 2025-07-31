const express = require('express');
const router = express.Router();
const {
  getAllCollectionsbyCategory,
  getCollectionById,
  createCollection,
  updateCollection,
  deleteCollection
} = require('../controllers/collectionController');

router.get('/:categoryid', getAllCollectionsbyCategory);
router.get('/collections/:collectionid', getCollectionById);
router.post('/collections', createCollection);
router.put('/collections/:collectionid', updateCollection);
router.delete('/collections/:collectionid', deleteCollection);

module.exports = router;
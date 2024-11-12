const express = require('express');
const router = express.Router();
const { getAllImages,getImage,createImage,upload } = require('../controllers/uploadController');

// Route to handle image upload
router.post('/', upload.single('image'), createImage);

// Route to get image by ID
router.get('/:id', getImage);

// Route to get all images
router.get('/', getAllImages);

module.exports = router;

const multer = require('multer');
const sharp = require('sharp');
const Image = require('../models/uploadSchema');

// Configure multer to store the uploaded file in memory
const storage = multer.memoryStorage();  // We use memory storage for MongoDB storage
const upload = multer({ storage: storage });  // Multer setup

// Controller function to create and store image
const createImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ msg: 'No file uploaded' });
    }

    // Use sharp to resize and convert the image
    const processedImageBuffer = await sharp(req.file.buffer)
      .resize(1080, 1080)  // Resize to 1080x1080 pixels
      .toFormat('jpeg')    // Convert to JPEG format
      .jpeg({ quality: 80 })  // Set JPEG quality (you can adjust this as needed)
      .toBuffer();  // Convert to buffer to save in MongoDB

    // Save the processed image buffer directly in MongoDB
    const uploadImage = await Image.create({
      image: processedImageBuffer // Save the processed image buffer
    });

    res.status(201).json(uploadImage);  // Return the saved image details
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Controller function to get an image by ID
const getImage = async (req, res) => {
    try {
      const image = await Image.findById(req.params.id); // Find image by ID
  
      if (!image) {
        return res.status(404).json({ msg: 'Image not found' });
      }
  
      // Send the image buffer as a base64-encoded string
      res.status(200).json({
        image: `data:image/jpeg;base64,${image.image.toString('base64')}`, // Convert buffer to base64
      });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
};

const getAllImages = async (req, res) => {
  try {
    const images = await Image.find(); // Retrieve all images
    res.status(200).json(images.map(image => ({
      _id: image._id,
      image: `data:image/jpeg;base64,${image.image.toString('base64')}`
    })));
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

module.exports = { getAllImages,createImage, getImage,upload };

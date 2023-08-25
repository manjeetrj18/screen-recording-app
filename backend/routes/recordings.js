const express = require('express');
const multer = require('multer');
const path = require('path');

const recordScreen = require('../controllers/recordingController');

const router = express.Router();

const storage = multer.diskStorage({
  destination: path.join(__dirname, 'uploads'),
  filename: (req, file, cb) => {
    cb(null, `recorded-video-${Date.now()}.webm`);
  },
});

const upload = multer({ storage });

router.route('/recording').post(upload.single('video'), recordScreen);

module.exports = router;

const Recording = require('../models/recordingModel');

const recordScreen = async (req, res) => {
  try {
    const videoPath = req.file.path;
    const videoURL = `http://localhost:5000/${videoPath}`;
    const recording = new Recording({
      message: 'Recording saved successfully',
      url: videoURL,
    });
    await recording.save();
    res.status(200).json({ message: 'Recording saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
};

module.exports = recordScreen;

const mongoose = require('mongoose');

const recordingSchema = mongoose.Schema({
  recording: {
    url: String,
  },
});

const Recording = mongoose.model('Recording', recordingSchema);

module.exports = Recording;

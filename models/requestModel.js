const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  inputUrl: String,
  outputUrl: String,
});

const requestSchema = new mongoose.Schema({
  requestId: { type: String, unique: true, required: true },
  productName: { type: String, required: true },
  images: [imageSchema],
  status: { type: String, default: 'Pending', enum: ['Pending', 'Processing', 'Completed', 'Failed'] },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Request', requestSchema);

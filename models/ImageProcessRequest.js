// models/ImageProcessRequest.js
const mongoose = require('mongoose');

const imageProcessRequestSchema = new mongoose.Schema({
    requestId: { type: String, required: true, unique: true },
    products: [{
        serialNumber: { type: Number, required: true },
        productName: { type: String, required: true },
        inputImageUrls: [String],
        outputImageUrls: [String],
    }],
    status: { type: String, default: 'Pending' },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('ImageProcessRequest', imageProcessRequestSchema);

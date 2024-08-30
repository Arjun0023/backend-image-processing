const sharp = require('sharp');
const { v4: uuidv4 } = require('uuid');
const Request = require('../models/requestModel');
const parseCSV = require('../utils/csvParser');
const asyncHandler = require('../middleware/asyncHandler');
const path = require('path');

const processImage = async (url) => {
  const outputPath = path.join(__dirname, '..', 'output', `${uuidv4()}.jpg`);
  await sharp({ url })
    .resize({ width: 800 })
    .jpeg({ quality: 50 })
    .toFile(outputPath);
  return outputPath;
};

const uploadCSV = asyncHandler(async (req, res) => {
  const csvPath = req.file.path;
  const csvData = await parseCSV(csvPath);

  const requestId = uuidv4();

  const promises = csvData.map(async (row) => {
    const { 'Product Name': productName, 'Input Image Urls': inputUrls } = row;
    const images = await Promise.all(inputUrls.split(',').map(async (url) => {
      const outputUrl = await processImage(url.trim());
      return { inputUrl: url, outputUrl };
    }));

    return Request.create({ requestId, productName, images });
  });

  await Promise.all(promises);

  res.status(200).json({ requestId });
});

const getStatus = asyncHandler(async (req, res) => {
  const { requestId } = req.params;
  const request = await Request.findOne({ requestId });

  if (!request) {
    return res.status(404).json({ message: 'Request not found' });
  }

  res.status(200).json({ status: request.status, data: request });
});

module.exports = { uploadCSV, getStatus };

const express = require('express');
const multer = require('multer');
const path = require('path');
const { uploadCSV, getStatus } = require('../controllers/imageController');
const router = express.Router();

const storage = multer.memoryStorage(); 
const upload = multer({ dest: 'uploads/' });


router.post('/upload', upload.single('file'), uploadCSV);
router.get('/status/:requestId', getStatus);

module.exports = router;

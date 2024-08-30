const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const imageRoutes = require('./routes/ImageRoutes');
const webhookRoutes = require('./routes/webhookRoutes');
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');


const app = express();


connectDB();

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(morgan('dev')); 
app.use(helmet()); 
app.use(cors()); 


app.use('/api/v1/images', imageRoutes); 
app.use('/api/v1/webhook', webhookRoutes); 

// Custom error handling middleware
app.use(notFound); 
app.use(errorHandler); 

module.exports = app;

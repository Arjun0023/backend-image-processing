require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const imageRoutes = require('./routes/ImageRoutes');
const webhookRoutes = require('./routes/webhookRoutes');

connectDB();

const app = express();

app.use(express.json());
app.use('/api/v1/images', imageRoutes);
app.use('/api/v1/webhook', webhookRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

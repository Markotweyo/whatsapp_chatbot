//Set up the server and configure routing
const express = require('express');
const bodyParser = require('body-parser');
const webhookRoutes = require('./routes/webhook');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use('/api/webhook', webhookRoutes);

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

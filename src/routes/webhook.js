const express = require('express');
const { handleMessage } = require('../controllers/chatbotController');

const router = express.Router();

router.post('/', handleMessage);

module.exports = router;

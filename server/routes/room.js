const express = require('express');
const router = express.Router();

const { setupRoom } = require('../controllers/setupRoom');

router.post('/init', setupRoom);

module.exports = router;
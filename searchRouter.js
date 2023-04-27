const express = require('express');
const router = express.Router();

const searchController = require('./searchController.js');

router.get('/search/:query', searchController.getSearch);

module.exports = router;
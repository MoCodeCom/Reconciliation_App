const express = require('express');
const router = express.Router();

const controller = require('../controllers/dataController');
/********************************************/

router.get('/data', controller.getDataController);

module.exports = router;
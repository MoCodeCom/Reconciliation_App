const express = require('express');
const router = express.Router();
const controller = require('../controllers/processController');

router.get('/process', controller.getProcessController);

/*----------------------------------------------------------------*/


module.exports = router;
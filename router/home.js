const express = require('express');
const router = express.Router();

const controller = require('../controllers/homeController');
//*******************************************/

router.get('/', controller.getHomeController);
router.post('/', controller.postData);
//router.post('/data', controller.postCsvFile);


module.exports = router;
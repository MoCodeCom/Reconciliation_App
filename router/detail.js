const express = require('express');
const router = express.Router();

const controller = require('../controllers/detailController');
/*---------------------------------------------*/

router.get('/detail/:id', controller.getDetailController);

module.exports = router;
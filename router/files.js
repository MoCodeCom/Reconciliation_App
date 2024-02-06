const express = require('express');
const router = express.Router();
const controller = require('../controllers/filesController');


router.get('/files', controller.getFilesController);

router.post('/files', controller.postFilesController);
router.post('/process', controller.postCsvFile);
router.post('/data', controller.postReco);
/*----------------------------------------------------------------*/





module.exports = router;
const express = require('express');
router = express.Router();
ImageResizerContoller = require('../controllers/imageResizeController');


router.post('/auto_image_resizer', ImageResizerContoller.checkParams, ImageResizerContoller.autoImageSize);


module.exports = router;
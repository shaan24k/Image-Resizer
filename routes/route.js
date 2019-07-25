const express = require('express');
router = express.Router();
ImageResizerContoller = require('../controllers/imageResizeController');
var multer = require('multer');
let upload = multer();


router.post('/auto_image_resizer', upload.single('file'), ImageResizerContoller.checkParams, ImageResizerContoller.autoImageSize);


module.exports = router;
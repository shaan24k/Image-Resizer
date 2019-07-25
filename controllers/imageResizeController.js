var fs = require('fs'),
    Jimp = require('jimp');
const { failure_callback, success_callback, isValid, autoResizer } = require('../common');

module.exports = {


    checkParams: function(req, res, next) { //check the required params

        if (isValid(req.file)) {

            return failure_callback(res, ['file is required', 400]);

        } else if (isValid(req.body.sizes)) {

            return failure_callback(res, ['sizes object is missing', 401]);

        } else return next();
    },


    autoImageSize: function(req, res) { //create devision 

        let sizes = req.body.sizes.trim().split(',');
        let file = req.file;
        let dir = `uploads/original`;
        let fileName = `${dir}/${file.originalname}`;

        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        fs.writeFile(fileName, file.buffer, (err) => {

            if (err) return failure_callback(res, [err.message, 403]);
            else
                console.log('The file has been saved! ');

            new Jimp(fileName, async function(err, image) {

                if (err) return failure_callback(res, [err.message, 400]);

                else

                    var w = image.bitmap.width; //  width of the image
                var h = image.bitmap.height; // height of the image

                for (var i = 0; i < sizes.length; i++) {

                    let mode = 0;
                    let size = sizes[i].split('x');
                    let Width = size[0];
                    let Height = size[1];
                    let destName = `${sizes[i]}/${file.originalname}`;
                    mode = (w > Width) ? 1 : 2;
                    mode = (h > Height) ? 1 : 2;

                    await autoResizer([fileName, destName, Width, Height, mode]).then(function(rest) {

                        if ((i + 1) == sizes.length) {

                            return success_callback(res, rest);
                        }

                    }).catch(err => {

                        return failure_callback(res, [err.message, 500]);

                    });

                }


            });

        });


    },

}
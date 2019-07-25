var Jimp = require('jimp');

module.exports = {
    failure_callback: function(res, data) {

        (!data[1]) ? code = 500: code = data[1];
        (!data[0]) ? message = "Internal server error. Please try again later.": message = data[0];

        return res.status(code).json({ success: false, error: message });
    },

    success_callback: function(res, msg) {
        if (!msg) return res.json({ success: true, message: "success" });
        else
            return res.json({ success: true, message: msg });
    },
    parse_json: function(jsonStr, dValue) {
        var json;
        try {
            json = JSON.parse(jsonStr);
        } catch (e) {
            json = {};
            if (dValue) json = dValue;
        }
        return json;
    },
    parse_array: function(arrayStr, dValue) {
        var array;
        try {
            array = JSON.parse(arrayStr);
        } catch (e) {
            array = [];
            if (dValue) array = dValue;
        }
        return array;
    },

    isValid: function(param) {

        if (param == undefined || param == '' || param == null) {

            return true;

        } else {

            return false;

        }

    },

    autoResizer: function(data) {

        return new Promise((resolve, reject) => {

            var sourceImage = data[0].trim(),
                dstName = data[1].trim(),
                destWidth = parseInt(data[2]),
                destHeight = parseInt(data[3]),
                resizeMode = parseInt(data[4]);

            let destImageName = `./uploads/${dstName}`;

            if (resizeMode == 1) {

                Jimp.read(sourceImage)
                    .then(img => {
                        return img
                            .cover(destWidth, destHeight)
                            .write(`${destImageName}`); // save

                    })
                    .catch(err => {
                        reject(err.message);
                    });


                resolve('Image resize with mode 1 successfully done.');

            } else

                Jimp.read(sourceImage, function(err, image1) {

                image1.scaleToFit(destWidth, destHeight);

                var newHight = image1.bitmap.height;
                var newWidth = image1.bitmap.width;

                var newHalfHeigt = newHight / 2;
                var originalHalfHeight = destHeight / 2;
                var newY = originalHalfHeight - newHalfHeigt;

                var newHalfWidth = newWidth / 2;
                var originalHalfWidth = destWidth / 2;
                var newX = originalHalfWidth - newHalfWidth;

                new Jimp(destWidth, destHeight, 0xffffffff, function(err, image) {
                    image.opacity(0, function(err, image) {

                        image.composite(image1, newX, newY);

                        image.write(destImageName);
                    });
                });

                resolve('Image resize with mode 2 successfully done.');

            })

        })

    }
};
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

    }
};
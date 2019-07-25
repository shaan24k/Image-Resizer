const fs = require('fs'),
    cors = require('cors'),
    express = require('express'),
    bodyParser = require('body-parser'),
    router = require('./routes/route');
app = express();

require('dotenv').config();


app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use('/api', router);
app.use('/upload', express.static('upload'));

app.listen(process.env.PORT || 1000, () => {
    console.log('app listening on port ' + process.env.PORT || 1000)
});



// error handlers
app.use(function(req, res) {
    res.status(404).json({ error: 1, message: 'No route found!' });
});

app.use(function(req, res) {
    res.status(500).json({ error: 1, message: 'Internal server error!' });
});


//module.exports = { app, fs };
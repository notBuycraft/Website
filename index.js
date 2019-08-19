let app = require('express')();
let http = require('http').createServer(app);
let express = require('express');
let session = require('express-session');

// set the view engine to ejs
app.set('view engine', 'ejs');

// store page
app.get('/', function (req, res) {
    res.render('store/pages/index');
});

// admin page
app.get('/admin', function (req, res) {
    res.render('admin/pages/index');
});

app.use(express.static(__dirname + '/public'));

http.listen(3000, function () {
    console.log('listening on *:3000');
});
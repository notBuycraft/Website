const config = require("./config.json");

let app = require('express')();
let http = require('http').createServer(app);
let express = require('express');
let mongoose = require('mongoose');
let session = require('express-session');
let MongoStore = require('connect-mongo')(session);
let bodyParser = require('body-parser');

//connect to MongoDB
mongoose.connect(config.mongodb.uri, {useNewUrlParser: true}).then(r => console.log("-----"));
let db = mongoose.connection;
mongoose.set('useCreateIndex', true);
//handle mongo error
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', function () {
    console.log('Connected to MongoDB with no errors.');
});

//use sessions for tracking logins
app.use(session({
    secret: 'work hard',
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
        mongooseConnection: db
    })
}));

//Create an admin account if there isn't one.
let User = require('./models/user');
let randomAdminPass = Math.random().toString(36).slice(-8);
let userData = {
    email: "admin@admin.xyz",
    username: "admin",
    firstname: "Super",
    lastname: "Admin",
    password: randomAdminPass,
    enabled: true
};
User.create(userData, function (error) {
    if (error) {
        console.log("An admin account already exists. Not creating one.");
    } else {
        console.log("Created admin account. Username: 'admin' Password: '" + randomAdminPass + "'");
    }
});


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));
// parse application/json
app.use(bodyParser.json());

// set the view engine to ejs
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

const routes = require('./routes/');
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    let err = new Error('File Not Found');
    err.status = 404;
    next(err);
});

// error handler
// define as the last app.use callback
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.send(err.message);
});

http.listen(config.port, function () {
    console.log('listening on *:' + config.port);
});
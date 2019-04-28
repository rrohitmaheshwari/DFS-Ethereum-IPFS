var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
const session = require('express-session');
var fileUpload = require('express-fileupload');
var mongoStore = require("connect-mongo")(session);
const config = require('config');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
//mongosetup
let expressMongoDb = require('express-mongo-db');
app.use(expressMongoDb(config.mongodb_url))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

var corsOptions = {
    origin: process.env.REACT_ORIGIN_URL || 'http://localhost:3000',
    credentials: true,
}
app.use(cors(corsOptions));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.use(session({
    secret: '1c4=%vs7desjy)h49@2qh&&((*0saggy3$^wi8pf#dlv9uko9(',
    resave: false,
    saveUninitialized: true,
    duration: 30 * 60 * 1000,    //setting the time for active session 10 min
    activeDuration: 5 * 60 * 1000,
    store:
        new mongoStore({
            url: config.mongoSessionURL
        })
}))

app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use((req, res, next) => {
    let url= process.env.FRONTEND_URL | '*';
    res.header('Access-Control-Allow-Origin', url);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;

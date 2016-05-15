// basic setup
var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var passport = require('passport');
var flash = require('connect-flash');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var session = require('express-session');
var database = require('./config/database');

// configuration
mongoose.connect(database.url);

require('./config/passport')(passport);

app.use(express.static('public'));
app.use(express.static('node_modules'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type:'application/vnd.api+json'}));
app.use(cookieParser());
app.use(methodOverride());

app.use(session({secret : 'koniki'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// routes
require('./app/routes')(app, passport);

app.listen(port);
console.log("App listening on port 8080");

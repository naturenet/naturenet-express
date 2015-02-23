var express = require('express')
var app = express()

var _ = require('lodash')


var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var session = require('express-session')
var passport = require('passport')

var app = express()

// use jade as the view engine
app.set('view engine', 'jade')

app.use(express.static(__dirname + '/public'))
app.use(cookieParser())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false
    }
}))

// Using the flash middleware provided by connect-flash to store messages in session
// and displaying in templates
var flash = require('connect-flash')
app.use(flash())

// Use Database
var db = require('./lib/db')
app.use(db())

// Use Passports
require('./lib/passport')(app)

// Load Routes
var routes = require('./routes/account')()
app.use('/', routes)

var routes = require('./routes/note')()
app.use('/note', routes)

module.exports = app
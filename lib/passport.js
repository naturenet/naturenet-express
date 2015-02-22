var debug = require('debug')('nn.passport')
var LocalStrategy = require('passport-local').Strategy;
// var bCrypt = require('bcrypt-nodejs');

var passport = require('passport')
var db = require('./db')


var isValidPassword = function(user, password) {
    return bCrypt.compareSync(password, user.password);
}

module.exports = function(app) {

    app.use(passport.initialize())
    app.use(passport.session())

    passport.serializeUser(function(user, done) {
        debug('serializing user {_id: %s}', user._id)
        done(null, user._id)
    });

    passport.deserializeUser(function(id, done) {
        debug('deserializing user {_id: %s}', id)
        db.Account.findOne({_id: id}, function(err, user) {
            done(err, user)
        })
    })

    passport.use('login', new LocalStrategy({
            passReqToCallback: true
        },
        function(req, username, password, done) {    
            debug('attempt to login with username: %s', username)
            req.db.Account.findOne({
                    'username': username
                },
                function(err, account) {

                    if (err)
                        return done(err)

                    debug('found %o', account)
                    return done(null, account)

                })
        }))

    app.post('/login', passport.authenticate('login', {
        successRedirect: '/home',
        failureRedirect: '/login',
        failureFlash: true
    }))

}
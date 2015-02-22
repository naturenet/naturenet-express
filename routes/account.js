var express = require('express'),
    router = express.Router()

// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.

var ensureAuthenticated = require('./auth')

module.exports = function() {

    router.get('/login', function(req, res) {
        res.render('login')
    })

    router.get('/signout', function(req, res) {
        req.logout()
        res.redirect('/')
    });


    router.get('/home', ensureAuthenticated, function(req, res) {

        req.db.Note.find({
                'account.username': req.user.username
            },
            function(error, results) {
                res.render('home', {
                    user: req.user,
                    notes: results
                })
            })
    })

    router.get('/', ensureAuthenticated, function(req, res) {
        // if (req.accepts('application/json')) {
        //     console.log('accepts')
        //     res.json(req.user)
        // } else {
        res.send('<html>user</html>')
        // }
    })

    router.post('/comment', ensureAuthenticated, function(req, res, next) {
        console.log(req.body)
        // if (req.accepts('application/json')) {
        //     console.log('accepts')
        //     res.json(req.user)
        // } else {
        req.db.Note.findOne({
            id: req.body.note_id
        }, function(err, note) {
            if (err) {
                next(err)
            }

            console.log('found')

            note.feedbacks.push({
                content: req.body.content
            })
            note.save(function(err) {
                if (err) {
                    next(err)
                }

                console.log('saved')
            })
        })
        // new db.Note({})
        res.send('<html>user</html>')
        // }
    })


    // router.get('/', function(req, res) {
    //     // console.log('req.session.passport:', req.session.passport)
    //     // console.log('isAuthenticated', req.isAuthenticated())
    //     // console.log('user', req.user)
    //     res.redirect('/account/home')
    // })

    return router
}
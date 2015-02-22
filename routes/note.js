var express = require('express')
var router = express.Router()

// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/note/login')
}

module.exports = function(passport) {

    router.get('/login', function(req, res) {
        res.status(200).send('ok')
    })

    // // router.put('/login',  /* Handle Login POST */
    router.put('/login', passport.authenticate('login', {
        successRedirect: '/note/home',
        failureRedirect: '/note/login',
        failureFlash: true
    }))

    router.get('/home', ensureAuthenticated, function(req, res) {
        // console.log('req.session.passport:', req.session.passport)
        // console.log('isAuthenticated', req.isAuthenticated())
        console.log('user', req.user)
        res.status(200).send('ok')
    })



    // router.post('/login', function(req, res) {

    //     res.status(200).send('ok')

    // })

    // function(req, res){
    //     console.log(req)

    //     res.status(200).send('done');

    // })

    // router.get('/:id', function(req, res) {

    //     req.db.Note.findOne({
    //             'id': Number(req.params.id)
    //         },
    //         function(error, results) {

    //             if (error) {
    //                 console.log(error)

    //             } else {

    //                 console.log(results)
    //             }
    //             res.json(results)

    //             // res.render('note', {
    //             //     note: results,
    //             //     user: user
    //             // })
    //         })

    // })

    // router.post('/:id/feedback', function(req, res) {

    //     console.log(req.body)
    //     // console.log(req.db)

    //     res.status(401).send('Unauthorized');


    //     // var user = {username: 'tomyeh'}

    //     // // console.log(req.params.id)
    //     // req.db.Note.findOne({
    //     //         'id': Number(req.params.id)
    //     //     },
    //     //     function(error, results) {


    //     //         if (error) {
    //     //             console.log(error)

    //     //         } else {

    //     //             console.log(results)
    //     //         }


    //     //         // res.json({
    //     //         //     hello: 'world'
    //     //         // })
    //     //         // res.render('note', {
    //     //         //     note: results,
    //     //         //     user: user
    //     //         // })
    //     //     })

    // })

    return router
}
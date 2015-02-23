var express = require('express')
var router = express.Router()

var ensureAuthenticated = require('./auth')

module.exports = function() {

    router.get('/', function(req, res) {

        req.db.Note.find({}, {}, {
                sort: {
                    'created_at': -1
                }
            },
            function(error, results) {

                if (error) {
                    console.log(error)

                } else {

                    console.log(results.length)
                }

                res.render('notes', {
                    notes: results
                })

            })
        // console.log('req.session.passport:', req.session.passport)
        // console.log('isAuthenticated', req.isAuthenticated())
        // console.log('user', req.user)
        // res.status(200).send('ok')
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
var debug = require('debug')('nn.db')

var mockgoose = require('mockgoose');
var Mongoose = require('mongoose').Mongoose;
var mongoose = new Mongoose();
mockgoose(mongoose);
mongoose.connect('mongodb://localhost/TestingDB');

var AccountModel = require('./models/AccountModel')(mongoose)
var NoteModel = require('./models/NoteModel')(mongoose)

var accounts = require('../data/accounts.json').data
var notes = require('../data/notes.json').data

var db = function() {

    var isPopulated = false

    return function(req, res, next) {

        if (!isPopulated) {
            populate(function(err) {
                isPopulated = true
                req.db = db
                next()
            })
        } else {
            req.db = db
            next()
        }

    }
}

accounts = accounts.slice(0, 20)
notes = notes.slice(0, 20)

function populate(done) {
    debug('populating the database with test data')
    NoteModel.create(notes, function(err) {
        AccountModel.create(accounts, function(err) {
            done(err)
        })
    })
}

db.load = function(callback) {
    mockgoose.reset()
    NoteModel.create(notes, function(err) {
        AccountModel.create(accounts, function(err) {
            AccountModel.count(function(err, r) {
                debug("%d accounts loaded", r)
                callback(err)
            })
        })
    })
}

db.Account = AccountModel
db.Note = NoteModel

module.exports = db
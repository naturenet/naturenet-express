var chai = require('chai'),
    expect = require('chai').expect,
    chaiHttp = require('chai-http')


chai.use(chaiHttp)

if (!global.Promise) {
    var q = require('q');
    chai.request.addPromises(q.Promise);
}

var app = require('../app')
// var db = require('../lib/db')

// beforeEach(function(done) {

//     db.load(function(err) {        
//         done()
//     })

// })

describe('login', function() {

    describe('logged in', function() {

        var agent

        beforeEach(function(done) {

            agent = chai.request.agent(app)
            agent
                .post('/login')
                .send({
                    username: 'tomyeh',
                    password: '123'
                })
                .then(function(res) {
                    console.log(res.redirects)
                    done()
                })
        })

        it('/home should work', function(done) {
            agent
                .get('/home')
                .end(function(res) {
                    expect(res).to.have.status(200)
                    expect(res.text).to.contain('tomyeh')
                    done()
                })
        })

    })


    describe('not logged in', function() {

        it('/login succeeds and redirects to /home', function(done) {
            chai.request(app)
                .post('/login')
                .send({
                    username: 'tomyeh',
                    password: '123'
                })
                .then(function(res) {
                    expect(res.redirects[0]).to.contain('/home')
                    done()
                })
        })

        it('/login fails and redirects to /login', function(done) {
            chai.request(app)
                .post('/login')
                .send({
                    username: '',
                    password: ''
                })
                .then(function(res) {
                    // console.log(res.redirects[0])
                    expect(res.redirects[0]).to.contain('/login')
                    done()
                })
        })

        it('/home should redirect to /login', function(done) {
            chai.request(app)
                .get('/home')
                .end(function(res) {
                    // console.log(res.redirects[0])
                    expect(res.redirects[0]).to.contain('/login')
                    done()
                })
        })
    })

})

describe.skip('note', function() {

    var agent,
        note_id = 10

    beforeEach(function(done) {

        agent = chai.request.agent(app)
        agent
            .put('/account/login/')
            .send({
                username: 'tomyeh',
                password: '123'
            })
            .then(function(res) {
                done()
            })
    })

    it('can add a comment', function(done) {

        agent
            .post('/account/comment')
            .send({
                content: 'my new comment',
                note_id: note_id
            })
            .end(function(res) {
                expect(res).to.have.status(200)
                console.log(res.redirects[0])


                db.Note.findOne({
                    id: note_id
                }, function(error, note) {

                    // console.log(note)
                    expect(note.feedbacks.length).to.be.equal(2)
                    done()
                })


                // expect(res.redirects[0]).to.contain('/account/login')
                // done()
            })
        // .set('Accept', 'application/json')
        // .expect('Content-Type', /json/)
        // .expect(200, done);
        // done()


    })


})
//     it.skip('respond with json', function(done) {
//         chai.request(app)
//             .post('/note/10/feedback')
//             .send({
//                 content: 'my new comment',
//                 account_id: 1
//             })
//             .set('Accept', 'application/json')
//             .expect('Content-Type', /json/)
//             .expect(200, done);
//         done()
//     })


//     it('can post with authentication', function(done) {
//         var agent = chai.request.agent(app)
//         agent
//             .put('/note/login')
//             .send({
//                 username: '123',
//                 password: '123'
//             })
//             .then(function(res) {
//                 return agent.get('/note/home')
//                     .then(function(res) {
//                         expect(res).to.have.status(200);
//                         done()
//                     })
//             })
//     })

//     it('/home redirect to login', function(done) {
//         chai.request(app)
//             .get('/note/home')
//             .then(function(res) {
//                 expect(res).to.have.status(200);
//                 done()
//             })
//     })

//     // it('can not post without authentication', function(done) {
//     //     chai.request(app)
//     //         .post('/note/10/feedback')
//     //         .send({
//     //             content: 'my new comment'
//     //         })
//     //         .set('Accept', 'application/json')
//     //         .end(function(err, res) {
//     //             expect(err).to.be.null;
//     //             expect(res).to.have.status(401)
//     //             done()
//     //         })
//     // })


//     // it('can return a note', function(done) {
//     //     chai.request(app)
//     //         .get('/note/10')
//     //         .set('Accept', 'application/json')
//     //         .end(function(err, res) {

//     //             expect(err).to.be.null;
//     //             expect(res).to.have.status(200);
//     //             expect(res).to.be.json

//     //             // console.log(res.body)
//     //             expect(res.body.id).to.be.equal(10)

//     //             done()
//     //         })
//     // })
// })
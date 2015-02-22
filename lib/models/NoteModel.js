'use strict';
module.exports = function(mongoose) {

    var db = mongoose.connection,
        Schema = mongoose.Schema,
        // validate = require('mongoose-validator').validate,    
        bcrypt = require('bcrypt');

    var SALT_WORK_FACTOR = 10;
    var TYPE = 'note';

    var childSchema = new Schema({
        name: String,
        created_at: Date,
        id: Number,
        link: String
    })

    // feedbacks": [
    //         {
    //           "_model_": "Feedback",
    //           "account": {
    //             "_model_": "Account",
    //             "affiliation": null,
    //             "consent": "(Required) I agree that any nature photos I take using the NatureNet application may be uploaded to the tabletop at ACES and/or a website now under development.(Required) I agree to allow any comments, observations, and profile information that I choose to share with others via the online application to be visible to others who use the application at the same time or after me.(Optional) I agree to be videotaped/audiotaped during my participation in this study.(Optional) I agree to complete a short questionnaire during or after my participation in this study.",
    //             "created_at": 1402067836944,
    //             "email": "richellecripe@gmail.com",
    //             "icon_url": "https://dl.dropboxusercontent.com/u/5104407/nntest/avatar.jpg",
    //             "id": 5,
    //             "modified_at": 1402067836944,
    //             "name": "richelle c",
    //             "password": "1234",
    //             "username": "richelle"
    //           },
    //           "content": "aces_landmark3",
    //           "created_at": 1402069846246,
    //           "id": 39,
    //           "kind": "Landmark",
    //           "modified_at": 1402153346036,
    //           "parent_id": null,
    //           "webusername": null
    //         }

    var feedbackSchema = new Schema({
        created_at: Date,
        modified_at: Date,
        content: String,
        kind: String,
        id: Number,
        account: {
            username: String
        }
    })

    // "medias": [
    //         {
    //           "_model_": "Media",
    //           "created_at": 1402762511285,
    //           "id": 185,
    //           "kind": "Photo",
    //           "link": "http://res.cloudinary.com/university-of-colorado/image/upload/v1400187706/remgo23fxaqnppyfmtoz",
    //           "title": ""
    //         }
    //       ],    


    var mediaSchema = new Schema({
        created_at: Date,
        id: String,
        kind: String,
        link: String,
        title: String
    })

    var accountSchema = new Schema({
            username: String
        })
        // // "_model_": "Media",
        //           "created_at": 1402163277239,
        //           "id": 97,
        //           "kind": "Photo",
        //           "link": "http://res.cloudinary.com/university-of-colorado/image/upload/v1400187706/nelbs0lvbfcdszezgp3v",
        //           "title": ""


    // "context": {
    //        "_model_": "Context",
    //        "description": "Do you have a question about a plant or animal that you see? Take a photo and/or ask your question here and an ACES naturalist will be in touch with you later by e-mail.",
    //        "extras": "http://res.cloudinary.com/university-of-colorado/image/upload/v1416516641/question_omtngw.png",
    //        "id": 8,
    //        "kind": "Activity",
    //        "name": "aces_stump",
    //        "site": {
    //          "_model_": "Site",
    //          "description": "Aspen Center for Environmental Studies",
    //          "id": 2,
    //          "image_url": "https://dl.dropboxusercontent.com/u/5104407/nntest/aces.jpg",
    //          "name": "aces"
    //        },
    //        "title": "Ask a Naturalist"
    //      },
    var contextSchema = new Schema({
        title: String
    })


    var schema = new Schema({
        type: {
            type: String,
            'default': TYPE
        },
        id: {
            type: Number
        },
        content: String,
        latitude: String,
        longitude: String,
        kind: String,
        modified_at: Date,
        created_at: Date,
        status: String,
        account: {
            username: String
        },
        feedbacks: [feedbackSchema],
        medias: [mediaSchema],
        context: {
            id: Number,
            title: String
        }
    })

    /**
     * Expose type to outside world.
     * @type {string}
     */
    schema.statics.TYPE = TYPE;

    return db.model(TYPE, schema);
};
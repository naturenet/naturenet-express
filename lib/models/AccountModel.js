'use strict';
module.exports = function(mongoose) {

    var db = mongoose.connection,
        Schema = mongoose.Schema        
        

    var SALT_WORK_FACTOR = 10;
    var TYPE = 'account';

    var schema = new Schema({
        type: {
            type: String,
            'default': TYPE
        },
        id: {
            type: Number
        },
        username: String,        
        // consent: {
        //     type: String,
        //     'default': ''
        // },
        modified_at: {
            type: Date
        },
        created_at: {
            type: Date
        },        
        email: {
            type: String,
            required: false,
            unique: false,
            lowercase: true,
            trim: true
            // validate: [validate({message: 'invalid'}, 'isEmail')]
        },
        password: {
            type: String,
            required: false
            // validate: [validate({message: 'min.length:6'}, 'len', 6)]
        }        
    });

    /**
     * Expose type to outside world.
     * @type {string}
     */
    schema.statics.TYPE = TYPE;

    /**
     * Password Validation. You must call this method as the
     * users password is encrypted.
     * @param pass
     * @param done
     */
    schema.methods.validPassword = function(pass, done) {
        bcrypt.compare(pass, this.password, function(err, valid) {
            if (err) {
                done(err);
            } else {
                done(null, valid);
            }
        });
    };

    /**
     * Before saving encrypt the users password if it has been modified.
     */
    // schema.pre('save', function(next) {
    //     var account = this;

    //     //Password not modified so just continue.
    //     if (!account.isModified('password')) {
    //         return next();
    //     }
    //     // generate a salt
    //     bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    //         if (err) {
    //             return next(err);
    //         }

    //         // hash the password using our new salt
    //         bcrypt.hash(account.password, salt, function(err, hash) {
    //             if (err) {
    //                 next(err);
    //             } else {
    //                 // override the cleartext password with the hashed one
    //                 account.password = hash;
    //                 next();
    //             }
    //         });
    //     });
    // });

    return db.model(TYPE, schema);
};
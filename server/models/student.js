const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const config = require('./../config/config').get(process.env.NODE_ENV);
const SALT_I = 10;

const studentSchema = mongoose.Schema({
    email:{
        type: String,
        required: true,
        trim: true,
        unique: 1
    },
    password:{
        type: String,
        required: true,
        minlength: 6
    },
    name:{
        type: String,
        maxlength: 100
    },
    lastname:{
        type: String,
        maxlength: 100
    },
    token:{
        type: String
    }
});

studentSchema.pre('save', function(next){
    var student = this;

    if(student.isModified('password')){
        bcrypt.genSalt(SALT_I, function(err, salt){
            if(err) return next(err);

            bcrypt.hash(student.password, salt, function(err, hash){
                if(err) return next(err);
                student.password = hash;
                next();
            })
        })

    }else{
        next();
    }
})

studentSchema.methods.comparePassword = function(candidatePassword, cb){
    var student = this;
    bcrypt.compare(candidatePassword, student.password, function(err, isMatch){
        if(err) return cb(err);
        cb(null, isMatch);
    })
}

studentSchema.methods.generateToken = function(cb){
    var student = this;
    var token = jwt.sign(student._id.toHexString(), "SECRETSALT123");

    student.token = token;
    student.save(function(err, student){
        if(err) return cb(err)
        cb(null, student)
    })
}

studentSchema.statics.findByToken = function(token, cb){
    var student = this;

    jwt.verify(token, "SECRETSALT123", function(err, decode){
        student.findOne({"_id": decode, "token": token}, function(err, student){
            if(err) return cb(err);
            cb(null, student);
        })
    })
}

studentSchema.methods.deleteToken = function(token, cb){
    var student = this;

    student.updateOne({$unset:{token:1}}, function(err, student){
        if(err) return cb(err);
        cb(null, student);
    })
}

const Student = mongoose.model('Student', studentSchema);
module.exports = { Student }
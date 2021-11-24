const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const config = require('./../config/config').get(process.env.NODE_ENV);
const SALT_I = 10;

const teacherSchema = mongoose.Schema({
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
    },
    onlineStudents:[{
        type: String
    }],
    offlineStudents:[{
        type: String
    }]
});

teacherSchema.pre('save', function(next){
    var teacher = this;

    if(teacher.isModified('password')){
        bcrypt.genSalt(SALT_I, function(err, salt){
            if(err) return next(err);

            bcrypt.hash(teacher.password, salt, function(err, hash){
                if(err) return next(err);
                teacher.password = hash;
                next();
            })
        })

    }else{
        next();
    }
})

teacherSchema.methods.comparePassword = function(candidatePassword, cb){
    var teacher = this;
    bcrypt.compare(candidatePassword, teacher.password, function(err, isMatch){
        if(err) return cb(err);
        cb(null, isMatch);
    })
}

teacherSchema.methods.generateToken = function(cb){
    var teacher = this;
    var token = jwt.sign(teacher._id.toHexString(), "SECRETSALT123");

    teacher.token = token;
    teacher.save(function(err, teacher){
        if(err) return cb(err)
        cb(null, teacher)
    })
}

teacherSchema.statics.findByToken = function(token, cb){
    var teacher = this;

    jwt.verify(token, "SECRETSALT123", function(err, decode){
        teacher.findOne({"_id": decode, "token": token}, function(err, teacher){
            if(err) return cb(err);
            cb(null, teacher);
        })
    })
}

teacherSchema.methods.deleteToken = function(token, cb){
    var teacher = this;

    student.updateOne({$unset:{token:1}}, function(err, teacher){
        if(err) return cb(err);
        cb(null, teacher);
    })
}

const Teacher = mongoose.model('Teacher', teacherSchema);
module.exports = { Teacher }
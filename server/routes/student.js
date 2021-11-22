const express = require('express');
const router = express.Router();

/////MIDDLEWARE

const {authStudent} = require('../middleware/authStudent');

//////MODELS

const { Student } = require('../models/student');

////
router.post('/signup', (req, res) => {
    
    const student  = new Student(req.body);

    student.save((err, doc) => {
        if(err) return res.json({ success: false,  studentData: false});
        res.status(200).json({
            success: true,
            studentData: doc
        })

    })
})

router.post('/login', (req, res) => {
    Student.findOne({'email':req.body.email}, (err, student) => {
        if(!student) return res.json({
            auth: false,
            message: 'Auth failed, email not found',
            studentData: false
        });

        student.comparePassword(req.body.password, (err, isMatch) => {
            if(!isMatch) return res.json({
                auth: false,
                message: 'Wrong Password',
                studentData: false
            });

            student.generateToken((err, student) => {
                if(err) return res.status(400).send(err);
                res.cookie('auth', student.token).json({
                    auth: true,
                    studentData:{
                        id: student._id,
                        email: student.email,
                        name: student.name,
                        lastname: student.lastname
                    }
                })
            })

        }) 
    })
})


router.get('/auth', authStudent, (req, res) => {
    res.json({
        auth: true,
        studentData:{
            id: req.student._id,
            email: req.student.email,
            name: req.student.name,
            lastname: req.student.lastname
        }
    })
})

router.get('/logout', authStudent, (req, res) => {
    req.student.deleteToken(req.token, (err, student) => {
        if(err) return res.status(400).send(err);
        res.status(200).send('goodbye');
    })
})


module.exports = router;
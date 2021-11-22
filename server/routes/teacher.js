const express = require('express');
const router = express.Router();

/////MIDDLEWARE

const {authTeacher} = require('../middleware/authTeacher');

//////MODELS

const { Teacher } = require('../models/teacher');

////
router.post('/signup', (req, res) => {
    
    const teacher  = new Teacher(req.body);

    teacher.save((err, doc) => {
        if(err) return res.json({ success: false,  teacherData: false});
        // res.status(200).json({
        //     success: true,
        //     teacherData: doc
        // })
        const teacher = doc;
        teacher.generateToken((err, doc) => {
            if(err) return res.status(400).send(err);
            res.cookie('auth', teacher.token).json({
                success: true,
                teacherData: doc
            })
        })

    })
})

router.post('/login', (req, res) => {
    Teacher.findOne({'email':req.body.email}, (err, teacher) => {
        if(!teacher) return res.json({
            auth: false,
            message: 'Auth failed, email not found',
            teacherData: false
        });

        teacher.comparePassword(req.body.password, (err, isMatch) => {
            if(!isMatch) return res.json({
                auth: false,
                message: 'Wrong Password',
                teacherData: false
            });

            teacher.generateToken((err, teacher) => {
                if(err) return res.status(400).send(err);
                res.cookie('auth', teacher.token).json({
                    auth: true,
                    teacherData:{
                        id: teacher._id,
                        email: teacher.email,
                        name: teacher.name,
                        lastname: teacher.lastname
                    }
                })
            })

        }) 
    })
})


router.get('/auth', authTeacher, (req, res) => {
    res.json({
        auth: true,
        teacherData:{
            id: req.teacher._id,
            email: req.teacher.email,
            name: req.teacher.name,
            lastname: req.teacher.lastname
        }
    })
})

router.get('/logout', authTeacher, (req, res) => {
    req.teacher.deleteToken(req.token, (err, teacher) => {
        if(err) return res.status(400).send(err);
        res.status(200).send('goodbye');
    })
})


module.exports = router;
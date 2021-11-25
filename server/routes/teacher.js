const express = require('express');
const router = express.Router();

/////MIDDLEWARE

const {authTeacher} = require('../middleware/authTeacher');
const {authStudent} = require('../middleware/authStudent');

//////MODELS

const { Teacher } = require('../models/teacher');
const { Class } = require('../models/class');

////
router.post('/signup', (req, res) => {
    
    const teacher  = new Teacher(req.body);

    teacher.save((err, doc) => {
        if(err) return res.json({ success: false,  teacherData: false});
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

router.post('/add-online-student', authStudent, (req, res) => {
    const id = req.query.id;
    let newStudent = {name: req.student.name, lastname: req.student.lastname, email: req.student.email}
    Teacher.findByIdAndUpdate(id, {$push: {onlineStudents: newStudent}}, 
        {new: true}, (err, doc) => {
        if(err) return res.status(400).send(err)
        res.json({
            success: true,
            teacherData: doc
        })
    })
    
})

router.post('/add-offline-student', authStudent, (req, res) => {
    const id = req.query.id;
    let newStudent = {name: req.student.name, lastname: req.student.lastname, email: req.student.email}
    Teacher.findByIdAndUpdate(id, {$push: {offlineStudents: newStudent}}, {new: true}, (err, doc) => {
        if(err) return res.status(400).send(err)
        res.json({
            success: true,
            teacherData: doc
        })
    })
    
})


router.get('/get-online-student', authTeacher, (req, res) => {
    const id = req.body.teacherId;
    Teacher.findById(id, (err, doc) => {
        if(err) return res.status(400).send(err)
        console.log(doc)
        res.json({
            success: true,
            studentsList: doc.onlineStudents ? doc.onlineStudents : []
        })
    })
    
})

router.get('/get-offline-student', authTeacher, (req, res) => {
    const id = req.body.teacherId;
    Teacher.findById(id, (err, doc) => {
        if(err) return res.status(400).send(err)
        res.json({
            success: true,
            studentsList: doc.offlineStudents ? doc.offlineStudents : []
        })
    })
    
})

router.get('/get-all-student', authTeacher, (req, res) => {
    const id = req.body.teacherId;
    Class.findOne({teacherId: id}, (err, doc) => {
        if(err) return res.status(400).send(err)
        res.json({
            success: true,
            studentsList: doc.students ? doc.students : []
        })
    })
    
})

router.get('/logout', authTeacher, (req, res) => {
    req.teacher.deleteToken(req.token, (err, teacher) => {
        if(err) return res.status(400).send(err);
        res.status(200).send('goodbye');
    })
})


module.exports = router;
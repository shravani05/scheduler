const express = require('express');
const router = express.Router();

/////MIDDLEWARE

const { authTeacher } = require('../middleware/authTeacher');

//////MODELS

const { Class } = require('../models/class');
const { Student } = require('../models/student');

////

router.post('/class-register', authTeacher, (req,res)=> {
    const classSub = new Class({
        ...req.body
    });

    classSub.save((err, doc) => {
        if(err) return res.status(400).send(err)
        res.cookie('teacherId', req.body.teacherId).status(200).json({
            post: true,
            classId: doc._id
        })
    })
})

router.post('/class-event-add', (req,res) => {
    // res.status(200)
    Class.findOneAndUpdate({teacherId: req.cookies.teacherId}, {slotStartTime: req.body.StartTime ? req.body.StartTime : "", 
        slotEndTime: req.body.EndTime ? req.body.EndTime : "", 
        slotRecurrenceRelation: req.body.RecurrenceRule ? req.body.RecurrenceRule : "",
        slotSubject: req.body.Subject ? req.body.Subject: ""})
        .exec((err, doc) => {
        if(err) return res.status(400).send(err)
        res.status(200)
    })

})

router.get('/class-event', (req, res) => {
    Class.findOne({teacherId: req.cookies.teacherId})
        .exec((err, doc) => {
        if(err) return res.status(400).send(err)
        console.log(doc)
        res.status(200).json({
            classEvent: doc
        })
    })

})

router.post('/invite-student', (req,res) => {
    Student.findOne({'email':req.body.email}, (err, student) => {
        if(!student) return res.json({
            auth: false,
            message: 'Auth failed, email not found'
        });
    })
    
    Class.findOne({teacherId: req.cookies.teacherId})
        .exec((err, doc) => {
        if(err) return res.status(400).send(err)
        console.log(doc)
        const subject = doc;
        curr_students = subject.students ?  subject.students : []

        subject.update({students: curr_students.push(req.body.email)})
    })

    // Class.findOneAndUpdate({teacherId: req.cookies.teacherId}, 
    //     {students: req.body.email})
    //     .exec((err, doc) => {
    //     if(err) return res.status(400).send(err)
    //     res.status(200)
    // })

})


module.exports = router;
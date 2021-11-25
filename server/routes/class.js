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

router.post('/class-event-add', authTeacher, (req,res) => {
    Class.findOneAndUpdate({teacherId: req.body.teacherId}, {slotStartTime: req.body.StartTime ? req.body.StartTime : "", 
        slotEndTime: req.body.EndTime ? req.body.EndTime : "", 
        slotRecurrenceRelation: req.body.RecurrenceRule ? req.body.RecurrenceRule : "",
        slotSubject: req.body.Subject ? req.body.Subject: ""})
        .exec((err, doc) => {
        if(err) return res.status(400).send(err)
        res.status(200).json({
            classEvent: doc
        })
    })

})

router.post('/invite-student', authTeacher, (req, res) => {
    Student.findOne({'email':req.body.email}, (err, student) => {
        if(err) return res.json({ auth: false});
        if(!student) return res.json({
            auth: false,
            message: 'Auth failed, email not found'
        });

        Class.findOne({teacherId: req.cookies.teacherId})
        .exec((err, doc) => {
            if(err) return res.status(400).send(err)
            console.log(doc)
            const classID = doc._id;

            Student.updateOne({'email':req.body.email}, {$push: {subjects: classID}}).exec((err, doc) => {
                if(err) return res.status(400).send(err)
            })

            let newStudent = {name: student.name, lastname: student.lastname, email: student.email}
            Class.updateOne({teacherId: req.body.teacherId}, 
                {$push: {students: newStudent}})
                .exec((err, doc) => {
                if(err) return res.status(400).send(err)
                res.status(200).json({
                    auth: true
                })
            })
        })

        
    })
});

router.get('/class-event', (req, res) => {
    Class.findById(req.query.id)
        .exec((err, doc) => {
        if(err) return res.status(400).send(err)

        res.status(200).json({
            classEvent: doc
        })
    })
})

router.get('/class-event-teacher-dashboard', authTeacher,(req, res) => {
    Class.findOne({teacherId: req.body.teacherId})
        .exec((err, doc) => {
        if(err) return res.status(400).send(err)

        res.status(200).json({
            classEvent: doc
        })
    })
})

module.exports = router;
const { Student } = require('../models/student');

let authStudent = (req, res, next) => {
    let token = req.cookies.auth;

    Student.findByToken(token, (err, student) => {
        if(err) throw err;
        if(!student) return res.send(false);

        req.token = token;
        req.student = student;
        next();
    })
}

module.exports = { authStudent }
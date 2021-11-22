const { Teacher } = require('../models/teacher');

let authTeacher = (req, res, next) => {
    let token = req.cookies.auth;

    Teacher.findByToken(token, (err, teacher) => {
        if(err) throw err;
        if(!teacher) return res.send(false);
        console.log("In middleware")
        req.token = token;
        req.body.teacherId = teacher._id;
        next();
    })
}

module.exports = { authTeacher }
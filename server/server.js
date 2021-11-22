const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const app = express();

const student = require('./routes/student');
const teacher = require('./routes/teacher');
const classSub = require('./routes/class');

const MONGO_URI = require('./config')

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


// MIDDLEWARES
app.use(bodyParser.json());
app.use(cookieParser());
app.use('/api/students', student);
app.use('/api/teachers', teacher);
app.use('/api/classes', classSub);

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log('Server running');
})
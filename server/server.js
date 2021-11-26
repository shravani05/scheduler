const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();

const student = require('./routes/student');
const teacher = require('./routes/teacher');
const classSub = require('./routes/class');

//const MONGO_URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}?retryWrites=true&w=majority`;
const MONGO_URI = "mongodb+srv://admin:testing123@cluster0.8qyyd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

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

app.use(express.static('client/build'));

if(process.env.NODE_ENV === 'production'){
    const path = require('path');
    app.get('/*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'../client','build','index.html'))
    })
}

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log('Server running');
})
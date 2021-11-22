const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const config = require('./../config/config').get(process.env.NODE_ENV);

const classSchema = mongoose.Schema({
    classname:{
        type: String,
        maxlength: 100
    },
    availableSlots:{
        type: String,
        maxlength: 100
    },
    teacherId:{
        type: Schema.Types.ObjectId,
        ref: 'Teacher'
    },
    slotStartTime: {
        type: String
    },
    slotEndTime: {
        type: String
    },
    slotRecurrenceRelation: {
        type: String
    },
    slotSubject: {
        type: String
    },
    students: [{
        type: String
    }]
});


const Class = mongoose.model('Class', classSchema);
module.exports = { Class }
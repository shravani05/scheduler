const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
        name: {type: String},
        lastname: {type: String},
        email: {type: String}
    }]
});


const Class = mongoose.model('Class', classSchema);
module.exports = { Class }
import { combineReducers } from 'redux';

import student from './student_reducers';
import teacher from './teacher_reducers';
import classSub from './class_reducers';

const rootReducer = combineReducers({
    student,
    teacher,
    classSub
})

export default rootReducer;
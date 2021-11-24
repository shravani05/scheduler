import {
    STUDENT_LOGIN,
    STUDENT_SIGNUP,
    STUDENT_AUTH,
    STUDENT_SUBJECTS
} from'../types';

export default function(state={}, action){
    switch(action.type){
        case STUDENT_LOGIN:
            return {...state, auth: action.payload.auth, studentData: action.payload.studentData}

        case STUDENT_SIGNUP:
            return {...state, auth: action.payload.success, studentData: action.payload.studentData}
        
        case STUDENT_AUTH:
            return {...state, 
                auth: action.payload.auth ? action.payload.auth : false, 
                studentData: action.payload.studentData ? action.payload.studentData : false
            }

        case STUDENT_SUBJECTS:
            return {...state, auth: action.payload.success, subjects: action.payload.subjects}
        
        default: 
                return state;
    }
}
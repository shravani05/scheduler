import {
    TEACHER_LOGIN,
    TEACHER_SIGNUP,
    TEACHER_AUTH,
    TEACHER_ONLINE_STUDENT,
    TEACHER_OFFLINE_STUDENT,
    TEACHER_ONLINE_STUDENT_GET,
    TEACHER_OFFLINE_STUDENT_GET,
    TEACHER_ALL_STUDENT_GET,
    TEACHER_LOGOUT
} from'../types';

export default function(state={}, action){
    switch(action.type){
        case TEACHER_LOGIN:
            return {...state, auth: action.payload.auth, teacherData: action.payload.teacherData}

        case TEACHER_SIGNUP:
            return {...state, auth: action.payload.success, teacherData: action.payload.teacherData}
        
        case TEACHER_AUTH:
            return {...state, 
                auth: action.payload.auth ? action.payload.auth : false, 
                teacherData: action.payload.teacherData ? action.payload.teacherData : false
            }

        case TEACHER_ONLINE_STUDENT:
            return {...state, auth: action.payload.success, teacherData: action.payload.teacherData}
        
        case TEACHER_OFFLINE_STUDENT:
            return {...state, auth: action.payload.success, teacherData: action.payload.teacherData}

        case TEACHER_ONLINE_STUDENT_GET:
            return {...state, auth: action.payload.success, studentsList: action.payload.studentsList}

        case TEACHER_OFFLINE_STUDENT_GET:
            return {...state, auth: action.payload.success, studentsList: action.payload.studentsList}

        case TEACHER_ALL_STUDENT_GET:
            return {...state, auth: action.payload.success, studentsList: action.payload.studentsList}

        case TEACHER_LOGOUT:
            return {...state, auth: action.payload, teacherData: false}
        
        default: 
                return state;
    }
}
import {
    TEACHER_LOGIN,
    TEACHER_SIGNUP,
    TEACHER_AUTH
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
        
        default: 
                return state;
    }
}
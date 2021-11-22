import axios from 'axios';
import {
    TEACHER_LOGIN,
    TEACHER_SIGNUP,
    TEACHER_AUTH
} from'../types';


/*=========== STUDENT =============*/
export function signupTeacher({name, lastname, email, password}){

    const request = axios.post('/api/teachers/signup', {name, lastname, email, password})
    .then(response => response.data)

    return{
        type: TEACHER_SIGNUP,
        payload: request
    }
}

export function loginTeacher({email, password}){

    const request = axios.post('/api/teachers/login', {email, password})
    .then(response => response.data)

    return{
        type: TEACHER_LOGIN,
        payload: request
    }
}

export function auth(){

    const request = axios.get('/api/teachers/auth')
    .then(response => response.data)
    
    return{
        type: TEACHER_AUTH,
        payload: request
    }
}

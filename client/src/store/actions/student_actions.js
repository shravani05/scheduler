import axios from 'axios';
import {
    STUDENT_LOGIN,
    STUDENT_SIGNUP,
    STUDENT_AUTH
} from'../types';


/*=========== STUDENT =============*/
export function signupStudent({name, lastname, email, password}){

    const request = axios.post('/api/students/signup', {name, lastname, email, password})
    .then(response => response.data)

    return{
        type: STUDENT_SIGNUP,
        payload: request
    }
}

export function loginStudent({email, password}){

    const request = axios.post('/api/students/login', {email, password})
    .then(response => response.data)

    return{
        type: STUDENT_LOGIN,
        payload: request
    }
}

export function auth(){

    const request = axios.get('/api/students/auth')
    .then(response => response.data)
    
    return{
        type: STUDENT_AUTH,
        payload: request
    }
}

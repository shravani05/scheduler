import axios from 'axios';
import {
    STUDENT_LOGIN,
    STUDENT_SIGNUP,
    STUDENT_AUTH,
    STUDENT_SUBJECTS,
    STUDENT_LOGOUT
} from'../types';


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

export function getSubjects(){

    const request = axios.get('/api/students/subjects')
    .then(response => response.data)
    
    return{
        type: STUDENT_SUBJECTS,
        payload: request
    }
}

export function logoutStudent(){

    const request = axios.get('/api/students/logout')
    .then(response => {return null})
    
    return{
        type: STUDENT_LOGOUT,
        payload: request
    }
}
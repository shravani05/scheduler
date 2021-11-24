import axios from 'axios';
import {
    TEACHER_LOGIN,
    TEACHER_SIGNUP,
    TEACHER_AUTH,
    TEACHER_ONLINE_STUDENT,
    TEACHER_OFFLINE_STUDENT,
    TEACHER_ONLINE_STUDENT_GET,
    TEACHER_OFFLINE_STUDENT_GET,
    TEACHER_ALL_STUDENT_GET
} from'../types';


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

export function addOnlineStudent(teacherId){
    const request = axios.post(`/api/teachers/add-online-student?id=${teacherId}`)
    .then(response =>  response.data)

    return{
        type: TEACHER_ONLINE_STUDENT,
        payload: request
    }
}

export function addOfflineStudent(teacherId){
    const request = axios.post(`/api/teachers/add-offline-student?id=${teacherId}`)
    .then(response =>  response.data)

    return{
        type: TEACHER_OFFLINE_STUDENT,
        payload: request
    }
}


export function getOnlineStudent(){
    const request = axios.get("/api/teachers/get-online-student")
    .then(response =>  response.data)

    return{
        type: TEACHER_ONLINE_STUDENT_GET,
        payload: request
    }
}

export function getOfflineStudent(){
    const request = axios.get("/api/teachers/get-offline-student")
    .then(response =>  response.data)

    return{
        type: TEACHER_OFFLINE_STUDENT_GET,
        payload: request
    }
}

export function getAllStudent(){
    const request = axios.get("/api/teachers/get-all-student")
    .then(response =>  response.data)

    return{
        type: TEACHER_ALL_STUDENT_GET,
        payload: request
    }
}
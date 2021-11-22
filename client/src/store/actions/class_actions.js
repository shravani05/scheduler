import axios from 'axios';
import {
    CLASS_ADD,
    CLASS_EVENT_ADD,
    CLASS_EVENT_GET,
    CLASS_INVITE
} from'../types';

export function addClass(classSub){
    const request = axios.post('/api/classes/class-register', classSub)
    .then(response => response.data)

    return {
        type: CLASS_ADD,
        payload: request
    }

}

export function addEventClass(slot){
    const request = axios.post('/api/classes/class-event-add', slot)
    .then(response => response.data)

    return {
        type: CLASS_EVENT_ADD,
        payload: request
    }

}

export function getEventClass(){
    const request = axios.get('/api/classes/class-event')
    .then(response => response.data)

    return {
        type: CLASS_EVENT_GET,
        payload: request
    }

}

export function inviteStudent({email}){
    const request = axios.post('/api/classes/invite-student', email)
    .then(response => response.data)

    return {
        type: CLASS_INVITE,
        payload: request
    }

}
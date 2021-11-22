import {
    CLASS_ADD,
    CLASS_EVENT_ADD,
    CLASS_EVENT_GET,
    CLASS_INVITE
} from'../types';

export default function(state={}, action){
    switch(action.type){
        case CLASS_ADD:
            return {...state, add: action.payload}

        case CLASS_EVENT_ADD:
            return {...state, eventAdd: action.payload}

        case CLASS_EVENT_GET:
            return {...state, eventGet: action.payload}

        case CLASS_INVITE:
            return {...state, auth: action.payload.auth}
    
        default: 
                return state;
    }
}
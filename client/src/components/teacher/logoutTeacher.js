import React, { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { logoutTeacher } from '../../store/actions/teacher_actions';
import Header from '../Headers/header';

const LogoutTeacher = (props) => {

    const logout = useSelector(state => state.teacher);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(logoutTeacher())
    },[dispatch]);

    useEffect(() => {
        if(logout.auth === null){
            setTimeout(() => {
                props.history.push('/');
            },1000)
        }
    },[logout, props])

    return(
        <>
        <Header/>
        <div className="logout_container">
            <h1>
                Sorry to see you go :(
            </h1>
        </div>
        </>
    )

}

export default LogoutTeacher;
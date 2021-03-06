import React, { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { logoutStudent } from '../../store/actions/student_actions';
import Header from '../Headers/header';

const LogoutStudent = (props) => {

    const logout = useSelector(state => state.student);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(logoutStudent())
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

export default LogoutStudent;
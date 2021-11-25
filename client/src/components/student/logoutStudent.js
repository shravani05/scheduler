import React, { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { logoutStudent } from '../../store/actions/student_actions';

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
            },2000)
        }
    },[logout, props])

    return(
        <div className="logout_container">
            <h1>
                Sorry to see you go :(
            </h1>
        </div>
    )

}

export default LogoutStudent;
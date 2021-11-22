import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component{
    render(){
        return(
            <div className="container home_container">
                <h1>Welcome to the Scheduler app!</h1>
                <h3>Please choose your role</h3>
                <div className="buttons">
                    <Link to="/teacher-login"><button className="btns">Teacher</button></Link>
                    <Link to="/student-login"><button className="btns">Student</button></Link>
                </div>
            </div>
        )
    }
}

export default Home;
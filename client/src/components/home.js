import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Image from 'react-bootstrap/Image';
import Header from './Headers/header';

class Home extends Component{
    render(){
        return(
            <>
            <Header/>
            <div className="home_container">
                <Image src="./images/homebgd.jpg" fluid className = "img"/>
                <h1>Welcome to the New Normal Scheduler!</h1>
                <h3>This website allows students to submit weekly preferences for attending class in-person or remotely.<br/>
                    The tool then assigns available seats to students who want 
                    to physically attend class <br/>and provides the faculty with a roster of who has been cleared to attend.</h3>
                <h2>Choose your role:</h2>
                <div className="buttons">
                    <Link to="/teacher-login"><button className="btns">Teacher</button></Link>
                    <Link to="/student-login"><button className="btns">Student</button></Link>
                </div>
            </div>
            </>
        )
    }
}

export default Home;
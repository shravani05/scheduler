import React, { Component } from 'react';
import Header from './Headers/header';

class About extends Component {
    render() {
        return (
            <>
            <Header/>
            <div className = "about_container">
                <h3>About the Developer</h3>
                <h5>Hello, I am Shravani Chavan, I love making cool web apps.</h5>
                <h5>You can contact me at: <a href="mailto:chavanshravani357@gmail.com">chavanshravani357@gmail.com</a></h5>
            </div>
            </>
        )
    }
}
 
export default About 
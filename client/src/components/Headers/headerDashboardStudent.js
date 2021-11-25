import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';

class HeaderDashboardStudent extends Component {

    render() {
        return (
            <Navbar collapseOnSelect expand="lg" className="headerHome">
            <Container className="links">
            <Navbar.Brand href="/" className = "header-nav">NEW NORMAL SCHEDULER</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav" className="responsive-collapse">
            <Nav className="me-auto">
            </Nav>
            <Nav className = "header-nav">
                <Nav.Link className="nav-links" href="/logout-student" 
                    style = {{fontFamily:  "'Josefin Sans', sans-serif"}}>Log out
                </Nav.Link>
            </Nav>
            </Navbar.Collapse>
            </Container>
            </Navbar>
        )
    }
} 

export default HeaderDashboardStudent;
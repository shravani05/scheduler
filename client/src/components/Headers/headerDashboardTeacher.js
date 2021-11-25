import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';

class HeaderDashboardTeacher extends Component {

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
                <Nav.Link className="nav-links" href="/teacher-dashboard" 
                    style = {{fontFamily:  "'Josefin Sans', sans-serif"}}>Dashboard
                </Nav.Link>
                <Nav.Link className="nav-links" href="/view-class-teacher" 
                    style = {{fontFamily:  "'Josefin Sans', sans-serif"}}>View Class Schedule
                </Nav.Link>
                <NavDropdown title="Student Roster" id="collasible-nav-dropdown" className="nav-links">
                    <NavDropdown.Item href="/teacher-dashboard-all">All Students</NavDropdown.Item>
                    <NavDropdown.Item href="/teacher-dashboard-online">Online Students</NavDropdown.Item>
                    <NavDropdown.Item href="/teacher-dashboard-offline">Offline Students</NavDropdown.Item>
                </NavDropdown>
                <Nav.Link className="nav-links" href="/invite-students" 
                    style = {{fontFamily:  "'Josefin Sans', sans-serif"}}>Invite Students
                </Nav.Link>
                <Nav.Link className="nav-links" href="/logout-teacher" 
                    style = {{fontFamily:  "'Josefin Sans', sans-serif"}}>Log out
                </Nav.Link>
            </Nav>
            </Navbar.Collapse>
            </Container>
            </Navbar>
        )
    }
} 

export default HeaderDashboardTeacher;
import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';

class Header extends Component {

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
                <Nav.Link className="nav-links" href="/about" 
                    style = {{fontFamily:  "'Josefin Sans', sans-serif"}}>About
                </Nav.Link>
            </Nav>
            </Navbar.Collapse>
            </Container>
            </Navbar>
        )
    }
} 

export default Header;
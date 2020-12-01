import React from 'react';
import './Header.css'
import { Button, Form, FormControl, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import logo from '../../images/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div className="header">
            <Navbar expand="lg">
                <Navbar.Brand className="logo" href="#home">
                    <Link to="/">
                        <img src={logo} alt=""/>
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto navBar">
                        <Form inline>
                            <FormControl className="mr-lg-1 px-5 searchOpt" type="text" placeholder="Search your Destination" />
                        </Form>
                        <Nav.Link className="menuOpt" href="#news">News</Nav.Link>
                        <Link to="/hotels">
                        <Nav.Link className="menuOpt" href="#destination">Destination</Nav.Link>
                        </Link>
                        <Nav.Link className="menuOpt" href="#blog">Blog</Nav.Link>
                        <Nav.Link className="menuOpt" href="#contact">Contact</Nav.Link>
                        <Form inline>
                            <Link to="/auth">
                                <Button className="menuOpt"  variant="warning">Log in</Button>
                            </Link>
                        </Form>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
};

export default Header;
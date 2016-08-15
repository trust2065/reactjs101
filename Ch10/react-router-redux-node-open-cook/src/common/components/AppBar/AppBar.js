import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

const AppBar = ({
  isAuthorized,
  onLogout
}) => (
  <Navbar>
    <Navbar.Header>
      <Navbar.Brand>
        <Link to="/">OpenCook</Link>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      {
        isAuthorized === false ?
        (
          <Nav pullRight>
            <LinkContainer to={{ pathname: '/login' }}><NavItem eventKey={2} href="#">登入</NavItem></LinkContainer>
          </Nav>
        ) :
        (
          <Nav pullRight>
            <LinkContainer to={{ pathname: '/share' }}><NavItem eventKey={1} href="#">分享食譜</NavItem></LinkContainer>
            <NavItem eventKey={2} onClick={onLogout} href="#">登出</NavItem>
          </Nav>
        )        
      }
    </Navbar.Collapse>
  </Navbar>
);

export default AppBar;
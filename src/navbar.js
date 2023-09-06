import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// Create a styled Navbar component
const StyledNavbar = styled(Navbar)`
  background-color: #333; /* Background color */
  padding: 15px 0; /* Top and bottom padding */
`;

// Create a styled Navbar.Brand component
const StyledBrand = styled(Navbar.Brand)`
  color: #fff; /* Text color */
  font-size: 24px;
  &:hover {
    color: #fff; /* Hover color */
    text-decoration: none; /* Remove underline on hover */
  }
`;

// Create a styled Nav.Link component
const StyledNavLink = styled(Nav.Link)`
  color: #fff; /* Text color */
  font-size: 18px;
  margin-right: 15px; /* Right margin between links */
  &:hover {
    color: #fff; /* Hover color */
    text-decoration: none; /* Remove underline on hover */
  }
`;

function CustomNavbar() {
  return (
    <StyledNavbar bg="dark" variant="dark" expand="lg">
      <StyledBrand as={Link} to="/">My Store</StyledBrand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <StyledNavLink as={Link} to="/">Home</StyledNavLink>
          <StyledNavLink as={Link} to="/category">Categories</StyledNavLink>
          <StyledNavLink as={Link} to="/tags">Tags</StyledNavLink>

        </Nav>
      </Navbar.Collapse>
    </StyledNavbar>
  );
}

export default CustomNavbar;

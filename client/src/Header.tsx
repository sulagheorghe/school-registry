import React from 'react'
import { Container, Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap'
import { Link } from 'react-router-dom'

export function Header() {
  return (
    <Navbar color="light" light expand="md">
      <Container>
        <NavbarBrand to="/" tag={Link}>School Registry</NavbarBrand>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink to="/signin" tag={Link}>Sign in</NavLink>
          </NavItem>
        </Nav>
      </Container>
    </Navbar>
  )
}
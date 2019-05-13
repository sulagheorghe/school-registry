import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container
} from 'reactstrap';
import { Link } from 'react-router-dom'
import { subjectsRoutes } from '../subjects/subjects.routes';
import { appRoutes } from '../app.routes';
import { l10n } from '../l10n';

export function Header() {
  const [isOpen, setIsOpen] = React.useState(false)
  return (
    <Navbar color="dark" dark expand="md">
      <Container>
        <NavbarBrand to="/" tag={Link}>{l10n('app.title')}</NavbarBrand>
        <NavbarToggler onClick={() => setIsOpen(!isOpen)} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink to={subjectsRoutes.list.url()} tag={Link}>
                {l10n('label.subjects')}
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to={appRoutes.signIn.url()} tag={Link}>
                {l10n('label.signIn')}
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
}

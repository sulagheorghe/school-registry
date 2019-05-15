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
import { GlobalContext } from './global.context';

export function Header() {
  const [isOpen, setIsOpen] = React.useState(false)
  const { profile } = React.useContext(GlobalContext)
  return (
    <Navbar color="dark" dark expand="md">
      <Container>
        <NavbarBrand to="/" tag={Link}>{l10n('app.title')}</NavbarBrand>
        <NavbarToggler onClick={() => setIsOpen(!isOpen)} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            {profile && (
              <NavItem>
                <NavLink to={subjectsRoutes.list.url()} tag={Link}>
                  {l10n('label.subjects')}
                </NavLink>
              </NavItem>
            )}
            {!profile && (
              <NavItem>
                <NavLink to={appRoutes.signIn.url()} tag={Link}>
                  {l10n('label.signIn')}
                </NavLink>
              </NavItem>
            )}
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
}

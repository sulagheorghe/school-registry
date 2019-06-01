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
import { studentsRoutes } from '../students/students.routes';
import { gradeGroupsRoutes } from '../grade-group/grade-groups.routes'
import { teachersRoutes } from '../teachers/teachers.routes';
import { scheduleRoutes } from '../schedule/schedule.routes';

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
              <React.Fragment>
                <NavItem>
                <NavLink to={studentsRoutes.list.url()} tag={Link}>
                  {l10n('label.students')}
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to={subjectsRoutes.list.url()} tag={Link}>
                  {l10n('label.subjects')}
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to={gradeGroupsRoutes.list.url()} tag={Link}>
                  {l10n('label.gradeGroups')}
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to={teachersRoutes.list.url()} tag={Link}>
                  {l10n('label.teachers')}
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink to={scheduleRoutes.list.url()} tag={Link}>
                  {l10n("label.schedule")}
                </NavLink>
              </NavItem>
              </React.Fragment>
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

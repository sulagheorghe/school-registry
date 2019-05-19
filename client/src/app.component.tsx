import React from 'react';
import { Container } from 'reactstrap'
import { Switch, Route } from 'react-router-dom'
import { Header } from './shared/header.component';
import { SignIn } from './sign-in.component';
import { Footer } from './shared/footer.component';
import { Subjects } from './subjects/subjects.component';
import { subjectsRoutes } from './subjects/subjects.routes';
import { appRoutes } from './app.routes';
import { Home } from './home.component';
import { studentsRoutes } from './students/students.routes';
import { Students } from './students/students.component';
import { GradeGroup } from './grade-group/grade-group.component';

import './app.scss'
import { gradeGroupsRoutes } from './grade-group/grade-groups.routes';

export function App() {
  return (
    <React.Fragment>
      <Header />
      <Container className="pt-3">
        <Switch>
          <Route path={appRoutes.signIn.path} exact component={SignIn} />
          <Route path={appRoutes.home.path} exact component={Home} />
          <Route path={subjectsRoutes.list.path} exact component={Subjects} />
          <Route path={studentsRoutes.list.path} exact component={Students} />
          <Route path={gradeGroupsRoutes.list.path} exact component={GradeGroup} />
        </Switch>
      </Container>
      <Footer />
    </React.Fragment>
  );
}

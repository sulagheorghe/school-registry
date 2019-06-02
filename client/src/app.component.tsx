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
import { teachersRoutes } from './teachers/teachers.routes';
import { Teachers } from './teachers/teacher.component';
import { scheduleRoutes } from './schedule/schedule.routes';
import { Schedule } from './schedule/schedule.component';
import { GradeGroupSchedule } from './schedule/components/grade-group-schedule.component';

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
          <Route path={teachersRoutes.list.path} exact component={Teachers} />
          <Route path={gradeGroupsRoutes.list.path} exact component={GradeGroup} />
          <Route path={scheduleRoutes.list.path} exact component={Schedule} />
          <Route path={scheduleRoutes.view.path} exact component={GradeGroupSchedule} />
        </Switch>
      </Container>
      <Footer />
    </React.Fragment>
  );
}

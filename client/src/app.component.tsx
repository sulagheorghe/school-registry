import React from 'react';
import { Container } from 'reactstrap'
import { Switch, Route } from 'react-router-dom'
import { Header } from './shared/header.component';
import { SignIn } from './sign-in.component';
import { Footer } from './shared/footer.component';
import { Subjects } from './subjects/subjects.component';
import { subjectsRoutes } from './subjects/subjects.routes';
import { appRoutes } from './app.routes';

import './app.scss'

export function App() {
  return (
    <React.Fragment>
      <Header />
      <Container className="pt-3">
        <Switch>
          <Route path={subjectsRoutes.list.path} exact component={Subjects} />
          <Route path={appRoutes.signIn.path} component={SignIn} />
        </Switch>
      </Container>
      <Footer />
    </React.Fragment>
  );
}

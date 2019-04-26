import React from 'react';
import { Alert, Container } from 'reactstrap'
import { Switch, Route } from 'react-router-dom'
import { Header } from './Header';
import { SignIn } from './SignIn';

const App: React.FC = () => {
  return (
    <React.Fragment>
      <Header />
      <Container>
        <Alert color="warning" className="mt-3 text-center">🔥🔥🔥🔥🔥 !!!FIRE!!! 🔥🔥🔥🔥🔥</Alert>
      </Container>
      <Container>
        <Switch>
          <Route path="/" exact render={() => "home page"} />
          <Route path="/signin" component={SignIn} />
        </Switch>
      </Container>
    </React.Fragment>
  );
}

export default App;

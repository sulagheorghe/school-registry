import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './app.component';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import { GlobalProvider } from './shared/global.context';

ReactDOM.render(
  <GlobalProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </GlobalProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

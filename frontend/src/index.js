import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import styled from 'styled-components'

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Home from './pages/Home'
import Admin from './pages/Admin'
import ContentViewer from './pages/ContentViewer';

const Container = styled.div`
  height: 100vh;
`;

ReactDOM.render(
  <Container>
    <React.StrictMode>
      <Router>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/admin" exact>
            <Admin />
          </Route>
          <Route path="/viewer/:path" component={ContentViewer} exact />
        </Switch>
      </Router>
    </React.StrictMode >
  </Container>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();

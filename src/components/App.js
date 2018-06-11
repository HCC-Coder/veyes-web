import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import {routes} from '../route';

import { withAuthentication } from '../middleware';
import { Error404Page } from './';

function App() {
  let Routes = routes.routes.map((route, index) => {
    return (<Route key={index} exact path={route.uri} component={route.component} />);
  });
  return (
    <Router>
      <Switch>
        {Routes}
        <Route component={() => <Error404Page />} />
      </Switch>
    </Router>
    );
}

export default withAuthentication(App);
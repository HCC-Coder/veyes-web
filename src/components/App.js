import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import Routes from '../route';

import { withAuthentication } from '../middleware';
import { Error404Page } from './';

function App() {
  let routes = Routes.map((route, index) => {
    return (<Route key={index} exact path={route.uri} component={route.component} />);
  });
  return (
    <Router>
      <Switch>
        {routes}
        <Route component={() => <Error404Page />} />
      </Switch>
    </Router>
    );
}

export default withAuthentication(App);
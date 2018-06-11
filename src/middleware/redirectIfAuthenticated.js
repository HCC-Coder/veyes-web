import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { firebase } from '../firebase';
import { routes } from '../route';

const redirectIfAuthenticated = (Component) => {
  class RedirectIfAuthenticated extends React.Component {
    state = {ready: false};
    componentDidMount() {
      firebase.auth.onAuthStateChanged(authUser => {
        if (authUser) {
          this.props.history.push(routes.routeName.home);
        }
        this.setState({ready: 'true'});
      });
    }

    render() {
      return this.state.ready ? <Component /> : null;
    }
  }

  RedirectIfAuthenticated.contextTypes = {
    authUser: PropTypes.object,
  };

  return withRouter(RedirectIfAuthenticated);
}

export default redirectIfAuthenticated;
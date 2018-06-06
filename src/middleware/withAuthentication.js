import React from 'react';
import PropTypes from 'prop-types';

import { firebase } from '../firebase';

const withAuthentication = (Component) => {
  class WithAuthentication extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        authUser: null,
        ready: false,
      };
    }

    getChildContext() {
      return {
        authUser: this.state.authUser,
      };
    }

    componentDidMount() {
      firebase.auth.onAuthStateChanged(authUser => {
        authUser
          ? this.setState(() => ({ authUser }))
          : this.setState(() => ({ authUser: null }));
        this.setState({ready: true});
      });
    }

    render() {
      return this.state.ready?(
        <Component authUser={this.state.authUser}/>
      ): null;
    }
  }

  WithAuthentication.childContextTypes = {
    authUser: PropTypes.object,
  };

  return WithAuthentication;
}

export default withAuthentication;
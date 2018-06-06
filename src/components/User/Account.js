import React from 'react';
import PropTypes from 'prop-types';

import { PasswordForgetForm } from './PasswordForget';
import PasswordChangeForm from './PasswordChange';


const AccountPage = (props, { authUser }) =>
  <div>
    <h1>Account: {authUser.email}</h1>
    <PasswordForgetForm />
    <PasswordChangeForm />
  </div>

AccountPage.contextTypes = {
  authUser: PropTypes.object,
};


export default AccountPage;
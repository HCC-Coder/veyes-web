import React from 'react';
import { SignInForm } from './User/SignIn';
import SignOutButton from './User/SignOut';

function WelcomePage (props) {
  let authAction, content;
  authAction = !props.authUser? <SignInForm history={props.history}/>: <SignOutButton />;
  content = props.authUser? 'You\'re logged in!':'';
  return (
    <div>
      <h1>Welcome to Veyes web</h1>
      {authAction}
      {content}
    </div>
    );
}

export default WelcomePage;
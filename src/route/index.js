import { Router, routes } from './method';

import WelcomePage from '../components/Welcome';
import HomePage from '../components/Home';
import * as ContentEditor from '../components/ContentEditor';
import * as Components from '../components/';
import * as Hoc from '../middleware';

export { routes };

const authCondition = (authUser) => !!authUser;

Router.set('/', WelcomePage, 'landing', [Hoc.withAuthentication]);
Router.group('/', function() {
  Router.set('signup', Components.SignUpPage, 'signup');
  Router.set('signin', Components.SignInPage, 'signin');
  Router.set('pw-forget', Components.PasswordForgetPage, 'pwforget');
  Router.set('testing', () =>  "Component");
}, [
  Hoc.redirectIfAuthenticated,
]);
Router.group('/', function() {
  Router.set('home', HomePage, 'home');
  Router.set('account', Components.AccountPage, 'account');
}, [
  Hoc.withAuthorization(authCondition),
]);
Router.group('/content-editor/song/', function() {
  Router.set('', ContentEditor.Home, '');
  Router.set('create', ContentEditor.CreateSongPage, '');
  Router.set(':id', ContentEditor.EditSongPage, '');
},
[
  Hoc.withAuthorization(authCondition),
]);
import { route, groupRoute, routeName } from './method';

import WelcomePage from '../components/Welcome';
import HomePage from '../components/Home';
import * as ContentEditor from '../components/ContentEditor';
import * as Components from '../components/';

import { withAuthentication, withAuthorization, redirectIfAuthenticated } from '../middleware';

const authCondition = (authUser) => !!authUser;

const Routes = [
  route('/', WelcomePage, 'landing', [withAuthentication]),
  ...groupRoute('/',
    [
      route('signup', Components.SignUpPage, 'signup'),
      route('signin', Components.SignInPage, 'signin'),
      route('pw-forget', Components.PasswordForgetPage, 'pwforget'),
      route('testing', () =>  "Component"),
      // route('uri', Component),
    ],
    [
      redirectIfAuthenticated,
    ]),
  ...groupRoute('/', 
    [
      route('home', HomePage, 'home'),
      route('account', Components.AccountPage, 'account'),
    ],
    [
      withAuthorization(authCondition),
    ]),
  ...groupRoute('/content-editor/song/',
    [
      route('', ContentEditor.Home, ''),
      route('create', ContentEditor.CreateSongPage, ''),
      route(':id', ContentEditor.EditSongPage, ''),
    ],
    [
      withAuthorization(authCondition),
    ]),
];

export default Routes;
export {
  routeName,
}
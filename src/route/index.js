import { route, groupRoute, routeName } from './method';

import WelcomePage from '../components/Welcome';
import HomePage from '../components/Home';
import { 
  SignInPage,
  SignUpPage,
  PasswordForgetPage,
  AccountPage,
} from '../components/';

import { withAuthentication, withAuthorization, redirectIfAuthenticated } from '../middleware';

const authCondition = (authUser) => !!authUser;

const Routes = [
  route('/', WelcomePage, 'landing', [withAuthentication]),
  ...groupRoute('/',
    [
      route('signup', SignUpPage, 'signup'),
      route('signin', SignInPage, 'signin'),
      route('pw-forget', PasswordForgetPage, 'pwforget'),
      route('testing', () =>  "Component"),
      // route('uri', Component),
    ],
    [
      redirectIfAuthenticated,
    ]),
  ...groupRoute('/', 
    [
      route('home', HomePage, 'home'),
      route('account', AccountPage, 'account'),
    ],
    [
      withAuthorization(authCondition),
    ]),
];

export default Routes;
export {
  routeName,
}
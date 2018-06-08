import * as firebase from 'firebase';
import * as configVar from '../config';
import 'firebase/firestore';

const config = {
  apiKey: configVar.apiKey,
  authDomain: configVar.authDomain,
  databaseURL: configVar.databaseURL,
  projectId: configVar.projectId,
  storageBucket: configVar.storageBucket,
  messagingSenderId: configVar.messagingSenderId,
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const auth = firebase.auth();
const db = firebase.database();
const firestore = firebase.firestore();

export {
  firestore,
  db,
  auth,
};
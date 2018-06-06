import { db } from './firebase';
import { state } from '../config';

export const readData = (path) =>
  db.ref(`${state}/${path}`).once('value');

export const writeData = (path, data) =>
  db.ref(`${state}/${path}`).push().set(data);

export const bindData = (path, callback) =>
  db.ref(`${state}/${path}`).on('value', callback);

// User API
export const doCreateUser = (id, username, email) =>
  db.ref(`${state}/users/${id}`).set({username, email});

export const onceGetUsers = () =>
  readData('users');

import env from './env';

export const state = env.DEBUG ? "development" : "production";
export const apiKey = env.apiKey;
export const authDomain = env.authDomain;
export const databaseURL = env.databaseURL;
export const projectId = env.projectId;
export const storageBucket = env.storageBucket;
export const messagingSenderId = env.messagingSenderId;
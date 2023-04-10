import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const config = {
  // your config

};
const firebase = initializeApp(config);
const firestore = getFirestore();
const auth = getAuth(firebase);

export { firebase, firestore, auth };

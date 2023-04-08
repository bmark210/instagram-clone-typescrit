import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const config = {
// your web app's Firebase configuration
};
const firebase = initializeApp(config);
const firestore = getFirestore();
const auth = getAuth(firebase);

export { firebase, firestore, auth };

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const config = {
  apiKey: 'AIzaSyCnLWuFAUA7ahql5F64cPmnojlNjV7xWeM',
  authDomain: 'instagram-clone-e904f.firebaseapp.com',
  projectId: 'instagram-clone-e904f',
  storageBucket: 'instagram-clone-e904f.appspot.com',
  messagingSenderId: '522313280912',
  appId: '1:522313280912:web:c44e1c273b73eadd251715',
};
const firebase = initializeApp(config);
const firestore = getFirestore();
const auth = getAuth(firebase);

export { firebase, firestore, auth };

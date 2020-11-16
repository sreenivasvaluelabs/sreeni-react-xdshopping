import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyDBEgB5tSqtnCIAr8jBtSxPNNW6qh1Wshg",
  authDomain: "sreeni-react-ecomm-db.firebaseapp.com",
  databaseURL: "https://sreeni-react-ecomm-db.firebaseio.com",
  projectId: "sreeni-react-ecomm-db",
  storageBucket: "sreeni-react-ecomm-db.appspot.com",
  messagingSenderId: "128164726315",
  appId: "1:128164726315:web:bd265bbd4845da8f5d8c6e",
  measurementId: "G-N64J6MKW1V"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

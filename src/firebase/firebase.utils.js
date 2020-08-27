import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyD6WNV53EZ8cwUxTV_om9nrvvB9BekgmBw",
    authDomain: "shopper-e79fa.firebaseapp.com",
    databaseURL: "https://shopper-e79fa.firebaseio.com",
    projectId: "shopper-e79fa",
    storageBucket: "shopper-e79fa.appspot.com",
    messagingSenderId: "733478821008",
    appId: "1:733478821008:web:15fccafe8b72288d1fcc15",
    measurementId: "G-BTVM1P7KGW"
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

  export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);
    
    const batch = firestore.batch();
    objectsToAdd.forEach(obj => {
      const newDocRef = collectionRef.doc(obj.title);
      batch.set(newDocRef, obj);
    });

    return await batch.commit(); 
  };

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();
  
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  export const signInWithGoogle = () => auth.signInWithPopup(provider);
  
  export default firebase;
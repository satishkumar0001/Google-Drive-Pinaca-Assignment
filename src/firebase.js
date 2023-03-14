import firebase from "firebase"

const firebaseConfig = {
    apiKey: "AIzaSyAVuoOoZyVU4qxe7R2DUthNdkEX8fZDFN0",
    authDomain: "drive-assignment-7f008.firebaseapp.com",
    projectId: "drive-assignment-7f008",
    storageBucket: "drive-assignment-7f008.appspot.com",
    messagingSenderId: "713709220988",
    appId: "1:713709220988:web:0f1948bf0cd3773f9285f9"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  
  const db = firebaseApp.firestore();
  const storage = firebase.storage();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export {db,storage,auth,provider}
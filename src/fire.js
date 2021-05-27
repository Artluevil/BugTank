import firebase from 'firebase/app'
import 'firebase/auth';        
import 'firebase/storage';     
import 'firebase/database';    
import 'firebase/firestore';

var firebaseConfig = {
  apiKey: "AIzaSyDYrxN3VxL8M1NtEheHu7dCcddMvj021JE",
  authDomain: "bug-tracker1.firebaseapp.com",
  projectId: "bug-tracker1",
  storageBucket: "bug-tracker1.appspot.com",
  messagingSenderId: "363060695876",
  appId: "1:363060695876:web:f31843e82dde34d8f23d11"
};


  const fire = firebase.initializeApp(firebaseConfig);

  export default fire;
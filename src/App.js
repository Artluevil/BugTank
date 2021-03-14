import React, { useState, useEffect} from 'react';
import './App.css';
import fire from './fire'
import LoginPanel from './components/LoginPanel'
import SignUpPanel from './components/SignUpPanel'
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'
import HomePage from './components/HomePage';

function App() {
  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [hasAccount, setHasAccount] = useState(false);
  const [loading, setLoading] = useState(false)
  const [dataMessages, setDataMessages] = useState([])

  let ref = fire.firestore().collection('default')


  const clearInputs = () => {
    setEmail('');
    setPassword('');
  }

  const clearErrors = () => {
    setEmailError('');
    setPasswordError('');
  }

  const handleLogin = () => {
    clearErrors();
    fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(err => {
        switch(err.code) {
          case "auth/invalid-email":
          case "auth/user-disabled":
          case "auth/user-not-found":
            setEmailError(err.message);
            break;
          case "auth/wrong-password":
            setPasswordError(err.message);
            break;
        }
      });
  };

  const handleSignUp = () => {
    clearErrors();
    fire
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch(err => {
        switch(err.code) {
          case "auth/invalid-already-in-use":
          case "auth/invalid-email":
            setEmailError(err.message);
            break;
          case "auth/weak-password":
            setPasswordError(err.message);
            break;
        }
      });
  };

  const handleLogout = () => {
    fire.auth().signOut();
    setDataMessages([])
  }

  function getMessages() {
    setLoading(true)
    ref.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
        console.log(items)
      });
      setDataMessages(items)
      setLoading(false);
    })
  }

  useEffect(() => {
    authListener();
    getMessages();
  }, []);

  const authListener = () => {
    fire.auth().onAuthStateChanged(user => {
      if(user){
        clearInputs();
        ref = fire.firestore().collection(fire.auth().currentUser.email)
        getMessages()
        setUser(user);
        console.log(user.displayName)
        console.log(user.email)
      } else {
        setUser("")
      }
    });
  };

  const getUserEmail = () => {
    return fire.auth().currentUser.email
  }

  const makeMessage = () => {
    console.log('tic')
    return fire.firestore().collection('messages').add({
      email: getUserEmail(),
      text: 'random text',
      timestamp: null
    }).catch(function(error) {
      console.error('error', error)
    })
  }

   function addMessage(message) {
    ref
      .add({
        name: getUserEmail(),
        dsc: message,
      }).catch(error => {
        console.log(error)
      })
  } 



  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/HomePage">
            <HomePage />
          </Route>
          <Route exact path="/">
            {user ? <HomePage dataMessages={dataMessages} loading={loading} addMessage={addMessage} makeMessage={makeMessage} handleLogout={handleLogout} userEmail={user.email}/> : <LoginPanel 
              email={email} 
              password={password}
              setEmail={setEmail}
              setPassword={setPassword} 
              emailError={emailError}
              passwordError={passwordError}
              handleLogin={handleLogin}
              hasAccount={hasAccount} />}
          </Route>
          <Route exact path="/SignUp">
            <SignUpPanel 
              email={email} 
              password={password}
              setEmail={setEmail}
              setPassword={setPassword}
              handleSignUp={handleSignUp}
              emailError={emailError}
              passwordError={passwordError} />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;

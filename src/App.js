import React, { useState, useEffect} from 'react';
import './App.css';
import fire from './fire'
import LoginPanel from './components/LoginPanel'
import SignUpPanel from './components/SignUpPanel'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import HomePage from './components/HomePage';

function App() {
  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password1, setPassword1] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordError1, setPasswordError1] = useState('');
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
    if (password === password1) {
      clearErrors();
    fire
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        this.props.history.push('/BugTank')
      })
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
    } else {
      setPasswordError1('Passwords dont match')
      console.error('not matching passwords')
    }
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
      } else {
        setUser("")
      }
    });
  };

  const getUserEmail = () => {
    return fire.auth().currentUser.email
  }


   function addMessage(message) {
    ref = fire.firestore().collection(fire.auth().currentUser.email)
    ref
      .add({
        name: getUserEmail(),
        dsc: message,
      }).catch(error => {
        console.log(error)
      })
  } 

  const homePage = <HomePage dataMessages={dataMessages} loading={loading} addMessage={addMessage} handleLogout={handleLogout} userEmail={user.email}/>

  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/HomePage">
            <HomePage />
          </Route>
          <Route exact path="/BugTank">
            {user ? homePage : <LoginPanel 
              user={user}
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
            {user ? homePage : <SignUpPanel
              email={email} 
              password={password}
              password1={password1}
              setEmail={setEmail}
              setPassword={setPassword}
              setPassword1={setPassword1}
              handleSignUp={handleSignUp}
              emailError={emailError}
              passwordError={passwordError}
              passwordError1={passwordError1} />}
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;

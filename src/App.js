import React, { useState, useEffect} from 'react';
import './App.css';
import fire from './fire'
import LoginPanel from './components/LoginPanel'
import SignUpPanel from './components/SignUpPanel'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import HomePage from './components/HomePage';
import ProjectPage from './components/ProjectPage'
import { nanoid} from 'nanoid'

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
  const [activeProjects, setActiveProjects] = useState(false)
  const [size, setSize] = useState(0)
  const [currentUserEmail, setCurrentUserEmail] = useState('default')
  const [projectClicked, setProjectClicked] = useState(false)
  const [currentProject, setCurrentProject] = useState('')

  let ref = fire.firestore().collection('default')
  const db = fire.firestore()


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
      let items = [];
      setActiveProjects(true)
      console.log('Active project', activeProjects)
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setDataMessages(items)
      setLoading(false);
    })
  }

// TO FIX or DELETE
  function getNumberOfMessages() {
    db.collection(currentUserEmail).get().then(snap => {
      console.log(snap.size)
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
        setCurrentUserEmail(fire.auth().currentUser.email)
        getNumberOfMessages();
        getMessages()
        setUser(user);
      } else {
        setUser("")
      }
    });
  };

  const getUserEmail = () => {
    const email = fire.auth().currentUser.email
    if (email == null) {
      return 'default'
    } else {
      return email
    }
  }

  const changeCurrentProject = nameOfProject => {
    setCurrentProject(nameOfProject)
  }

  function getCurrentDate() {
    let currentDay = new Date()
    let dd = String(currentDay.getDate()).padStart(2, '0')
    let mm = String(currentDay.getMonth() + 1).padStart(2, '0')
    let year = currentDay.getFullYear()

    const currentDate =  dd + '/' + mm + '/' + year

    return currentDate

  }


   function addMessage(message) {
    ref = fire.firestore().collection(fire.auth().currentUser.email)

    ref
      .add({
        userName: getUserEmail(),
        nameOfProject: message,
        dateOfCreation: getCurrentDate(),
        id: nanoid(8)
      }).catch(error => {
        console.log(error)
      })
  }
  
  const deleteProject = (docId) => {
    console.log(fire.firestore().collection(fire.auth().currentUser.email + '-user-bugs').doc(docId))
    //REMEMBER: this don't delete subcollection of collection you delete
    //fire.firestore().collection(currentCollection).doc(clickedDocumentId).delete()
  }

  const homePage = <HomePage deleteProject={deleteProject} changeCurrentProject={changeCurrentProject} dataMessages={dataMessages} loading={loading} addMessage={addMessage} handleLogout={handleLogout} userEmail={user.email} projectClicked={projectClicked} setProjectClicked={setProjectClicked}/>

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
          <Route path="/:id/:id">
              <ProjectPage getCurrentDate={getCurrentDate} loading={loading} currentProject={currentProject} dataMessages={dataMessages}/>
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;

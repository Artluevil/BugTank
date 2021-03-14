import React from 'react'
import { Link } from 'react-router-dom'
import fire from '../fire'

const SignUpPanel = (props) => {

    const {email, password, setEmail, setPassword, passwordError, emailError, handleSignUp} = props;

    //Dodaj przekierowanie po zarejstrowaniu do panelu logowania

    const userRedirect = () => {
        console.log('yeet')
        fire.auth().onAuthStateChanged(user => {
          if(user){
            const redirectLink = '/BugTank'
            return redirectLink
          } else {
            const redirectLink = '/SignUp'
            return redirectLink
          }
        });
      };
    

    return (
        <div>
            <div style={{display: 'inline-block'}}>
                <h1>Sign Up</h1>
                <div style={{display: 'inline-block'}}>
                    <label>Email</label>
                    <input type="text" value={email} onChange={e => setEmail(e.target.value)}></input>
                    <p>{emailError}</p>
                    <label>Password</label>
                    <input type="password" required value={password} onChange={e => setPassword(e.target.value)}></input>
                    <p>{passwordError}</p>
                </div>
            </div>
            <div style={{marginTop: '25px'}}>
                <Link to={userRedirect}><button onClick={handleSignUp}>Sign Up</button></Link>
             </div>
             <div>
                 <p>Already have account? <Link to={"/BugTank"}>Sign in!</Link></p>
             </div>
        </div>
    )
}

export default SignUpPanel
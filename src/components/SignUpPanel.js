import React from 'react'
import { Link } from 'react-router-dom'

const SignUpPanel = (props) => {

    const {email, password, password1, setEmail, setPassword, setPassword1, passwordError, passwordError1, emailError, handleSignUp} = props;
   
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
                    <label>Repeat password</label>
                    <input type="password" required value={password1} onChange={e => setPassword1(e.target.value)}></input>
                    <p>{passwordError1}</p>
                </div>
            </div>
            <div style={{marginTop: '25px'}}>
                <button onClick={handleSignUp}>Sign Up</button>
             </div>
             <div>
                 <p>Already have account? <Link to={"/BugTank"}>Sign in!</Link></p>
             </div>
        </div>
    )
}

export default SignUpPanel
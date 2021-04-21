import React from 'react'
import { Link } from 'react-router-dom'

const SignUpPanel = (props) => {

    const {email, password, password1, setEmail, setPassword, setPassword1, passwordError, passwordError1, emailError, handleSignUp} = props;
   
    return (
        <div className="sign-up-wrapper">
            <h1 style={{marginTop: '50px'}}>Sign Up</h1>
            <label style={{marginLeft: '22px',marginRight: '5px'}}>Email</label>
            <input type="text" value={email} onChange={e => setEmail(e.target.value)}></input>
            <p className="error-msg">{emailError}</p>
            <label style={{marginRight: '5px'}}>Password</label>
            <input type="password" required value={password} onChange={e => setPassword(e.target.value)}></input>
            <p className="error-msg">{passwordError}</p>
            <label style={{marginLeft: '-35px', marginRight: '5px'}}>Repeat password</label>
            <input type="password" required value={password1} onChange={e => setPassword1(e.target.value)}></input>
            <p className="error-msg">{passwordError1}</p>
            <div style={{marginTop: '25px'}}>
                <button className="btn-sign-in-out" onClick={handleSignUp}>Sign Up</button>
             </div>
             <div>
                 <p>Already have account? <Link to={"/BugTank"}>Sign in!</Link></p>
             </div>
        </div>
    )
}

export default SignUpPanel
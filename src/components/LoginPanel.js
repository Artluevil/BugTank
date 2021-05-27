import React from 'react'
import {Link } from 'react-router-dom';

const LoginPanel = (props) => {
    
    const { email, password, setEmail, setPassword, handleLogin, emailError, passwordError} = props;

    return (
        <div>
            <h2>You can read more about BugTank <a href="/BugTank">here!</a></h2>
            <h2>or</h2>
            <div className="sign-in-wrapper">
                <div className="inputs-wrapper">
                    <h1>Sign in!</h1>
                    <label className="email">Email</label>
                    <input type="text" autoFocus value={email} onChange={e => setEmail(e.target.value)}></input>
                    <p className="error-msg">{emailError}</p>
                    <label>Password</label>
                    <input type="password" required value={password} onChange={e => setPassword(e.target.value)}></input>
                    <p className="error-msg">{passwordError}</p>
                </div>
                <div className="btnContainer">
                    <button className="btn-sign-in-out" onClick={handleLogin}>Sign In</button>
                </div>
                <div className="helper-links">
                    <p>Dont have account? <Link to="/SignUp">Sign Up!</Link></p>
                    <p>Forgot your password? <a href="#">Click here!</a></p>
                </div>
            </div>
        </div>
    )
}

export default LoginPanel
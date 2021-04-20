import React from 'react'
import {Link } from 'react-router-dom';

const LoginPanel = (props) => {
    
    const { email, password, setEmail, setPassword, handleLogin, emailError, passwordError} = props;

    return (
        <div className="sign-in-wrapper">
                <h1>Sign in!</h1>
                <label>Username</label>
                <input type="text" autoFocus value={email} onChange={e => setEmail(e.target.value)}></input>
                <p className="errorMsg">{emailError}</p>
                <label>Password</label>
                <input type="password" required value={password} onChange={e => setPassword(e.target.value)}></input>
                <p className="errorMsg">{passwordError}</p>
                <div className="btnContainer">
                    <button className="btn-sign-in" onClick={handleLogin}>Sign In</button>
                </div>
                <div className="helper-links">
                    <p>Dont have account? <Link to={"/SignUp"}>Sign Up!</Link></p>
                    <p>Forgot your password? <a href="#">Click here!</a></p>
                </div>
            </div>
    )
}

export default LoginPanel
import React, { Component } from 'react'
import {BrowserRouter, Link, Route } from 'react-router-dom';
import SignUpPanel from './SignUpPanel'

const LoginPanel = (props) => {
    
    const { email, password, setEmail, setPassword, handleLogin, emailError, passwordError, hasAccount } = props;

    return (
        <div>
                <h1>Login Panel</h1>
                <label>Username</label>
                <input type="text" autoFocus value={email} onChange={e => setEmail(e.target.value)}></input>
                <p className="errorMsg">{emailError}</p>
                <label>Password</label>
                <input type="password" required value={password} onChange={e => setPassword(e.target.value)}></input>
                <p className="errorMsg">{passwordError}</p>
                <div className="btnContainer">
                    <button onClick={handleLogin}>Login</button>
                </div>
                <p>Dont have account? <Link to={"/SignUp"}>Sign Up!</Link></p>
                <p>Forgot your password? <a href="#">Click here!</a></p>
            </div>
    )
}

export default LoginPanel
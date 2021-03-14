import React, { Component } from 'react'

const SignUpPanel = (props) => {

    const {email, password, setEmail, setPassword, passwordError, emailError, handleSignUp} = props;

    return (
        <div>
            <div style={{display: 'inline-block'}}>
                <h1>Sign Up</h1>
                <label>Login</label>
                <input type="text" autoFocus value={email} onChange={e => setEmail(e.target.value)}></input>
                <p>{emailError}</p>
                <label>Password</label>
                <input type="password" required value={password} onChange={e => setPassword(e.target.value)}></input>
                <p>{passwordError}</p>
            </div>
            <div style={{marginTop: '25px'}}>
                <button onClick={handleSignUp}>Sign Up</button>
             </div>
        </div>
    )
}

export default SignUpPanel
import React from 'react';
import '../App.css';
import LoginButton from '../components/loginButton.js'
import LogoutButton from '../components/logoutButton.js'

function Login() {
    return (
        <><div className = "login"><h1>Login to GasPal</h1></div>
        <div className = "loginBtns">
        <LoginButton/>
        </div>
        <div className = "loginBtns">
        <LogoutButton/>
        </div>
        </>
        );
}

export default Login;
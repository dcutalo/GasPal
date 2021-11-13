import React from 'react';
import '../App.css';
import LoginButton from '../components/loginButton.js'
import LogoutButton from '../components/logoutButton.js'

function Login() {
    return (
        <><div><h1>"Login Page"</h1></div><LoginButton/><LogoutButton/></>
        );
}

export default Login;
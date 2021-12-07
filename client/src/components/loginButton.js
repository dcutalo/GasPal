import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();
  
    return <button style={{ fontWeight: 'bold', height:40, width: 200}} onClick={() => loginWithRedirect()}>Log In</button>;
  };
  
  export default LoginButton;
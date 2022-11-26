import React from 'react';
import LoginForm from '../../components/LoginForm';
import { DivExterna, LoginS } from './Style';
import Logo from '../../images/pinacolada app.png';

function Login() {
  return (
    <DivExterna>
      <LoginS>
        <img id="logo" src={ Logo } alt="Logo" />
        <LoginForm />
      </LoginS>
    </DivExterna>
  );
}

export default Login;

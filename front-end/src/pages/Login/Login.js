import React from 'react';
import LoginForm from '../../components/LoginForm';
import { DivExterna, LoginS } from './Style';

function Login() {
  return (
    <DivExterna>
      <LoginS>
        <LoginForm />
      </LoginS>
    </DivExterna>
  );
}

export default Login;

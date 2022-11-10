import React from 'react';
import RegisterForm from '../../components/RegisterForm';
import { DivExterna, RegisterS } from './Style';

function Register() {
  return (
    <DivExterna>
      <RegisterS>
        <RegisterForm />
      </RegisterS>
    </DivExterna>
  );
}

export default Register;

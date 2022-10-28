import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from '../pages/Login';
import Cadastro from '../pages/Cadastro';

function Content() {
  return (
    <Routes>
      <Route exact path="/" element={ <Login /> } />
      <Route exact path="/register" element={ <Cadastro /> } />
    </Routes>
  );
}

export default Content;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import saveUserInfo from '../helpers/saveUserInfo';
import api from '../services';

function RegisterForm() {
  const [isDisabled, setIsDisabled] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [formSignUp, setFormSignUp] = useState({
    name: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  /* Função que cadastra um novo usuário na API (api.register)
     também salva as informações no localStorage */
  const register = async (event, name, email, password) => {
    event.preventDefault();
    const response = await api.register(name, email, password);
    if (response.error) {
      setErrorMessage(response.message);
      return;
    }

    const { token, role, id } = response;
    saveUserInfo({ id, name, email, role, token });

    return navigate('/customer/products');
  };

  /* Função que atualiza o estado formLogin com os dados digitados no input */
  const handleChange = ({ target }) => {
    const { name, value } = target;
    setFormSignUp((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  /* Função que valida os dados digitados e habilita ou desabilita o botão de Cadastrar */
  const validateRegister = () => {
    const PASSWORD_LENGH = 6;
    const NAME_LENGH = 12;
    const emailFormat = /[a-zA-Z0-9._]+@[a-zA-Z]+\.[a-zA-Z.]*\w$/;
    const emailValidation = emailFormat.test(formSignUp.email);

    if (emailValidation && formSignUp.password.length >= PASSWORD_LENGH
      && formSignUp.name.length >= NAME_LENGH) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };

  /* useEffect que chama a função validateRegister toda vez que o estado formLogin é alterado */
  useEffect(() => {
    validateRegister();
  }, [formSignUp]);

  return (
    <div>
      <div>
        <h1>
          Cadastro
        </h1>
      </div>
      <form id="registerForm">
        <div id="inputs">
          <label htmlFor="name">
            <p id="inputTitle">Nome</p>
            <input
              data-testid="common_register__input-name"
              id="name"
              type="text"
              name="name"
              placeholder="Seu nome"
              value={ formSignUp.name }
              onChange={ handleChange }
              required
            />
          </label>
          <label htmlFor="email">
            <p id="inputTitle">Email</p>
            <input
              data-testid="common_register__input-email"
              id="email"
              type="email"
              name="email"
              placeholder="seu-email@site.com.br"
              value={ formSignUp.email }
              onChange={ handleChange }
              required
            />
          </label>
          <label htmlFor="passwordLabel">
            <p id="inputTitle">Senha</p>
            <input
              data-testid="common_register__input-password"
              id="passwordLabel"
              name="password"
              value={ formSignUp.password }
              type="password"
              placeholder="**********"
              onChange={ handleChange }
            />
          </label>
        </div>
        <button
          id="registerButton"
          data-testid="common_register__button-register"
          type="submit"
          disabled={ isDisabled }
          onClick={ (event) => register(
            event,
            formSignUp.name,
            formSignUp.email,
            formSignUp.password,
          ) }
        >
          Cadastrar
        </button>
      </form>
      {
        errorMessage
          && (
            <p
              data-testid="common_register__element-invalid_register"
            >
              { errorMessage }
            </p>
          )
      }
    </div>
  );
}

export default RegisterForm;

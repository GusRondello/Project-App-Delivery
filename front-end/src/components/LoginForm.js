import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import saveUserInfo from '../helpers/saveUserInfo';
import getUserInfo from '../helpers/getUserInfo';
import api from '../services';
import Button, { LinkButton } from './Button';
import TextField from './TextField';
import FlexColumn from './FlexColumn';

function LoginForm() {
  const [isDisabled, setIsDisabled] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [formLogin, setFormLogin] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  /* useEffect que chama a função getUserInfo que recebe os dados do localStorage
     e caso existir um user redireciona para a rota /customer/products */
  useEffect(() => {
    const userInfo = getUserInfo();
    if (userInfo) {
      return navigate('/customer/products');
    }
  }, []);

  /* Função que valida os dados digitados e habilita ou desabilita o botão de login */
  const validateLogin = () => {
    const re = /\S+@\S+\.\S+/;
    const emailValidation = re.test(formLogin.email);
    const PASSWORD_LENGH = 6;

    if (emailValidation && formLogin.password.length >= PASSWORD_LENGH) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };

  /* useEffect que chama a função validateLogin toda vez que o estado formLogin é alterado */
  useEffect(() => {
    validateLogin();
  }, [formLogin]);

  /* Função que atualiza o estado formLogin com os dados digitados no input */
  const handleChange = ({ target }) => {
    const { name, value } = target;
    console.log(name, value);
    setFormLogin((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  /* Função que envia os dados do login para a API (api.singIn) e em caso de sucesso
     salva os dados do usuário logado no localStorage */
  const singIn = async (email, password) => {
    const response = await api.singIn(email, password);
    if (response.error) {
      setErrorMessage(response.message);
      return navigate('/login');
    }

    const { id, token, role, name } = response;
    saveUserInfo({ id, name, email, role, token });

    if (role === 'seller') {
      return navigate('/seller/orders');
    }

    if (role === 'administrator') {
      return navigate('/admin/manage');
    }

    return navigate('/customer/products');
  };

  return (
    <form
      id="loginForm"
      onSubmit={ (e) => {
        e.preventDefault();
        singIn(formLogin.email, formLogin.password);
      } }
    >
      <FlexColumn gap="16px">
        <TextField
          label="Login"
          data-testid="common_login__input-email"
          type="email"
          placeholder="Digite seu e-mail"
          name="email"
          value={ formLogin.email }
          onChange={ handleChange }
        />
        <TextField
          label="Senha"
          data-testid="common_login__input-password"
          type="password"
          placeholder="Digite sua senha"
          name="password"
          value={ formLogin.password }
          onChange={ handleChange }
        />
        <Button
          full
          data-testid="common_login__button-login"
          disabled={ isDisabled }
        >
          Login
        </Button>
        <LinkButton
          full
          data-testid="common_login__button-register"
          to="/register"
        >
          Ainda não tenho conta
        </LinkButton>
        {errorMessage && (
          <p data-testid="common_login__element-invalid-email">
            {errorMessage}
          </p>
        )}
      </FlexColumn>
    </form>
  );
}

export default LoginForm;

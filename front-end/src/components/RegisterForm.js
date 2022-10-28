import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import DeliveryContext from '../context/DeliveryContext ';
import saveToken from '../helpers/saveToken';
import { register as registerService } from '../services';

function RegisterForm() {
  const [isDisabled, setIsDisabled] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [formSignUp, setFormSignUp] = useState({
    name: '',
    email: '',
    password: '',
  });
  // const [role, setRole] = useState('');

  const navigate = useNavigate();

  const register = async (event, name, email, password) => {
    event.preventDefault();
    const response = await registerService(name, email, password);
    if (response.error === true) {
      setErrorMessage(response.message);
      // return navigate('/customer/products');
      return;
    }

    const { token } = response;
    saveToken(token);
    return navigate('/customer/products');
  };

  // handle generico
  const handleChange = ({ target }) => {
    const { name, value } = target;
    setFormSignUp((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateRegister = () => {
    console.log('password', formSignUp.password);
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

  useEffect(() => {
    validateRegister();
  }, [formSignUp]);

  return (
    <div>
      <div>
        <h3>
          Cadastro
        </h3>
      </div>
      <div>
        <form>
          <label htmlFor="name">
            Nome
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
            Email
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
            Senha
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
          <button
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
    </div>
  );
}

export default RegisterForm;

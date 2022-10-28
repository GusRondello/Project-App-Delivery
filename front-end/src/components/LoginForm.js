import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import saveToken from '../helpers/saveToken';
import { singIn as singInService } from '../services';

function LoginForm() {
  const [isDisabled, setIsDisabled] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [formLogin, setFormLogin] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

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

  useEffect(() => {
    validateLogin();
  }, [formLogin]);

  // handle generico
  const handleChange = ({ target }) => {
    const { name, value } = target;
    setFormLogin((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const singIn = async (email, password) => {
    const response = await singInService(email, password);
    if (response.error === true) {
      setErrorMessage(response.message);
      return navigate('/login');
    }

    const { token } = response;
    saveToken(token);
    return navigate('/customer/products');
  };

  return (
    <div>
      <div>
        <form>
          <div>
            <input
              data-testid="common_login__input-email"
              type="email"
              placeholder="Digite seu e-mail"
              name="email"
              value={ formLogin.email }
              onChange={ handleChange }
            />
          </div>
          <div>
            <input
              data-testid="common_login__input-password"
              type="password"
              placeholder="Digite sua senha"
              name="password"
              value={ formLogin.password }
              onChange={ handleChange }
            />
          </div>
          <div>
            <button
              data-testid="common_login__button-login"
              type="button"
              disabled={ isDisabled }
              onClick={ () => singIn(formLogin.email, formLogin.password) }
            >
              Login
            </button>
          </div>
          <div>
            <button
              data-testid="common_login__button-register"
              type="submit"
              onClick={ () => navigate('/register', { replace: true }) }
            >
              Não tem uma conta?
            </button>
          </div>
        </form>
        {
          errorMessage
          && (
            <p
              data-testid="common_login__element-invalid-email"
            >
              { errorMessage }
            </p>
          )
        }
      </div>
    </div>
  );
}

export default LoginForm;

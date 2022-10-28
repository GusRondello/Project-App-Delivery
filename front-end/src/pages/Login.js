import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import saveToken from '../helpers/saveToken';

const URL = 'http://localhost:3001/login';

function Login() {
  const [isDisabled, setIsDisabled] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [tokenReq, setTokenReq] = useState();
  const [formLogin, setFormLogin] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  // handle generico
  const handleChange = ({ target }) => {
    const { name, value } = target;
    setFormLogin((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // handle responsável pela integração da pagina login com o BackEnd
  // caso sucesso, o token eh gerado, do contrário, apresenta um alerta
  // para o usuário.
  function handleLogin(emailRequest, passwordRequest) {
    axios.post(URL, {
      email: emailRequest,
      password: passwordRequest,
    }).then((response) => {
      setTokenReq(response.data);
      setIsDisabled(false);
    }).catch((err) => {
      setIsDisabled(true);
      setErrorMessage(err.response.data.message);
      alert(err.response.data.message);
    });
  }

  useEffect(() => {
    if (tokenReq) {
      const { token } = tokenReq;
      saveToken(token);
      // navigate('/principal', { replace: true });
    }
  }, [tokenReq]);

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
              onClick={ () => handleLogin(formLogin.email, formLogin.password) }
            >
              Login
            </button>
          </div>
          <div>
            <button
              data-testid="common_login__button-register"
              type="submit"
              onClick={ () => navigate('/Cadastro', { replace: true }) }
            >
              Não tem uma conta?
            </button>
          </div>
        </form>
        {
          errorMessage
          && (
            <p
              data-testid="common_login__element-invalid-email
              [Elemento oculto (Mensagens de erro)]"
            >
              { errorMessage }
            </p>
          )
        }
      </div>
    </div>
  );
}

export default Login;

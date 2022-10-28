import React, { useState, useEffect/* , useContext */ } from 'react';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import DeliveryContext from '../context/DeliveryContext ';
import saveToken from '../helpers/saveToken';

const URL = 'http://localhost:3001/register';

function Cadastro() {
  const [isDisabled, setIsDisabled] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [tokenReq, setTokenReq] = useState();
  const [formSignUp, setFormSignUp] = useState({
    name: '',
    email: '',
    password: '',
  });

  // const navigate = useNavigate();

  const handleSubmit = (event, nameReq, emailReq, passwordReq) => {
    event.preventDefault();
    axios.post(URL, {
      fullName: nameReq,
      email: emailReq,
      password: passwordReq,
    }).then((response) => {
      setTokenReq(response.data);
      setIsDisabled(false);
      alert('Usuário cadastrado com sucesso');
    }).catch((err) => {
      setIsDisabled(true);
      setErrorMessage(err.response.data.message);
      alert(err.response.data.message);
    });
  };

  // handle generico utilizados nos forms gerais do front
  const handleChange = ({ target }) => {
    const { name, value } = target;
    setFormSignUp((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

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
        <h1>
          Cadastro
        </h1>
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
            onClick={ (event) => handleSubmit(
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
              data-testid="common_register__element-invalid_register
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

export default Cadastro;

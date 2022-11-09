import React, { useState, useContext } from 'react';
import Header from '../components/Header';
import SelectField from '../components/AdminComponents/SelectField';
import TextField from '../components/AdminComponents/TextField';
import getUserInfo from '../helpers/getUserInfo';
import { validateEmail, validateMinLength } from '../helpers/validators';
import api from '../services';
import UsersTable from '../components/AdminComponents/UsersTable';
import DeliveryContext from '../context/DeliveryContext ';

const MIN_NAME_LENGTH = 12;
const MIN_PASSWORD_LENGTH = 6;

function AdminManage() {
  const { setHasAdminChangedUsers } = useContext(DeliveryContext);
  const [form, setForm] = useState({
    serverError: '',
    valid: false,
    values: {
      name: '',
      email: '',
      password: '',
      role: 'customer',
    },
    errors: {
      name: true,
      email: true,
      password: true,
      role: false,
    },
  });

  function handleFormChange(name, validator) {
    return (e) => {
      const { value } = e.target;

      setForm((state) => {
        const error = validator ? !validator(value) : false;
        const errors = { ...state.errors, [name]: error };
        const valid = Object.values(errors).every((it) => it === false);

        return {
          ...state,
          valid,
          errors,
          values: { ...state.values, [name]: value },
        };
      });
    };
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const { token } = getUserInfo();
    const { name, email, password, role } = form.values;
    const response = await api.registerAsAdmin(
      { name, email, password, role },
      token,
    );
    setHasAdminChangedUsers(true);

    if (response.error) {
      setForm((state) => ({ ...state, serverError: response.message }));
    } else {
      setForm((state) => ({ ...state, serverError: '' }));
    }
  }

  // console.log(form);

  return (
    <div>
      <Header />
      <form onSubmit={ handleSubmit }>
        <h2>Cadastrar novo usuário</h2>
        {form.serverError && (
          <p data-testid="admin_manage__element-invalid-register">
            {form.serverError}
          </p>
        )}
        <fieldset>
          <TextField
            name="name"
            label="Nome"
            testId="admin_manage__input-name"
            value={ form.values.name }
            onChange={ handleFormChange(
              'name',
              validateMinLength(MIN_NAME_LENGTH),
            ) }
          />
          <TextField
            name="email"
            label="Email"
            testId="admin_manage__input-email"
            value={ form.values.email }
            onChange={ handleFormChange('email', validateEmail) }
          />
          <TextField
            type="password"
            name="password"
            label="Senha"
            testId="admin_manage__input-password"
            value={ form.values.password }
            onChange={ handleFormChange(
              'password',
              validateMinLength(MIN_PASSWORD_LENGTH),
            ) }
          />
          <SelectField
            name="role"
            label="Tipo"
            testId="admin_manage__select-role"
            options={ [
              { value: 'administrator', label: 'Administrador' },
              { value: 'seller', label: 'Vendedor' },
              { value: 'customer', label: 'Cliente' },
            ] }
            value={ form.values.role }
            onChange={ handleFormChange('role') }
          />
          <button
            disabled={ !form.valid }
            type="submit"
            data-testid="admin_manage__button-register"
          >
            Cadastrar
          </button>
        </fieldset>
      </form>
      <UsersTable />
    </div>
  );
}

export default AdminManage;

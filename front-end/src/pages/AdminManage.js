import React, { useState } from 'react';
import Header from '../components/Header';
import SelectField from '../components/SelectField';
import TextField from '../components/TextField';
import { validateEmail, validateMinLength } from '../helpers/validators';

const MIN_NAME_LENGTH = 12;
const MIN_PASSWORD_LENGTH = 6;

function AdminManage() {
  const [form, setForm] = useState({
    valid: false,
    values: {
      name: '',
      email: '',
      password: '',
      type: 'customer',
    },
    errors: {
      name: true,
      email: true,
      password: true,
      type: false,
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
          valid,
          errors,
          values: { ...state.values, [name]: value },
        };
      });
    };
  }

  return (
    <div>
      <Header />
      <form>
        <h2>Cadastrar novo usuário</h2>
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
            name="type"
            label="Tipo"
            testId="admin_manage__select-role"
            options={ [
              { value: 'administrator', label: 'Administrador' },
              { value: 'seller', label: 'Vendedor' },
              { value: 'customer', label: 'Cliente' },
            ] }
            value={ form.values.type }
            onChange={ handleFormChange('type') }
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
    </div>
  );
}

export default AdminManage;

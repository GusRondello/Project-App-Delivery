import React, { useState, useContext } from 'react';
import SelectField from '../../components/FormComponents/SelectField';
import TextField from '../../components/FormComponents/TextField';
import getUserInfo from '../../helpers/getUserInfo';
import { validateEmail, validateMinLength } from '../../helpers/validators';
import api from '../../services';
import DeliveryContext from '../../context/DeliveryContext';
import Button from '../../components/Button';
import FieldSet from '../../components/FormComponents/FieldSet';
import PageTitle from '../../components/Typography/PageTitle';

const MIN_NAME_LENGTH = 12;
const MIN_PASSWORD_LENGTH = 6;

export default function RegisterForm() {
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

  return (
    <form onSubmit={ handleSubmit }>
      <PageTitle>Cadastrar novo usuário</PageTitle>
      {form.serverError && (
        <p data-testid="admin_manage__element-invalid-register">
          {form.serverError}
        </p>
      )}
      <FieldSet
        button={
          <Button
            type="submit"
            disabled={ !form.valid }
            data-testid="admin_manage__button-register"
          >
            Cadastrar
          </Button>
        }
      >
        <TextField
          name="name"
          label="Nome"
          data-testid="admin_manage__input-name"
          value={ form.values.name }
          onChange={ handleFormChange(
            'name',
            validateMinLength(MIN_NAME_LENGTH),
          ) }
        />
        <TextField
          name="email"
          label="Email"
          data-testid="admin_manage__input-email"
          value={ form.values.email }
          onChange={ handleFormChange('email', validateEmail) }
        />
        <TextField
          type="password"
          name="password"
          label="Senha"
          data-testid="admin_manage__input-password"
          value={ form.values.password }
          onChange={ handleFormChange(
            'password',
            validateMinLength(MIN_PASSWORD_LENGTH),
          ) }
        />
        <SelectField
          name="role"
          label="Tipo"
          data-testid="admin_manage__select-role"
          options={ [
            { value: 'administrator', label: 'Administrador' },
            { value: 'seller', label: 'Vendedor' },
            { value: 'customer', label: 'Cliente' },
          ] }
          value={ form.values.role }
          onChange={ handleFormChange('role') }
        />
      </FieldSet>
    </form>
  );
}

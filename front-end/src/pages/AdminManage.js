import React from 'react';
import Header from '../components/Header';
import SelectField from '../components/SelectField';
import TextField from '../components/TextField';

function AdminManage() {
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
            value=""
            onChange={ () => {} }
          />
          <TextField
            name="email"
            label="Email"
            testId="admin_manage__input-email"
            value=""
            onChange={ () => {} }
          />
          <TextField
            type="password"
            name="password"
            label="Senha"
            testId="admin_manage__input-password"
            value=""
            onChange={ () => {} }
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
            value=""
            onChange={ () => {} }
          />
          <button type="submit" data-testid="admin_manage__button-register">
            Cadastrar
          </button>
        </fieldset>
      </form>
    </div>
  );
}

export default AdminManage;

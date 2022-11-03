import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testa a tela de Login', () => {
  it('Testa se a tela de login contém os elementos', () => {
    renderWithRouter(<App />, ['/login']);
    const emailInput = screen.getByTestId('common_login__input-email');
    const passwordInput = screen.getByTestId('common_login__input-password');
    const loginButton = screen.getByTestId('common_login__button-login');
    const registerButton = screen.getByTestId('common_login__button-register');
    // const errorMessage = screen.getByTestId('common_login__element-invalid-email');

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
    expect(registerButton).toBeInTheDocument();
    // expect(errorMessage).toBeInTheDocument();
  });
});
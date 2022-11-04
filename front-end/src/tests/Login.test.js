import React from "react";
import { screen, waitFor } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import renderWithRouter from "./helpers/renderWithRouter";
import App from '../App'
import api from '../services'
import mocks from './mocks'

jest.mock('../services');

describe('Login Page', () => {
  afterEach(() => jest.restoreAllMocks());

  describe('Test Login renderization', () => {
    it('should render login page', () => {
      renderWithRouter(<App/>, ['/login']);
    });
  
    it('should have all elements rendered', () => {
      renderWithRouter(<App />, ['/login']);
      const emailInput = screen.getByPlaceholderText('Digite seu e-mail');
      const passwordInput = screen.getByPlaceholderText('Digite sua senha');
      const loginButton = screen.getByRole('button', { name: /login/i });
      const registerButton = screen.getByRole('button', { name: /Não tem uma conta?/i });
  
      expect(emailInput).toBeInTheDocument();
      expect(passwordInput).toBeInTheDocument();
      expect(loginButton).toBeInTheDocument();
      expect(registerButton).toBeInTheDocument();
    });

    it('should not be enable login button when email field value is invalid', async () => {
      renderWithRouter(<App />, ['/login']);
      const emailInput = screen.getByPlaceholderText('Digite seu e-mail');
      const passwordInput = screen.getByPlaceholderText('Digite sua senha');
      const loginButton = screen.getByRole('button', { name: /login/i });
      
      userEvent.type(emailInput, 'test_test.com');
      userEvent.type(passwordInput, 'test123456');
  
      expect(loginButton).toBeDisabled();
    });

    it('should not be enable login button when password field value is invalid', async () => {
      renderWithRouter(<App />, ['/login']);
      const emailInput = screen.getByPlaceholderText('Digite seu e-mail');
      const passwordInput = screen.getByPlaceholderText('Digite sua senha');
      const loginButton = screen.getByRole('button', { name: /login/i });
      
      userEvent.type(emailInput, 'test@test.com');
      userEvent.type(passwordInput, 'tes');
  
      expect(loginButton).toBeDisabled();
    });

      
    it('should be enable login button when all fields value are valid', async () => {
      renderWithRouter(<App />, ['/login']);
      const emailInput = screen.getByPlaceholderText('Digite seu e-mail');
      const passwordInput = screen.getByPlaceholderText('Digite sua senha');
      const loginButton = screen.getByRole('button', { name: /login/i });
      
      userEvent.type(emailInput, 'test@test.com');
      userEvent.type(passwordInput, 'test123456');
  
      expect(loginButton).not.toBeDisabled();
    });
  });

  describe('Test sign up', () => {
    it('should not be disable register button', async () => {
      renderWithRouter(<App />, ['/login']);
      const registerButton = screen.getByRole('button', { name: /Não tem uma conta?/i });
  
      expect(registerButton).not.toBeDisabled();
    });

    it('should redirect to products page after submit login forms', async () => {
      renderWithRouter(<App />, ['/login']);
      const registerButton = screen.getByRole('button', { name: /Não tem uma conta?/i });
  
      userEvent.click(registerButton);
  
      await waitFor(
        () => expect(screen.getByRole('heading', { name: /cadastro/i, level: 3 })).toBeInTheDocument(),
        { timeout: 1000 }
      );
    });
  });

  describe('Test when login request submission fails', () => {
    beforeEach(() => {
      const errorResponse = {
        error: 'UserNotFound',
        message: 'User not found',
        statusCode: 404
      }
      api.singIn.mockResolvedValue(errorResponse);
    });
  
    it('should show error message when login data is invalid', async () => {
      renderWithRouter(<App />, ['/login']);
      const emailInput = screen.getByPlaceholderText('Digite seu e-mail');
      const passwordInput = screen.getByPlaceholderText('Digite sua senha');
      const loginButton = screen.getByRole('button', { name: /login/i });
      
      userEvent.type(emailInput, 'test@test.com');
      userEvent.type(passwordInput, 'test123456');
  
      expect(loginButton).not.toBeDisabled();
  
      userEvent.click(loginButton);
  
      await waitFor(
        () => expect(screen.getByText('User not found')).toBeInTheDocument(),
        { timeout: 1000 }
      );
    });
  });

  describe('Test when login request submission was successful', () => {
    beforeEach(() => {
      api.singIn.mockResolvedValue(mocks.userMock.userInfos);
    });
  
    it('should redirect to products page after submit login forms', async () => {
      renderWithRouter(<App />, ['/login']);
      const emailInput = screen.getByPlaceholderText('Digite seu e-mail');
      const passwordInput = screen.getByPlaceholderText('Digite sua senha');
      const loginButton = screen.getByRole('button', { name: /login/i });
      
      userEvent.type(emailInput, 'test@test.com');
      userEvent.type(passwordInput, 'test123456');
  
      expect(loginButton).not.toBeDisabled();
  
      userEvent.click(loginButton);
  
      await waitFor(
        () => expect(screen.getByText(mocks.userMock.userInfos.name)).toBeInTheDocument(),
        { timeout: 1000 }
      );
    });
  });
});

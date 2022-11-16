import React from "react";
import { screen, waitFor } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import renderWithRouter from "./helpers/renderWithRouter";
import App from '../App'
import api from '../services'
import { userMock, productsMock } from './mocks'

jest.mock('../services');

describe('Register Page', () => {
  afterEach(() => jest.restoreAllMocks());

  describe('Test Register renderization', () => {
    it('should render login page', () => {
      renderWithRouter(<App/>, ['/register']);
    });
  
    it('should have all elements rendered', () => {
      renderWithRouter(<App />, ['/register']);
      const signUpTitle = screen.getByRole('heading', { name: /cadastro/i, level: 3 });
      const nameInput = screen.getByLabelText('Nome');
      const emailInput = screen.getByLabelText('Email');
      const passwordInput = screen.getByLabelText('Senha');
      const signUpButton = screen.getByRole('button', { name: /cadastrar/i });
  
      expect(signUpTitle).toBeInTheDocument();
      expect(nameInput).toBeInTheDocument();
      expect(emailInput).toBeInTheDocument();
      expect(passwordInput).toBeInTheDocument();
      expect(signUpButton).toBeInTheDocument();
    });

    it('should not enable login button when name field value is invalid', async () => {
      renderWithRouter(<App />, ['/register']);
      const nameInput = screen.getByLabelText('Nome');
      const emailInput = screen.getByLabelText('Email');
      const passwordInput = screen.getByLabelText('Senha');
      const signUpButton = screen.getByRole('button', { name: /cadastrar/i });
      
      userEvent.type(nameInput, 'Test');
      userEvent.type(emailInput, 'test@test.com');
      userEvent.type(passwordInput, 'test123456');
  
      expect(signUpButton).toBeDisabled();
    });

    it('should not enable login button when email field value is invalid', async () => {
      renderWithRouter(<App />, ['/register']);
      const nameInput = screen.getByLabelText('Nome');
      const emailInput = screen.getByLabelText('Email');
      const passwordInput = screen.getByLabelText('Senha');
      const signUpButton = screen.getByRole('button', { name: /cadastrar/i });
      
      userEvent.type(nameInput, 'Test user mock');
      userEvent.type(emailInput, 'test_test.com');
      userEvent.type(passwordInput, 'test123456');
  
      expect(signUpButton).toBeDisabled();
    });

    it('should not enable login button when password field value is invalid', async () => {
      renderWithRouter(<App />, ['/register']);
      const nameInput = screen.getByLabelText('Nome');
      const emailInput = screen.getByLabelText('Email');
      const passwordInput = screen.getByLabelText('Senha');
      const signUpButton = screen.getByRole('button', { name: /cadastrar/i });
      
      userEvent.type(nameInput, 'Test user mock');
      userEvent.type(emailInput, 'test@test.com');
      userEvent.type(passwordInput, 'tes');
  
      expect(signUpButton).toBeDisabled();
    });

      
    it('should enable login button when all fields values are valid', async () => {
      renderWithRouter(<App />, ['/register']);
      const nameInput = screen.getByLabelText('Nome');
      const emailInput = screen.getByLabelText('Email');
      const passwordInput = screen.getByLabelText('Senha');
      const signUpButton = screen.getByRole('button', { name: /cadastrar/i });
      
      userEvent.type(nameInput, 'Test user mock');
      userEvent.type(emailInput, 'test@test.com');
      userEvent.type(passwordInput, 'test123456789');
  
      expect(signUpButton).not.toBeDisabled();
    });
  });

  describe('Test sign up fails', () => {
    beforeEach(() => {
      const errorResponse = {
        error: 'Conflict',
        message: 'Email address is already registered',
        statusCode: 409
      }

      api.register.mockResolvedValue(errorResponse);
    });

    it('should show error message when user email is already register', async () => {
      renderWithRouter(<App />, ['/register']);
      const nameInput = screen.getByLabelText('Nome');
      const emailInput = screen.getByLabelText('Email');
      const passwordInput = screen.getByLabelText('Senha');
      const signUpButton = screen.getByRole('button', { name: /cadastrar/i });
      
      userEvent.type(nameInput, 'Test user mock');
      userEvent.type(emailInput, 'test@test.com');
      userEvent.type(passwordInput, 'test123456789');
      userEvent.click(signUpButton);
  
      await waitFor(
        () => expect(screen.getByText('Email address is already registered')).toBeInTheDocument(),
        { timeout: 1000 }
      );
    });
  });

  describe('Test sign up succeed', () => {
    beforeEach(() => {
      const { costumerCreatedInfos } = userMock;
      const { products } = productsMock;
      api.register.mockResolvedValue({ ...costumerCreatedInfos });
      api.getProducts.mockResolvedValue({ products });
    });
  
    it('should show error message when login data is invalid', async () => {
      renderWithRouter(<App />, ['/register']);
      const nameInput = screen.getByLabelText('Nome');
      const emailInput = screen.getByLabelText('Email');
      const passwordInput = screen.getByLabelText('Senha');
      const signUpButton = screen.getByRole('button', { name: /cadastrar/i });
      
      userEvent.type(nameInput, 'Test user mock');
      userEvent.type(emailInput, 'test@test.com');
      userEvent.type(passwordInput, 'test123456789');
      userEvent.click(signUpButton);
  
      await waitFor(
        () => expect(screen.getByText(userMock.costumerCreatedInfos.name)).toBeInTheDocument(),
        { timeout: 1000 }
      );
    });
  });
});

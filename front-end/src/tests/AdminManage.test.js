import React from "react";
import { screen, waitFor, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import renderWithRouter from "./helpers/renderWithRouter";
import App from '../App'
import api from '../services'
import { userMock } from './mocks'

jest.mock('../services');

describe('Admin Manage Page', () => {
  describe('Test register user funcionality', () => {
    beforeEach(() => {
      api.registerAsAdmin.mockResolvedValueOnce(userMock.userRegisterByAdmin)
      api.getUsers.mockResolvedValueOnce(userMock.allUsers).mockResolvedValue(userMock.allUsersUpdated);;
  
      localStorage.setItem('user', JSON.stringify(userMock.adminInfos));
      localStorage.setItem('appDeliveryTotalPrice', JSON.stringify('0,00'));
      localStorage.setItem('appDeliveryCartItems', JSON.stringify([]));
    });
  
    afterEach(() => {
      jest.restoreAllMocks();
      localStorage.clear();
    });
  
    describe('Test Admin Manage renderization', () => {
      it('should render customer products page', () => {
        renderWithRouter(<App/>, ['/admin/manage']);
      });
  
      it('should have all elements rendered', async () => {
        renderWithRouter(<App />, ['/admin/manage']);
  
        const registerUserTitle = screen.getByRole('heading', { name: /Cadastrar novo usuário/i, level: 2 });
        const nameInput = screen.getByLabelText('Nome');
        const emailInput = screen.getByLabelText('Email');
        const passswordInput = screen.getByLabelText('Senha');
        const userTyperSelect = screen.getByLabelText('Tipo');
        const registerBtn = screen.getByRole('button', { name: /cadastrar/i });
        const userListTitle = screen.getByRole('heading', { name: /Lista de usuários/i, level: 2 });
    
        expect(registerUserTitle).toBeInTheDocument();
        expect(nameInput).toBeInTheDocument();
        expect(emailInput).toBeInTheDocument();
        expect(passswordInput).toBeInTheDocument();
        expect(userTyperSelect).toBeInTheDocument();
        expect(registerBtn).toBeInTheDocument();
        expect(userListTitle).toBeInTheDocument();
  
        await waitFor(() => {
          const { allUsers } = userMock;
          const user = allUsers[0]
          const userItemID = screen.getByRole('cell', { name: user.id });
          const userItemName = screen.getByRole('cell', { name: user.name });
          const userItemEmail = screen.getByRole('cell', { name: user.email });
          const userItemRole = screen.getByRole('cell', { name: user.role });
          const userItemDeleteBtn = screen.getAllByRole('button', { name: /excluir/i });
  
          expect(userItemID).toBeInTheDocument();
          expect(userItemName).toBeInTheDocument();
          expect(userItemEmail).toBeInTheDocument();
          expect(userItemRole).toBeInTheDocument();
          expect(userItemDeleteBtn[0]).toBeInTheDocument();
        })
      });
    });
  
    describe('Test "cadastrar" button', () => {
      it('should be disabled when there is no valid data in register form', () => {
        renderWithRouter(<App/>, ['/admin/manage']);
  
        const registerBtn = screen.getByRole('button', { name: /cadastrar/i });
  
        expect(registerBtn).toBeDisabled();
      });
  
      it('should be not disabled when there is valid data in form', () => {
        renderWithRouter(<App/>, ['/admin/manage']);
  
        const nameInput = screen.getByLabelText('Nome');
        const emailInput = screen.getByLabelText('Email');
        const passswordInput = screen.getByLabelText('Senha');
        const userTypeOption = screen.getByRole('option', { name: /vendedor/i });
        const registerBtn = screen.getByRole('button', { name: /cadastrar/i });
    
        userEvent.type(nameInput, 'Xablau Silva');
        userEvent.type(emailInput, 'xablau@email.com');
        userEvent.type(passswordInput, 'test_password');
        userEvent.selectOptions(
          screen.getByRole('combobox'),
          userTypeOption,
        );
  
        expect(registerBtn).not.toBeDisabled();
      });
  
      it('should register an user and update user table in page', async () => {
        renderWithRouter(<App />, ['/admin/manage']);
        const nameInput = screen.getByLabelText('Nome');
        const emailInput = screen.getByLabelText('Email');
        const passswordInput = screen.getByLabelText('Senha');
        const userTypeOption = screen.getByRole('option', { name: /vendedor/i });
        const registerBtn = screen.getByRole('button', { name: /cadastrar/i });
    
        userEvent.type(nameInput, 'Xablau Silva');
        userEvent.type(emailInput, 'xablau@email.com');
        userEvent.type(passswordInput, 'test_password');
        userEvent.selectOptions(
          screen.getByRole('combobox'),
          userTypeOption,
        );
        userEvent.click(registerBtn);
  
        await waitFor(() => {
          const { allUsersUpdated } = userMock;
          const user = allUsersUpdated[2]
          const userItemID = screen.getByRole('cell', { name: user.id });
          const userItemName = screen.getByRole('cell', { name: user.name });
          const userItemEmail = screen.getByRole('cell', { name: user.email });
          const userItemRole = screen.getAllByRole('cell', { name: user.role });
          const userItemDeleteBtn = screen.getAllByRole('button', { name: /excluir/i });
  
          expect(userItemID).toBeInTheDocument();
          expect(userItemName).toBeInTheDocument();
          expect(userItemEmail).toBeInTheDocument();
          expect(userItemRole[1]).toBeInTheDocument();
          expect(userItemDeleteBtn[2]).toBeInTheDocument();
        }, { timeout: 3000 })
      });
    });
  });

  describe('Test delete user funcionality', () => {
    beforeEach(() => {
      const allUsersWithoutOne =  userMock.allUsers.filter((_value, index) => index < 1);
      api.registerAsAdmin.mockResolvedValue(userMock.userRegisterByAdmin)
      api.getUsers.mockResolvedValueOnce(userMock.allUsers).mockResolvedValue(allUsersWithoutOne)
  
      localStorage.setItem('user', JSON.stringify(userMock.adminInfos));
      localStorage.setItem('appDeliveryTotalPrice', JSON.stringify('0,00'));
      localStorage.setItem('appDeliveryCartItems', JSON.stringify([]));
    });
  
    afterEach(() => {
      jest.restoreAllMocks();
      localStorage.clear();
    });

    describe('Test delete user button', () => {
      it('should be not disabled when is render', async () => {
        renderWithRouter(<App/>, ['/admin/manage']);
  
        const userItemDeleteBtn = await screen.findAllByRole('button', { name: /excluir/i });
  
        expect(userItemDeleteBtn.length).toEqual(2);
        expect(userItemDeleteBtn[0]).not.toBeDisabled();
        expect(userItemDeleteBtn[1]).not.toBeDisabled();
      });
  
      it('should delete user and not show in page', async () => {
        renderWithRouter(<App />, ['/admin/manage']);
  
        const { allUsers } = userMock;
        const user = allUsers[1];
        const userItemDeleteBtn = await screen.findAllByRole('button', { name: /excluir/i });

        userEvent.click(userItemDeleteBtn[1]);
  
        await waitForElementToBeRemoved(screen.getByRole('cell', { name: user.id }));
      });
    });
  });
});

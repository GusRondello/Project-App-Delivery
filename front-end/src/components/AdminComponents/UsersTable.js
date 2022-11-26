import React, { useEffect, useState, useContext } from 'react';
import UserRow from './UserRow';
import api from '../../services';
import getUserInfo from '../../helpers/getUserInfo';
import DeliveryContext from '../../context/DeliveryContext';
import PageTitle from '../Typography/PageTitle';
import Table from '../Table';

function UsersTable() {
  const [users, setUsers] = useState([]);
  const { hasAdminChangedUsers, setHasAdminChangedUsers } = useContext(DeliveryContext);

  /* Função responsável por pegar todos os usuários da API (api.getUsers) */
  useEffect(() => {
    async function fetchUsers() {
      const { token } = getUserInfo();
      const data = await api.getUsers(token);

      setUsers(data);
      setHasAdminChangedUsers(false);
    }
    fetchUsers();
  }, [hasAdminChangedUsers]);

  return (
    <div>
      <PageTitle>Lista de usuários</PageTitle>
      <Table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Tipo</th>
            <th className="align-right">Excluir</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user, index) => (
            <UserRow key={ user.id } user={ user } index={ index } />
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default UsersTable;

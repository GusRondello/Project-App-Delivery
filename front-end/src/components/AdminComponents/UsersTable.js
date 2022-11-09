import React, { useEffect, useState, useContext } from 'react';
import UserCard from './UserCard';
import api from '../../services';
import getUserInfo from '../../helpers/getUserInfo';
import DeliveryContext from '../../context/DeliveryContext ';

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
      <h2>Lista de usuários</h2>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Tipo</th>
            <th>Excluir</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user, index) => (
            <UserCard
              key={ user.id }
              user={ user }
              index={ index }
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UsersTable;

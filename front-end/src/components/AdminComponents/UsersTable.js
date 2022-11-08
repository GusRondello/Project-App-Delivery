// Componente que renderiza uma tabela com os usuários cadastrados no sistema
import React, { useEffect, useState } from 'react';
import UserCard from './UserCard';
import api from '../../services';
import getUserInfo from '../../helpers/getUserInfo';

function UsersTable() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      const { token } = getUserInfo();
      const data = await api.getUsers(token);
      console.log('data', data);
      setUsers(data);
    }
    fetchUsers();
  }, []);

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

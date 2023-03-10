import React, { useContext } from 'react';
import propTypes from 'prop-types';
import api from '../../services';
import getUserInfo from '../../helpers/getUserInfo';
import DeliveryContext from '../../context/DeliveryContext';
import Button from '../Button';

const DATATESTID_69 = 'admin_manage__element-user-table-item-number-';
const DATATESTID_70 = 'admin_manage__element-user-table-name-';
const DATATESTID_71 = 'admin_manage__element-user-table-email-';
const DATATESTID_72 = 'admin_manage__element-user-table-role-';
const DATATESTID_73 = 'admin_manage__element-user-table-remove-';

/* Responsável por renderizar os elementos do map do componente UserTable */
function UserRow({ user, index }) {
  const { setHasAdminChangedUsers } = useContext(DeliveryContext);

  /* Função responsável por deletar o usuário através da API (api.excludeUser) */
  const handleRemoveUser = (id) => {
    const { token } = getUserInfo();
    api.excludeUser(token, id);
    setHasAdminChangedUsers(true);
  };

  return (
    <tr key={ index }>
      <td data-testid={ `${DATATESTID_69}${index}` }>{index + 1}</td>
      <td data-testid={ `${DATATESTID_70}${index}` }>{user.name}</td>
      <td data-testid={ `${DATATESTID_71}${index}` }>{user.email}</td>
      <td data-testid={ `${DATATESTID_72}${index}` }>{user.role}</td>
      <td
        data-testid={ `${DATATESTID_73}${index}` }
        className="align-right"
        style={ { width: 0 } }
      >
        <Button onClick={ () => handleRemoveUser(user.id) }>Excluir</Button>
      </td>
    </tr>
  );
}

UserRow.propTypes = {
  user: propTypes.shape({
    id: propTypes.number.isRequired,
    name: propTypes.string.isRequired,
    email: propTypes.string.isRequired,
    role: propTypes.string.isRequired,
  }).isRequired,
  index: propTypes.number.isRequired,
};

export default UserRow;

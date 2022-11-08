// Componente que renderiza o card o usuário vindo do map do UsersTable
import React from 'react';
import propTypes from 'prop-types';
import api from '../../services';
import getUserInfo from '../../helpers/getUserInfo';

const DATATESTID_22 = 'element-order-table-item-number-';
const DATATESTID_23 = 'element-order-table-name-';
const DATATESTID_24 = 'element-order-table-quantity-';
const DATATESTID_25 = 'element-order-table-unit-price-';
const DATATESTID_26 = 'element-order-table-sub-total-';

function UserCard({ user, index }) {
  // função que chama a api (excludeUser) e passa o id do usuário a ser excluído
  const handleRemoveUser = (id) => {
    console.log(id);
    const { token } = getUserInfo();
    api.excludeUser(token, id);
  };

  return (
    <tr key={ index }>
      <td data-testid={ `${DATATESTID_22}${index}` }>{index + 1}</td>
      <td data-testid={ `${DATATESTID_23}${index}` }>{user.name}</td>
      <td data-testid={ `${DATATESTID_24}${index}` }>{user.email}</td>
      <td data-testid={ `${DATATESTID_25}${index}` }>{user.role}</td>
      <td data-testid={ `${DATATESTID_26}${index}` }>
        {/* Botão para o usuário */}
        <button
          type="button"
          onClick={ () => handleRemoveUser(user.id) }
        >
          Excluir
        </button>
      </td>
    </tr>
  );
}

UserCard.propTypes = {
  user: propTypes.shape({
    id: propTypes.number.isRequired,
    name: propTypes.string.isRequired,
    email: propTypes.string.isRequired,
    role: propTypes.string.isRequired,
  }).isRequired,
  index: propTypes.number.isRequired,
};

export default UserCard;

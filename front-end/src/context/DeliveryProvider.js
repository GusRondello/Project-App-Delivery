import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import DeliveryContext from './DeliveryContext ';

/* Este Context apenas repassa para os componentes filhos quando for atualizado o status do pedido
   ou inserido/excluido algum usuário */
function DeliveryProvider({ children }) {
  const [isStatusUpdated, setIsStatusUpdated] = useState(false);
  const [hasAdminChangedUsers, setHasAdminChangedUsers] = useState(false);

  const contextValue = useMemo(() => ({
    isStatusUpdated, setIsStatusUpdated, hasAdminChangedUsers, setHasAdminChangedUsers,
  }), [isStatusUpdated, hasAdminChangedUsers]);

  DeliveryProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };

  return (
    <DeliveryContext.Provider value={ contextValue }>
      {children}
    </DeliveryContext.Provider>
  );
}

export default DeliveryProvider;

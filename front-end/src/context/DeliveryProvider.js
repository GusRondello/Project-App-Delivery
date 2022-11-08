import React, { useState, useMemo/* , useEffect */ } from 'react';
import PropTypes from 'prop-types';
import DeliveryContext from './DeliveryContext ';

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

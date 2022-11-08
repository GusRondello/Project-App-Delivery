import React, { useState, useMemo/* , useEffect */ } from 'react';
import PropTypes from 'prop-types';
import DeliveryContext from './DeliveryContext ';

function DeliveryProvider({ children }) {
  const [isStatusUpdated, setIsStatusUpdated] = useState(false);
  const contextValue = useMemo(() => ({
    isStatusUpdated, setIsStatusUpdated,
  }), [isStatusUpdated]);

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

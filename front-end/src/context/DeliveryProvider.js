import React, { useState, useMemo/* , useEffect */ } from 'react';
import PropTypes from 'prop-types';
// import { useHistory } from 'react-router-dom';
import DeliveryContext from './DeliveryContext ';

function DeliveryProvider({ children }) {
  const [isStatusUpdated, setIsStatusUpdated] = useState(false);
  console.log('isStatusUpdated', isStatusUpdated);

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

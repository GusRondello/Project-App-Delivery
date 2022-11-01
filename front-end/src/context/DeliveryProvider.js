import React, { useState, useMemo/* , useEffect */ } from 'react';
import PropTypes from 'prop-types';
// import { useHistory } from 'react-router-dom';
import DeliveryContext from './DeliveryContext ';

function DeliveryProvider({ children }) {
  const [customerName, setCustomerName] = useState([]);
  const [cart, setCart] = useState('xablau');

  const contextValue = useMemo(() => ({
    customerName,
    setCustomerName,
    cart,
    setCart,
  }), [customerName, cart]);

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

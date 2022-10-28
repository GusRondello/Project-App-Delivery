import React, { useState, useMemo/* , useEffect */ } from 'react';
import PropTypes from 'prop-types';
// import { useHistory } from 'react-router-dom';
import StatisticsContext from './DeliveryContext ';

function DeliveryProvider({ children }) {
  const [customerName, setCustomerName] = useState([]);

  const contextValue = useMemo(() => ({
    customerName,
    setCustomerName,
  }), [customerName]);

  DeliveryProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };

  return (
    <StatisticsContext.Provider value={ contextValue }>
      {children}
    </StatisticsContext.Provider>
  );
}

export default DeliveryProvider;

import React, { useState, useMemo/* , useEffect */ } from 'react';
import PropTypes from 'prop-types';
// import { useHistory } from 'react-router-dom';
import StatisticsContext from './DeliveryContext ';

function DeliveryProvider({ children }) {
  const [xablau, setXablau] = useState([]);

  const contextValue = useMemo(() => ({
    xablau,
    setXablau,
  }), [xablau]);

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

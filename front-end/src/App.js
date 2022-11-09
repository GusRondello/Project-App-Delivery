import React from 'react';
import Common from './routers/Common';
import Customer from './routers/Customer';
import Seller from './routers/Seller';
import Admin from './routers/Admin';
import DeliveryProvider from './context/DeliveryProvider';

function App() {
  return (
    <div className="App">
      <DeliveryProvider>
        <Common />
        <Customer />
        <Seller />
        <Admin />
      </DeliveryProvider>
    </div>
  );
}

export default App;

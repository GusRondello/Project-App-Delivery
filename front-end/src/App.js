import React from 'react';
// import './App.css';
// import rockGlass from './images/rockGlass.svg';
import Common from './routers/Common';
import Customer from './routers/Customer';
import DeliveryProvider from './context/DeliveryProvider';
import CustomerProvider from './context/CustomerProvider';

function App() {
  return (
    <div className="App">
      <DeliveryProvider>
        <Common />
        <CustomerProvider>
          <Customer />
        </CustomerProvider>
      </DeliveryProvider>
    </div>
  );
}

export default App;

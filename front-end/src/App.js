import React from 'react';
// import './App.css';
// import rockGlass from './images/rockGlass.svg';
import Content from './routers/Content';
import DeliveryProvider from './context/DeliveryProvider';
// import CustomerProvider from './context/CustomerProvider';

function App() {
  return (
    <div className="App">
      <DeliveryProvider>
        <Content />
        {/* <span className="logo">TRYBE</span>
            <object className="rocksGlass" type="image/svg+xml" data={ rockGlass }>
              Glass
            </object> */}
      </DeliveryProvider>
    </div>
  );
}

export default App;

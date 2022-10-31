import React from 'react';
import Header from '../components/Header';
import CustomerProvider from '../context/CustomerProvider';

function SalleDetail() {
  return (
    <div>
      <CustomerProvider>
        <Header />
        <p>Salle Detail</p>
      </CustomerProvider>
    </div>
  );
}

export default SalleDetail;

import React from 'react';
import Header from '../components/Header';
import CustomerProvider from '../context/CustomerProvider';
import SalleDetailComponent from '../components/SalleDetailComponent';

function SalleDetail() {
  return (
    <div>
      <CustomerProvider>
        <Header />
        <SalleDetailComponent />
      </CustomerProvider>
    </div>
  );
}

export default SalleDetail;

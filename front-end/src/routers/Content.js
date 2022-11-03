import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Products from '../pages/Products';
import Checkout from '../pages/Checkout';
import SalleDetail from '../pages/SalleDetail';
import AdminManage from '../pages/AdminManage';
import Orders from '../pages/Orders';
import OrderDetail from '../pages/OrderDetail';

function Content() {
  return (
    <Routes>
      <Route exact path="/" element={ <Navigate to="/login" /> } />
      <Route exact path="/login" element={ <Login /> } />
      <Route exact path="/register" element={ <Register /> } />
      <Route exact path="/customer/products" element={ <Products /> } />
      <Route exact path="/customer/checkout" element={ <Checkout /> } />
      <Route exact path="/customer/orders/:id" element={ <SalleDetail /> } />
      <Route exact path="/admin/manage" element={ <AdminManage /> } />
      <Route exact path="/customer/orders" element={ <Orders /> } />
      <Route exact path="/customer/orders/:id" element={ <OrderDetail /> } />
    </Routes>
  );
}

export default Content;

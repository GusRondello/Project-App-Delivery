import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminManage from '../pages/AdminManage';

function Common() {
  return (
    <Routes>
      <Route exact path="/admin/manage" element={ <AdminManage /> } />
    </Routes>
  );
}

export default Common;

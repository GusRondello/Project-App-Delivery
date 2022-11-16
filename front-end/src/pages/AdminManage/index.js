import React from 'react';
import UsersTable from '../../components/AdminComponents/UsersTable';
import PrivateLayout from '../../components/PrivateLayout';
import FlexColumn from '../../components/FlexColumn';
import RegisterForm from './RegisterForm';

export default function AdminManage() {
  return (
    <PrivateLayout>
      <FlexColumn gap="18px" align="stretch">
        <RegisterForm />
        <UsersTable />
      </FlexColumn>
    </PrivateLayout>
  );
}

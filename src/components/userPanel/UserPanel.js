import React from 'react';
import CustomerInfo from './CustomerInfo/CustomerInfo';
import Header from './Header/Header';
import './UserPanel.css';

function UserPanel() {
  return (
    <div className='userPanel'>
        <Header />
        <CustomerInfo />
    </div>
  )
}

export default UserPanel;
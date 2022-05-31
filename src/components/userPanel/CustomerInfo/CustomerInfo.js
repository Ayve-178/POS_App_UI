import React from 'react';
import BottomMenu from './BottomMenu';
import Customer from './Customer';
import './CustomerInfo.css';
import PurchaseInfo from './PurchaseInfo';


function CustomerInfo() {
  return (
    <div className='customerInfo'>
        <Customer/>
        <PurchaseInfo />
        <BottomMenu />
    </div>
  )
}

export default CustomerInfo;
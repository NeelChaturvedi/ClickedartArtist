import React from 'react';
import Tabs from '../../components/tabs';
import Invoices from '../AccountTabs/Invoices';
import Orders from '../AccountTabs/Orders';

const Accounts = () => {
  const tabs = [
    { key: 'invoices', label: 'Invoices' },
    { key: 'orders', label: 'Orders' },
  ];

  const contentComponents = {
    invoices: <Invoices/>,
    orders: <Orders/>,
  };

  return (
    <Tabs tabs={tabs} contentComponents={contentComponents}/>
  );
};

export default Accounts;

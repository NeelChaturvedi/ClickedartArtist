import React from 'react';
import Approved from '../Phototabs/Approved';
import Pending from '../Phototabs/Pending';
import Tabs from '../../components/tabs';


const Photos = () => {
  const tabs = [
    { key: 'approved', label: 'Approved' },
    { key: 'pending', label: 'Pending' },
  ];

  const contentComponents = {
    approved: <Approved />,
    pending: <Pending />,
  };

  return <Tabs tabs={tabs} contentComponents={contentComponents} />;
};

export default Photos;

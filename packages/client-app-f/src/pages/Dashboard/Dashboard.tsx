import React from 'react';
import styles from './Dashboard.module.scss';
import { OpenMenuHamburger, PageHeader } from '@foretell/shared';

const Dashboard = () => {
  return (
    <div>
      <PageHeader left={<OpenMenuHamburger />}>Dashboard</PageHeader>
    </div>
  );
};

export default Dashboard;

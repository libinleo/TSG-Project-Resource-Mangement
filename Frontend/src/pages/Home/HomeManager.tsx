import React from 'react';
import bgImage from './bg.jpg';
import SidebarManager from '../Sidebar/SidebarManager';

const HomePageManager: React.FC = () => {
  return (
    <div style={{ display: 'flex' }}>
      <SidebarManager />
      <div style={{ flex: 1, padding: '20px' }}>
        <div style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          height: '90vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <h1 style={{ fontWeight: 'bold' }}>Project Resource Management</h1>
          <h2 style={{ fontWeight: 'bold' }}>Manager Dashboard</h2>
        </div>
      </div>
    </div>
  );
};

export default HomePageManager;

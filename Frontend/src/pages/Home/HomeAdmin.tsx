import React from 'react';
import bgImage from './bg.jpg';
import SidebarAdmin from '../Sidebar/SidebarAdmin';

const HomePageAdmin: React.FC = () => {
  return (
    <div style={{ display: 'flex' }}>
      <SidebarAdmin />
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
          <h2 style={{ fontWeight: 'bold' }}>Admin Dashboard</h2>
        </div>
      </div>
    </div>
  );
};

export default HomePageAdmin;

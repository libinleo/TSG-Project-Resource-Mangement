import React, { useState } from 'react';
import bgImage from './bg.jpg';
import SidebarAdmin from '../Sidebar/SidebarAdmin';
import img from './profile_icon.png';
const HomePageAdmin: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const username = sessionStorage.getItem('username');
  const isLoggedIn = !!username;

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
          justifyContent: 'center',
          position: 'relative'
        }}>
          <h1 style={{ fontWeight: 'bold',fontFamily:'sans-serif' }}>Project Resource Management</h1>
          <h2 style={{ fontWeight: 'bold',fontFamily:'sans-serif'  }}>Admin Dashboard </h2>
          {isLoggedIn && (
            <div style={{ position: 'absolute', top: '0px', right: '10px' }}>
              <button
    style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', backgroundColor: 'transparent', border: 'none' }}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
              <img src={img} alt="Profile"
              style={{ width: '40px', height: '40px', marginRight: '5px' }} />
                <div>
                  {username}
                  </div>
              </button>
              {isDropdownOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: '100%',
                    right: 0,
                    backgroundColor: 'white',
                    padding: '5px',
                    boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',
                    zIndex: 1
                  }}
                >
                 Logged in as  {username}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePageAdmin;

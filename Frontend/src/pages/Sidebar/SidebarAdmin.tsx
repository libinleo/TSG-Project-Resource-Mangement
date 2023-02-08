import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome,faFolder,faSignOut } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import logo from './logo.png';
import './Sidebar.css';

const SidebarAdmin: React.FC = () => {
  return (
    <div className="sidebar-container">
      <div className="sidebar-header">
        <img src={logo} alt="Logo" />
      </div>
      <ul className="sidebar-menu">
        <li className="menu-item">
          <Link to="/homeadmin">
            <FontAwesomeIcon icon={faHome}style={{ paddingRight: '5px' }} />
            Home
          </Link>
        </li>
        <li className="menu-item">
          <Link to="/projecthome">
            <FontAwesomeIcon icon={faFolder}style={{ paddingRight: '5px' }} />
            Project Details
          </Link>
        </li>
        <li className="menu-item">
          <Link to="/">
            <FontAwesomeIcon icon={faSignOut}style={{ paddingRight: '5px' }} />
            Logout
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SidebarAdmin;

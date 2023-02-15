import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome,faFolder,faSignOut } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import 'toastr/build/toastr.min.css';
import toastr from 'toastr';
import { Modal, Button} from 'react-bootstrap';
import logo from './logo.png';
import './Sidebar.css';

const SidebarAdmin: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  const handleLogout = () => {
    setShowModal(true);
  };

  const handleYes = () => {
    setShowModal(false);
    setTimeout(() => {
      window.location.href = 'http://localhost:3000/';
    }, 1000);
    sessionStorage.clear();
    toastr.success('Logout Successful!Redirecting to Login Page');
  };

  const handleNo = () => {
    setShowModal(false);
  };

  return (
    <>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to logout?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleYes}>
            Logout
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="sidebar-container">
        <div className="sidebar-header">
          <img src={logo} alt="Logo" />
        </div>
        <ul className="sidebar-menu">
          <li className="menu-item">
            <Link to="/homeadmin">
              <FontAwesomeIcon icon={faHome} style={{ paddingRight: '5px' }} />
              Home
            </Link>
          </li>
          <li className="menu-item">
            <Link to="/projecthome">
              <FontAwesomeIcon icon={faFolder} style={{ paddingRight: '5px' }} />
              Project Details
            </Link>
          </li>
          <li className="menu-item">
            <a href="#" onClick={handleLogout}>
              <FontAwesomeIcon icon={faSignOut} style={{ paddingRight: '5px' }} />
              Logout
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default SidebarAdmin;

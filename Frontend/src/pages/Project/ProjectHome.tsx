import React, { useState,useEffect, Fragment } from 'react';
import { createSearchParams, Link, useNavigate } from 'react-router-dom';
import axios from '../../utils/interceptors';
import 'toastr/build/toastr.min.css';
import toastr from 'toastr';
import { Button, Table ,Modal} from 'react-bootstrap';
import Sidebar from '../Sidebar/SidebarAdmin';

function ProjectHome()
{
    const [details,setDetails]=useState([]);
    const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState('');
    const getDetails = () => {
        axios.get('http://127.0.0.1:5000/project')
          .then(function(response) {
            setDetails(response.data.map((item:any, index:any) => ({
              ...item,
              priority: index + 1
            })));
          })
          .catch(function(error) {
            // eslint-disable-next-line no-console
            console.log(error);
          });
      };

      useEffect(() => {
        getDetails();
      }, []);
    const navigate=useNavigate();
    const handleEdit = (id: any, name: any, start_date: any,department: any,manager:any,priority:any) =>{
        const params = {id, name, start_date,department,manager,priority};
        navigate({
            pathname: '/createproject',
            search: `?${createSearchParams(params)}`
        });
    };
    const handleDelete = (id: any) => {
        setDeleteId(id);
        setShowModal(true);
      };

      const handleConfirmDelete = () => {
        axios.delete(`http://127.0.0.1:5000/project/${deleteId}`);
        navigate(0);
        setShowModal(false);
        toastr.success('Project Deleted Successfully');
      };
    return(
        <div style={{ display: 'flex' }}>
        <Sidebar />
 <div style={{ flex: 1, padding: '20px' }}>
        <Fragment>
        <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this project?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
            <div style={{margin:'7rem',height:'200px',marginTop:'50px' }}>
            <div>
                <Link className='d-grid gap-7' to ="/createproject">
                    <Button size="lg">+ Create New Project</Button>
                </Link>
                </div><br />
                <Table striped bordered hover size="sm" >
                    <thead>
                        <tr>
                            <th>Project No</th>
                            <th>Project Name</th>
                            <th>Project Start-Date </th>
                            <th>Project Department </th>
                            <th>Manager </th>
                            <th>Actions </th>
                        </tr>
                        </thead>
                        <tbody>
                                {
                                details && details.length > 0 ? details.map((item:any) => {
                                return(
                                    // eslint-disable-next-line react/jsx-key
                                    <tr>
                                        <td>{item.priority}</td>
                                        <td>{item.name}</td>
                                         <td>{item.start_date}</td>
                                         <td>{item.department}</td>
                                         <td>{item.manager}</td>
                                         <td>
                                            <Button onClick={() =>
    handleEdit(item.id,item.name,item.start_date,item.department,item.manager,item.priority)}>Edit</Button>&nbsp;
            <Button onClick={() => handleDelete(item.id)}>Delete</Button>
                                        </td>
                                    </tr>
                                    );
                                })
                                :'No data available'
                            }
                        </tbody>
                </Table>
                </div>
        </Fragment>
        </div></div>
    );
}
export default ProjectHome;
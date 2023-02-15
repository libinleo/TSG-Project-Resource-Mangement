import React, { Fragment, useEffect,useState } from 'react';
import {Button,Table,Modal} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import{createSearchParams, Link,useNavigate} from 'react-router-dom';
import Sidebar from '../Sidebar/SidebarManager';
import 'toastr/build/toastr.min.css';
import toastr from 'toastr';
import axios from '../../utils/interceptors';
function EmployeeHome()
{
    const [details,setDetails]=useState([]);
    const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState('');
     const getDetails=() =>{
        axios.get('http://127.0.0.1:5000/employee')
        .then(function(response){
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
    const handleEdit = (id: any, name: any, skills: any,designation: any,project:any,priority:any) =>{
        const params = {id, name, skills, designation,project,priority};
        navigate({
            pathname: '/createemployee',
            search: `?${createSearchParams(params)}`
        });
    };
    const handleDelete=(id: any)=>{
        setDeleteId(id);
        setShowModal(true);
      };
      const handleConfirmDelete = () => {
        axios.delete(`http://127.0.0.1:5000/employee/${deleteId}`);
        navigate(0);
        setShowModal(false);
        toastr.success('Employee Deleted Successfully');
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
            <div style={{margin:'5rem',height:'200px',marginTop:'50px'}} >
            <div>
                <Link className='d-grid gap-7' to ="/createemployee">
                    <Button size="lg">+ Create New Employee</Button>
                </Link>
                </div><br />
                <Table striped bordered hover size="sm" >
                    <thead>
                        <tr>
                             <th>Emp No</th>
                            <th>Name</th>
                            <th>Skills </th>
                            <th>Designation </th>
                            <th>Project Name </th>
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
                                            <td>{item.skills}</td>
                                            <td>{item.designation}</td>
                                            <td>{item.project}</td>
                                            <td>
<Button onClick={() => handleEdit(item.id,item.name,item.skills,item.designation,item.project,item.priority)}>
    Edit</Button>&nbsp;
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
        </div>
        </div>
    );
}
export default EmployeeHome;
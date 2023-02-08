import React, { Fragment, useEffect,useState } from 'react';
import {Button,Table} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import{createSearchParams, Link,useNavigate} from 'react-router-dom';
import Sidebar from '../Sidebar/SidebarManager';
import axios from 'axios';
import Dashboard from '../Dashboard/Dashboard';


function EmployeeHome()
{
    const [details,setDetails]=useState([]);
     const getDetails=() =>{
        axios.get('http://127.0.0.1:5000/employee')
        .then(function(response){
            setDetails(response.data);
            // eslint-disable-next-line no-console
            console.log(response);
        })
        .catch(function(error){
            // eslint-disable-next-line no-console
            console.log(error);
        });
    };
    useEffect(() => {
        getDetails();
    },[]);
    const navigate=useNavigate();
    const handleEdit = (id: any, name: string, skills: string,designation: string,project:any) =>{
        const params = {id, name, skills, designation,project};
        navigate({
            pathname: '/createemployee',
            search: `?${createSearchParams(params)}`
        });
    };
    const handleDelete=(id: any)=>{
        axios.delete(`http://127.0.0.1:5000/employee/${id}`);
        navigate(0);
    };
    return(
        <div style={{ display: 'flex' }}>
             <Sidebar />
      <div style={{ flex: 1, padding: '20px' }}>
        <Fragment>
            <div style={{margin:'5rem'}} >
            <div>
                <Link className='d-grid gap-7' to ="/createemployee">
                    <Button size="lg">+ Create New Employee</Button>
                </Link>
                </div><br />
                <Table striped bordered hover size="sm" >
                    <thead>
                        <tr>
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
                                            <td>{item.name}</td>
                                            <td>{item.skills}</td>
                                            <td>{item.designation}</td>
                                            <td>{item.project}</td>
                                            <td>
<Button onClick={() => handleEdit(item.id,item.name,item.skills,item.designation,item.project)}>Edit</Button>&nbsp;
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
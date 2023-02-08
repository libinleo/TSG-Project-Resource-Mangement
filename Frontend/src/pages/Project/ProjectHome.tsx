import React, { useState,useEffect, Fragment } from 'react';
import { useSelector } from 'react-redux';
import { createSearchParams, Link, useNavigate } from 'react-router-dom';
import { AppState } from '../../redux/store';
import axios from 'axios';
import { Button, Table } from 'react-bootstrap';
import Sidebar from '../Sidebar/SidebarAdmin';

function ProjectHome()
{
    const [details,setDetails]=useState([]);
     const getDetails=() =>{
        axios.get('http://127.0.0.1:5000/project')
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
    const handleEdit = (id: any, name: any, start_date: any,department: any,manager:any) =>{
        const params = {id, name, start_date,department,manager};
        navigate({
            pathname: '/createproject',
            search: `?${createSearchParams(params)}`
        });
    };
    const handleDelete=(id: any)=>{
        axios.delete(`http://127.0.0.1:5000/project/${id}`);
        navigate(0);
    };
    return(
        <div style={{ display: 'flex' }}>
        <Sidebar />
 <div style={{ flex: 1, padding: '20px' }}>
        <Fragment>
            <div style={{margin:'7rem'}}>
            <div>
                <Link className='d-grid gap-7' to ="/createproject">
                    <Button size="lg">+ Create New Project</Button>
                </Link>
                </div><br />
                <Table striped bordered hover size="sm" >
                    <thead>
                        <tr>
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
                                        <td>{item.name}</td>
                                         <td>{item.start_date}</td>
                                         <td>{item.department}</td>
                                         <td>{item.manager}</td>
                                         <td>
                                            <Button onClick={() =>
                handleEdit(item.id,item.name,item.start_date,item.department,item.manager)}>Edit</Button>&nbsp;
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
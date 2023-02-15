import React from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import CreateEmployee from '../../pages/Employee/CreateEmployee';
import EmployeeHome from '../../pages/Employee/EmployeeHome';
import HomeAdmin from '../../pages/Home/HomeAdmin';
import HomeManager from '../../pages/Home/HomeManager';
import Login from '../../pages/Login/Login';
import CreateProject from '../../pages/Project/CreateProject';
import ProjectHome from '../../pages/Project/ProjectHome';
import Register from '../../pages/Register/Register';
const AppRoutes = () => {
    const role = sessionStorage.getItem('roleid');
    // Return the routes for the application
    return (
        <Routes>
            <Route path='/' element={<Login/>} />
            <Route path='/register' element={<Register/>} />
            <Route path='/projecthome' element={role === '1' ? <ProjectHome /> : <Navigate to='/' />} />
            <Route path='/createproject' element={role === '1' ? <CreateProject /> : <Navigate to='/' />} />
            <Route path='/homeadmin' element={role === '1' ? <HomeAdmin /> : <Navigate to='/' />} />
            <Route path='/employeehome' element={role === '2' ? <EmployeeHome /> : <Navigate to='/' />} />
            <Route path='/createemployee' element={role === '2' ? <CreateEmployee /> : <Navigate to='/' />} />
            <Route path='/homemanager' element={role === '2' ? <HomeManager /> : <Navigate to='/' />} />
        </Routes>
    );
};

export default AppRoutes;

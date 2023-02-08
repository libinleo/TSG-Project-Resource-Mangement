import React from 'react';
import { Route, Routes} from 'react-router-dom';
import CreateEmployee from '../../pages/Employee/CreateEmployee';
import EmployeeHome from '../../pages/Employee/EmployeeHome';
import HomeAdmin from '../../pages/Home/HomeAdmin';
import HomeManager from '../../pages/Home/HomeManager';
import LoginAdmin from '../../pages/Login/LoginAdmin';
import LoginManager from '../../pages/Login/LoginManager';
import CreateProject from '../../pages/Project/CreateProject';
import ProjectHome from '../../pages/Project/ProjectHome';
import Register from '../../pages/Register/Register';
const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/loginadmin' element={<LoginAdmin/>} />
            <Route path='/' element={<LoginAdmin/>} />
            <Route path='/register' element={<Register/>} />
            {/* <Route path='/dashboard' element={<Dashboard/>}/> */}
            <Route path='/employeehome' element={<EmployeeHome/>} />
            <Route path='/projecthome' element={<ProjectHome/>} />
            <Route path='/createemployee' element={<CreateEmployee/>} />
            <Route path='/createproject' element={<CreateProject/>} />
            <Route path='/loginmanager' element={<LoginManager/>} />
            <Route path='/homeadmin' element={<HomeAdmin/>} />
            <Route path='/homemanager' element={<HomeManager/>} />
        </Routes>
    );
};

export default AppRoutes;

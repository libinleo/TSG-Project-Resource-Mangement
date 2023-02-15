import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import DatePicker from 'react-date-picker';
import 'toastr/build/toastr.min.css';
import toastr from 'toastr';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import Sidebar from '../Sidebar/SidebarAdmin';
import axios from '../../utils/interceptors';
function CreateProject() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [editMode, setEditMode] = useState(false);
    useEffect(() => {
        if (searchParams.get('id')) {
            setEditMode(true);
            setName(searchParams.get('name'));
            setStartdate(searchParams.get('start_date'));
            setDepartment(searchParams.get('department'));
        }
    }, []);
    // eslint-disable-next-line no-console
    console.log(editMode);
    const [name, setName] = useState<any | null>(null);
    const [startdate, setStartdate] = useState<Date | any | null>('');
    const [department, setDepartment] = useState<any | null>(null);
    const [manager, setManager] = useState<any | null>(null);
    const [errorMessageDate, setErrorDateMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const onDateChange = (date: any) => {
        const today = new Date();
        if (date >= today) {
            setStartdate(date);
        } else {
            setErrorDateMessage('You cant pick a past date! Please select a valid date');
        }
    };

    const createPro = (e:any) => {
        e.preventDefault();
        if (!name || !startdate || !department || !manager) {
            setErrorMessage('*Please fill all the fields');
            return;
        }
        // eslint-disable-next-line no-console
        console.log('Create Project');
        axios
            .post('http://127.0.0.1:5000/project', {
                name: name,
                start_date: startdate,
                department: department,
                manager: manager,
            })
            .then(function (response) {
              toastr.success('Project added successfully');
                // eslint-disable-next-line no-console
                console.log(response);
                setTimeout(() => {
                  window.location.href = 'http://localhost:3000/projecthome';
                }, 900);
            })
            .catch(function (error) {
                // eslint-disable-next-line no-console
                console.log(error);
            });
    };
    const editPro = (e:any) => {
      e.preventDefault();
        if (!name || !startdate || !department || !manager) {
            setErrorMessage('*Please fill all the fields');
            return;
        }
        axios.put(`http://127.0.0.1:5000/project/${searchParams.get('id')}`, {
                name: name,
                start_date: startdate,
                department: department,
                manager: manager,
            })
            .then(function (response) {
                setTimeout(() => {
                  window.location.href = 'http://localhost:3000/projecthome';
                }, 900);
                toastr.success('Project Updated Successfully');
                // eslint-disable-next-line no-console
                console.log(response);
            })
            .catch(function (error) {
                // eslint-disable-next-line no-console
                console.log(error);
            });
    };
    const [managerList, setManagerList] = useState([]);
    const getManager = () => {
        axios
            .get('http://127.0.0.1:5000/manager')
            .then(function (response) {
                setManagerList(response.data);
                // eslint-disable-next-line no-console
                console.log(response);
            })
            .catch(function (error) {
                // eslint-disable-next-line no-console
                console.log(error);
            });
    };
    useEffect(() => {
        getManager();
    }, []);
    return (
        <div style={{ display: 'flex' }}>
            <Sidebar />
            <div style={{ flex: 1, padding: '20px' }}>
            <Link to='/projecthome'><Button variant="primary">
                          Go Back
                        </Button></Link>
                <div style={{ display: 'flex', justifyContent: 'center', height: '200px', marginTop: '-50px' }}>
                    <Form className="d-grid gap-0" style={{ margin: '5rem 10rem 5rem 7rem' }}>
                        <Form.Group className="mb-3" style={{ width: '700px' }} controlId="formName">
                            <label>Project Name</label>
                            <Form.Control
                                value={name}
                                type="text"
                                required
                                onChange={(e) => setName(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <br></br>
                        <Form.Group className="mb-3" style={{ width: '700px' }} controlId="formStartdate">
                            <label>Project start-date</label>
                            <DatePicker value={startdate} onChange={(date: Date) => onDateChange(date)}
                            />
                            {errorMessageDate && <p style={{ color: 'red' }}>{errorMessageDate}</p>}
                        </Form.Group>
                        <br />
                        <Form.Group className="mb-3" style={{ width: '700px' }} controlId="formDepartment">
                            <label>Project Department</label>
                            <Form.Control
                                as="select"
                                placeholder="Select Department "
                                value={department}
                                type="text"
                                required
                                onChange={(e) => setDepartment(e.target.value)}>
                                <option value="">Select Department</option>
                                <option>TSG</option>
                                <option>Smartops</option>
                                <option>Walmart</option>
                                <option>Anthem</option>
                                <option>Equifax</option>
                            </Form.Control>
                        </Form.Group>
                        <br />
                        <Form.Group className="mb-3" style={{ width: '700px' }} controlId="formManager">
                            <label>Select Manager</label>
                            <Form.Control
                                as="select"
                                placeholder="Select a manager"
                                value={manager}
                                required
                                onChange={(e) => setManager(e.target.value)}
                            >
                                <option value="">Select a manager</option>
                                {managerList.map((manager: any) => (
                                    <option key={manager.id} value={manager.id}>
                                        {manager.fullname}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <br />
                        <Button
                            onClick={(e) => (editMode ? editPro(e) : createPro(e))}
                            type="submit"
                            style={{ width: '700px' }}>
                            Submit
                        </Button>
                        <div style={{ color: 'red' }}>{errorMessage}</div>

                    </Form>
                </div>
            </div>{' '}
        </div>
    );
}
export default CreateProject;

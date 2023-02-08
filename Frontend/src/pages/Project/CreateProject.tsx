import React,{useState, useEffect} from 'react';
import{Button,Form} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import DatePicker from 'react-date-picker';
// import {DatePicker} from 'react-date-picker';
import{useNavigate, useSearchParams,Link} from 'react-router-dom';
import Sidebar from '../Sidebar/SidebarAdmin';
import axios from 'axios';
function CreateProject(){
    const navigate =useNavigate();
    const [searchParams] = useSearchParams();
    const [editMode, setEditMode] = useState(false);
    useEffect(() => {
        if (searchParams.get('id')) {
            setEditMode(true);
            setName(searchParams.get('name'));
            setStartdate(searchParams.get('start_date'));
            setDepartment(searchParams.get('department')) ;
        }
    }, []);
// eslint-disable-next-line no-console
console.log(editMode);
const[name, setName] = useState<any | null>(null);
const [startdate, setStartdate] = useState<Date|any | null>(null);
const[department,setDepartment]= useState<any | null>(null);
const[manager,setManager]= useState<any | null>(null);
// const [startdate, setStartdate] = useState<Date | null>(null);


const createPro=() =>{
    axios.post('http://127.0.0.1:5000/project',{
      name:name,
      start_date:startdate,
      department:department,
      manager:manager,
    }).then(function(response){
        navigate('/projecthome');
      // eslint-disable-next-line no-console
      console.log(response);
    })
    .catch(function(error){
    // eslint-disable-next-line no-console
    console.log(error);
  });
  };
  const editPro=() =>{
    axios.put(`http://127.0.0.1:5000/project/${searchParams.get('id')}`,{
        name:name,
        start_date:startdate,
        department:department,
        manager:manager,
    }).then(function(response){
        navigate('/projecthome');
      // eslint-disable-next-line no-console
      console.log(response);
    })
    .catch(function(error){
    // eslint-disable-next-line no-console
    console.log(error);
  });
  };
  const[managerList, setManagerList] = useState([]);
  const getManager=() =>{
     axios.get('http://127.0.0.1:5000/manager')
     .then(function(response){
        setManagerList(response.data);
         // eslint-disable-next-line no-console
         console.log(response);
     })
     .catch(function(error){
         // eslint-disable-next-line no-console
         console.log(error);
     });
 };
 useEffect(() => {
    getManager();
 },[]);
    return(
      <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ flex: 1, padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'center',height:'200px',marginTop:'-50px' }}>
                 <Form className="d-grid gap-0"  style={{margin:'5rem 10rem 5rem 7rem'}}>
  <Form.Group className="mb-3"  style={{width: '700px'}} controlId="formName"><label>Project Name</label>
                    <Form.Control value={name} type="text"  required onChange={(e) => setName(e.target.value)}>
                    </Form.Control>
                </Form.Group><br></br>
                <Form.Group className="mb-3" style={{width: '700px'}} controlId="formStartdate">
  <label>Project start-date</label>
  <DatePicker value={startdate} onChange={(date: Date) => setStartdate(date)} />
</Form.Group><br/>
                <Form.Group className="mb-3" style={{width: '700px'}} controlId="formDepartment">
                  <label>Project Department</label>
    <Form.Control as ="select" value={department} type="text" required onChange={(e) => setDepartment(e.target.value)}>
    <option value="" disabled>Select Department</option>
    {/* Add options for the dropdown menu */}
    <option>TSG</option>
    <option>Smartops</option>
    <option>Wallmart</option>
    <option>Anthem</option>
    <option>Equifax</option>
                    </Form.Control>
                </Form.Group><br/>
                <Form.Group className="mb-3" style={{width: '700px'}} controlId="formManager">
  <label>Select Manager</label>
  <Form.Control as="select" value={manager} required onChange={(e) => setManager(e.target.value)}>
    {/* <option value="" disabled>Select a manager</option> */}
    {managerList.map((manager:any )=> (
      <option key={manager.id} value={manager.id}>
        {manager.fullname}
      </option>
    ))
}
  </Form.Control>
</Form.Group><br/>
                <br/><Link to='/projecthome'>
<Button onClick={() => editMode ? editPro() : createPro()} type="submit" style={{width: '700px'}}>Submit</Button></Link>
            </Form>
        </div>
        </div> </div>
    );

}
export default CreateProject;
import React,{useState, useEffect} from 'react';
import{Button,Form} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import{ useSearchParams,Link} from 'react-router-dom';
import Sidebar from '../Sidebar/SidebarManager';
import 'toastr/build/toastr.min.css';
import toastr from 'toastr';
import axios from '../../utils/interceptors';
function CreateEmployee(){
    const [searchParams] = useSearchParams();
    const [editMode, setEditMode] = useState(false);
    useEffect(() => {
        if (searchParams.get('id')) {
            setEditMode(true);
            setName(searchParams.get('name'));
            setSkills(searchParams.get('skills'));
            setDesignation(searchParams.get('designation'));
            setProject(searchParams.get('project'));
        }
    }, []);
const[name,setName]= useState <any | null>(null);
const[skills,setSkills]= useState < any | null>(null);
const[designation,setDesignation]= useState < any | null>(null);
const[project,setProject]= useState < any | null>(null);
const [errorMessage, setErrorMessage] = useState('');

const create=(e:any) =>{
e.preventDefault();
  if (!name || !skills || !designation || !project) {
    setErrorMessage('*Please fill all the fields');
    return;
  }
  else{
    axios.post('http://127.0.0.1:5000/employee',{
      name:name,
      skills:skills,
      designation:designation,
      project:project

    }).then(function(response){
setTimeout(() => {
  window.location.href = 'http://localhost:3000/employeehome';
}, 900);
      toastr.success('Employee Added Successfully');
    })
.catch(function(error){
    // eslint-disable-next-line no-console
    console.log(error);
  });
  }
};
  const edit=(e:any) =>{
    e.preventDefault();
    if (!name || !skills || !designation || !project) {
      setErrorMessage('*Please fill all the fields');
      return;
    }
    else{
    axios.put(`http://127.0.0.1:5000/employee/${searchParams.get('id')}`,{
      name:name,
      skills:skills,
      designation:designation,
      project:project
    }).then(function(response){
      setTimeout(() => {
        window.location.href = 'http://localhost:3000/employeehome';
      }, 900);
        toastr.success('Employee Updated Successfully');
      // eslint-disable-next-line no-console
      console.log(response);
    })
    .catch(function(error){
    // eslint-disable-next-line no-console
    console.log(error);
  });
  }
};
const[projectList, setProjectList] = useState([]);
const getProjectName=() =>{
   axios.get('http://127.0.0.1:5000/projectname')
   .then(function(response){
    setProjectList(response.data);
   })
   .catch(function(error){
       // eslint-disable-next-line no-console
       console.log(error);
   });
};
useEffect(() => {
  getProjectName();
},[]);
    return(
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ flex: 1, padding: '20px' }}>
      <Link to='/projecthome'><Button variant="primary">
                          Go Back
                        </Button></Link>
        <div style={{ display: 'flex', justifyContent: 'center' ,height:'200px',marginTop:'-50px'}}>
<Form className="d-grid gap-0" style={{margin:'5rem 10rem 5rem 7rem'}}>
           <Form.Group className="mb-3" style={{width: '700px'}} controlId="formName"><label>Employee Name</label>
                    <Form.Control value={name} type="text"  required onChange={(e) => setName(e.target.value)}>
                    </Form.Control>
                </Form.Group><br></br>
     <Form.Group className="mb-3"  style={{width: '700px'}} controlId="formSkills"><label>Employee Skills</label>
            <Form.Control as="select" placeholder='Select a manager'
            value={skills} type="text"  required onChange={(e) => setSkills(e.target.value)}>
                      <option value="">Select a Skill</option>
    <option>Java</option>
    <option>Python</option>
    <option>NodeJS</option>
    <option>.NET</option>
                    </Form.Control>
                </Form.Group><br/>
  <Form.Group className="mb-3" style={{width: '700px'}} controlId="formDesignation">
    <label>Employee Designation</label>
  <Form.Control as ="select" placeholder='Select Employee Designation'
  value={designation} type="text"  required onChange={(e) => setDesignation(e.target.value)}>
  <option value=" ">Select Employee Designation</option>
    <option>Dev1</option>
    <option>Dev2</option>
                    </Form.Control>
                </Form.Group><br/>
                <Form.Group className="mb-3" style={{width: '700px'}} controlId="formProject">
                  <label>Assign Project</label>
                  <Form.Control as="select" placeholder='Select a project'
                  value={project} required onChange={(e) => setProject(e.target.value)}>
    <option value=" "disabled>Select a project</option>
    {projectList.map((project:any )=> (
      <option key={project.id} value={project.id}>
        {project.name}
      </option>
    ))
}
</Form.Control>
</Form.Group><br/>
    <Button onClick={(e) => editMode ? edit(e) : create(e)} type="submit" style={{width: '700px'}}>Submit</Button>
    <div style={{ color: 'red' }}>{errorMessage}</div>
            </Form>
            </div> </div>
        </div>
    );
}
export default CreateEmployee;
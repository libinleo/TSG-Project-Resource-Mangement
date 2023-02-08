import React,{useState, useEffect} from 'react';
import{Button,Form} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import{useNavigate, useSearchParams,Link} from 'react-router-dom';
import Sidebar from '../Sidebar/SidebarManager';
import axios from 'axios';
function CreateEmployee(){
    const navigate =useNavigate();
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
     // eslint-disable-next-line no-console
     console.log(editMode);
const[name,setName]= useState <any | null>(null);
const[skills,setSkills]= useState < any | null>(null);
const[designation,setDesignation]= useState < any | null>(null);
const[project,setProject]= useState < any | null>(null);
const create=() =>{
    axios.post('http://127.0.0.1:5000/employee',{
      name:name,
      skills:skills,
      designation:designation,
      project:project

    }).then(function(response){
        navigate('/employeehome');
      // eslint-disable-next-line no-console
      console.log(response);
    })
    .catch(function(error){
    // eslint-disable-next-line no-console
    console.log(error);
  });
  };
  const edit=() =>{
    axios.put(`http://127.0.0.1:5000/employee/${searchParams.get('id')}`,{
      name:name,
      skills:skills,
      designation:designation,
      project:project
    }).then(function(response){
        navigate('/employeehome');
      // eslint-disable-next-line no-console
      console.log(response);
    })
    .catch(function(error){
    // eslint-disable-next-line no-console
    console.log(error);
  });
  };
// let history=useNavigate();

//     history('/emphome')
// }
const[projectList, setProjectList] = useState([]);
const getProjectName=() =>{
   axios.get('http://127.0.0.1:5000/projectname')
   .then(function(response){
    setProjectList(response.data);
       // eslint-disable-next-line no-console
       console.log(response);
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
        <div style={{ display: 'flex', justifyContent: 'center' ,height:'200px',marginTop:'-50px'}}>
<Form className="d-grid gap-0" style={{margin:'5rem 10rem 5rem 7rem'}}>
           <Form.Group className="mb-3" style={{width: '700px'}} controlId="formName"><label>Employee Name</label>
                    <Form.Control value={name} type="text"  required onChange={(e) => setName(e.target.value)}>
                    </Form.Control>
                </Form.Group><br></br>
     <Form.Group className="mb-3"  style={{width: '700px'}} controlId="formSkills"><label>Employee Skills</label>
            <Form.Control as="select" value={skills} type="text"  required onChange={(e) => setSkills(e.target.value)}>
                      <option value="" disabled>Select a manager</option>
    {/* Add options for the dropdown menu */}
    <option>Java</option>
    <option>Python</option>
    <option>NodeJS</option>
    <option>.NET</option>
                    </Form.Control>
                </Form.Group><br/>
  <Form.Group className="mb-3" style={{width: '700px'}} controlId="formDesignation">
    <label>Employee Designation</label>
  <Form.Control as ="select" value={designation} type="text"  required onChange={(e) => setDesignation(e.target.value)}>
  <option value="" disabled>Select Employee Designation</option>
    {/* Add options for the dropdown menu */}
    <option>Dev1</option>
    <option selected>Dev2</option>
                    </Form.Control>
                </Form.Group><br/>
                <Form.Group className="mb-3" style={{width: '700px'}} controlId="formProject">
                  <label>Assign Project</label>
                  <Form.Control as="select" value={project} required onChange={(e) => setProject(e.target.value)}>
    <option value="" disabled>Select a project</option>
    {projectList.map((project:any )=> (
      <option key={project.id} value={project.id}>
        {project.name}
      </option>
    ))
}
  </Form.Control>
                </Form.Group><br/>
                <br/><Link to='/employeehome'>
    <Button onClick={() => editMode ? edit() : create()} type="submit" style={{width: '700px'}}>Submit</Button></Link>
            </Form>
            </div> </div>
        </div>
    );
}
export default CreateEmployee;
import React, {  useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { AppState } from '../../redux/store';
import './Register.css';
import axios from 'axios';

const Register = () => {
    const navigate =useNavigate();
const[fullname,setFullname]=useState('');
const[username,setUsername]=useState('');
const[password,setPassword]=useState('');
const [error, setError] = useState<{fullname?:string;username?: string;password?: string;}>({});
const validate = () => {
  const newError: {fullname?:string; username?: string; password?: string } = {};
  if (!fullname) {
    newError.fullname = '* Fullname is required';
  }
  if (!username) {
  newError.username = '* Username is required';
}
  else if (!/\S+@\S+.\S+/.test(username)) {
newError.username = '* Username is not a valid email address';
}
if (!password) {
newError.password = '* Password is required';
}
setError(newError);
return Object.keys(newError).length === 0;
};

const handleClick = (e: any) => {
e.preventDefault();
if (validate()) {
axios.post('http://127.0.0.1:5000/register', {
      fullname:fullname,
      username: username,
      password: password,
})
.then(function (response) {
navigate('/employeehome');
})
.catch(function (error) {
// eslint-disable-next-line no-console
console.log(error);
});
}
};
    return (
        <>
            <div className='page'>
      <div className='cover'>
        <h3> Sign Up</h3>
        <input
            type="text"
            placeholder="Fullname"
          required onChange={(e) => setFullname(e.target.value)}
          style={error.fullname ? { border: '1px solid red' } : {}}/>
                {error.fullname && <div style={{ color: 'red' }}>{error.fullname}</div>}<br/>
          <input
            type="text"
            placeholder=" Username"
          required onChange={(e) => setUsername(e.target.value)}
          style={error.username ? { border: '1px solid red' } : {}}/>
                {error.username && <div style={{ color: 'red' }}>{error.username}</div>}<br/><br/>
          <input
            type="password"
            className="text"
            placeholder="Password"
          required onChange={(e) => setPassword(e.target.value)}
          style={error.password ? { border: '1px solid red' } : {}}/>
                {error.password && <div style={{ color: 'red' }}>{error.password}</div>}<br/>
          <div className="login-btn" onClick={(e) => handleClick(e)}>
            Submit
          </div>
        <p className="forgot-password text-right" >
          Already Registered?<a href="/loginmanager" >Login as Manager!</a>
        </p>
      </div></div>

        </>
    );
};
export default Register;

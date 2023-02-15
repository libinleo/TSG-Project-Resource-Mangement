import React, {  useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import 'toastr/build/toastr.min.css';
import toastr from 'toastr';
import './Register.css';
import axios from 'axios';

const Register = () => {
    const navigate =useNavigate();
const[fullname,setFullname]=useState('');
const[username,setUsername]=useState('');
const[password,setPassword]=useState('');
const [error, setError] = useState<{fullname?:string;username?: string;password?: string;}>({});
const [showPassword, setShowPassword] = useState(false);
const validate = () => {
  const newError: {fullname?:string; username?: string; password?: string } = {};
  if (!fullname) {
    newError.fullname = '* Fullname is required';
  }
  else if (!fullname || fullname.length < 3) {
    newError.fullname = '* fullname must have atleat 3 characters ';
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
else if (!password || password.length < 8) {
  newError.password = '* Password must be at least 8 characters long';
} else if (!/^(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/.test(password)) {
  newError.password = '* Password must contain at least one capital letter and one special character (!@#$%^&*)';
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
navigate('/');
toastr.success('Registration Successful!Please Login');
})
.catch(function (error) {
// eslint-disable-next-line no-console
console.log(error);
});
}
};
    return (
        <>
            <div className='page' style={{backgroundImage:
 'url(\'https://media.planview.com/clarizen/wp-content/upload/2021/03/project-resource-management-blog.png\')'}}>
      <div className='cover'>
      <h3 className='heading-font'>PROJECT RESOURCE MANAGEMENT</h3><br />
        <h3 className='font'> Sign Up</h3>
        <input
            type="text"
            placeholder="Fullname"
          required onChange={(e) => setFullname(e.target.value)}
          style={error.fullname ? { border: '1px solid red'} : {}}/>
        {error.fullname && <div style={{ color: 'red',fontSize:'14px'}}>{error.fullname}</div>}<br/>
          <input
            type="text"
            placeholder=" Username"
          required onChange={(e) => setUsername(e.target.value)}
          style={error.username ? { border: '1px solid red',marginTop:'-21px' } : {}}/>
     {error.username && <div style={{ color: 'red',fontSize:'14px' }}>
      {error.username}</div>}<br/><br/>
          <input
            type={showPassword ? 'text' : 'password'}
            className="text"
            placeholder="Password"
          required onChange={(e) => setPassword(e.target.value)}
          style={error.password ? { border: '1px solid red' ,marginTop:'-30px' } : {}}/>
{error.password &&
 <div style={{ color: 'red',fontSize:'14px',paddingLeft:'30px',marginTop:'-17px' }}>{error.password}</div>}
      <div className='forgot-password'>
<span className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
  {showPassword ? <FaEyeSlash /> : <FaEye />}
</span></div>
<div className='forgot-password'>
<label  htmlFor="password" className="password-toggle-label" onClick={() => setShowPassword(!showPassword)}>
  {showPassword ? 'Hide Password' : 'Show Password'}
</label></div><br />

          <div className="login-btn" onClick={(e) => handleClick(e)}>
            Submit
          </div>
        <p className="forgot-password" >
          <a href="/" >Login from here!</a>
        </p>
      </div></div>

        </>
    );
};
export default Register;
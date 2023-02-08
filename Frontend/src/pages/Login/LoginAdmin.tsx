import React, {  useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { AppState } from '../../redux/store';
// import './Login.css';
import axios from 'axios';
import loginUser from'./LoginService';

const LoginAdmin = () => {
const navigate =useNavigate();
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');
const [error, setError] = useState<{username?: string;password?: string;}>({});
const [alertMessage, setAlertMessage] = useState('');

const validate = () => {
  const newError: { username?: string; password?: string } = {};
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
axios.post('http://127.0.0.1:5000/loginadmin', {
      username: username,
      password: password,
})
.then(function (response) {
  sessionStorage.setItem('token', response.data.token);

navigate('/homeadmin');
})
.catch(function (error) {
  setAlertMessage('* Username or password is incorrect');
// eslint-disable-next-line no-console
console.log(error);
});
}
};

return (
<>
<div className="page">
<div className="cover">
<h3>Admin Log In</h3>
<input
type="text"
placeholder="Username"
required
onChange={(e) => setUsername(e.target.value)}
style={error.username ? { border: '1px solid red' } : {}}/>
{error.username &&
  <div style={{ color: 'red' }}>{error.username}</div>}<br /><br />

<input
type="password"
className="text"
placeholder="Password"
required
onChange={(e) => setPassword(e.target.value)}
style={error.password ? { border: '1px solid red' } : {}}/>
{error.password && <div style={{ color: 'red' }}>{error.password}</div>}<br />
<div className="login-btn" onClick={(e) => handleClick(e)}>
Login
</div>
{alertMessage && <div style={{ color: 'red' }}>{alertMessage}</div>}
                <p className="forgot-password text-right" >
                   Not Admin?<a href="/loginmanager" >Login as Manager</a>
                </p>
                <p className="forgot-password text-right" >
                   Need a Manager account?<a href="/register" >Register here!</a>
                </p>
            </div>
            </div>

        </>
    );
};
export default LoginAdmin;

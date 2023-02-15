import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import 'toastr/build/toastr.min.css';
import toastr from 'toastr';
import axios from 'axios';
import loginUser from './LoginService';

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<{ username?: string; password?: string }>({});
    const [alertMessage, setAlertMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const validate = () => {
        const newError: { username?: string; password?: string } = {};
        if (!username) {
            newError.username = '* Username is required';
        } else if (!/\S+@\S+.\S+/.test(username)) {
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
            axios
                .post('http://127.0.0.1:5000/login', {
                    username: username,
                    password: password,
                })
                .then(function (response) {
                    // eslint-disable-next-line no-console
                    console.log(response.data);
                    // eslint-disable-next-line no-console
                    console.log(response.data.access_token);
                    if (response.data.message === 'Login Successful') {
                       const accessToken = sessionStorage.setItem('access_token', response.data.access_token);
                      sessionStorage.setItem('roleid', response.data.roleid);
                      sessionStorage.setItem('username', response.data.username);
                        // eslint-disable-next-line no-console
                        sessionStorage.getItem('access_token');
                        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

                        // eslint-disable-next-line no-console
                    }
                    else {
                        toastr.error('Username and password do not match');
                    }
                    if (response.data.roleid === 1) {
                        toastr.success('Login Successful!Redirecting to Admin Dashboard');
                        setTimeout(() => {
                            window.location.href = 'http://localhost:3000/homeadmin';
                          }, 1100);
                    } else if (response.data.roleid === 2) {
                        toastr.success('Login Successful!Redirecting to Manager Dashboard');
                        setTimeout(() => {
                            window.location.href = 'http://localhost:3000/homemanager';
                          }, 1100);
                    }
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
            <div className="page" style={{backgroundImage:
 'url(\'https://media.planview.com/clarizen/wp-content/upload/2021/03/project-resource-management-blog.png\')'}} >
                <div className="cover" >
                      <h3 className='heading-font'>PROJECT RESOURCE MANAGEMENT</h3> <br />
                    <h3 className='font'>Log In</h3>
                    <br />
                    <input
                        type="text"
                        placeholder="Username"
                        required
                        onChange={(e) => setUsername(e.target.value)}
                        style={error.username ? { border: '1px solid red' } : {}}
                    />
                    {error.username && <div style={{ color: 'red',fontSize:'14px'  }}>{error.username}</div>}
                    <br />
                    <br />
<input
  type={showPassword ? 'text' : 'password'}
  className="text"
  placeholder="Password"
  required
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  style={error.password ? { border: '1px solid red' } : {}}
/>
{error.password && <div style={{ color: 'red',fontSize:'14px'  }}>{error.password}</div>}
<div className='forgot-password'>
<span className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
  {showPassword ? <FaEyeSlash /> : <FaEye />}
</span></div>
<div className='forgot-password'>
<label  htmlFor="password" className="password-toggle-label" onClick={() => setShowPassword(!showPassword)}>
  {showPassword ? 'Hide Password' : 'Show Password'}
</label></div>

                    <br />
                    <div className="login-btn" onClick={(e) => handleClick(e)}>
                        LOGIN
                    </div>
                    {alertMessage && <div style={{ color: 'red' }}>{alertMessage}</div>}
                    <p className="forgot-password">
                        Need a Manager account?<a href="/register">Register here!</a>
                    </p>
                </div>
            </div>
        </>
    );
};
export default Login;
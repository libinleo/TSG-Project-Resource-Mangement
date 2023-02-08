
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
const loginUser = async (username: string, password: string) => {
      try {
            const response = await axios.post('http://localhost:5000/login', {
                  username: username,
                  password: password,
                });
                const data = response.data;
                 if (!data.data.accessToken) {
                      alert('wrong credentials....Try again');
                } else {
                      sessionStorage.setItem('token', data.data.accessToken);
                  sessionStorage.setItem('username', data.data.username);
                 }
             }
             catch (error)
             {
                 // eslint-disable-next-line no-console
                   console.error(error);
             }};
            export default loginUser;
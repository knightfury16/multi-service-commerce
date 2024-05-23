// Login.js
import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';
import { BaseUrl } from '../Constants';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Perform API call to submit login data
      const response = await axios.post(`${BaseUrl}/api/user/login`, { email, password });

      console.log("LOGIN RESPONSE:", response);

      // Assuming the token is returned in the response data
      const token = response.data.token;

      // Set the token in a cookie for managing the user session
      Cookies.set('token', token, { expires: 7 }); // Expires in 7 days

      // Redirect to another page after successful login
      history.push('/products');
    } catch (error) {
      // Handle login error
      console.error('Login failed:', error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;

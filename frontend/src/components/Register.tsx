// Register.js
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { BaseUrl } from '../Constants';
import axios from 'axios';
import Cookies from 'js-cookie';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Perform API call to submit login data
      const response = await axios.post(`${BaseUrl}/api/user/register`, {name, email, password });

      console.log("Register RESPONSE:", response);

      // Assuming the token is returned in the response data
      const token = response.data.token;

      // Set the token in a cookie for managing the user session
      Cookies.set('token', token, { expires: 7 }); // Expires in 7 days

      // Redirect to another page after successful login
      history.push('/products');
    } catch (error) {
      // Handle login error
      console.error('Registration failed:', error);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;

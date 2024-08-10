import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import '../styles/Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false); // State for loading indicator
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL;

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Set loading state to true before making request

    try {
      const response = await axios.post(`${apiUrl}/api/auth/login`, { username, password });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      setMessage('Login successful!');
      navigate('/');
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setMessage(error.response.data.error);
      } else {
        setMessage('An error occurred. Please try again later.');
      }
    } finally {
      setIsLoading(false); // Set loading state to false after request completes
    }
  };

  return (
    <div className='hh'>
      <div className="container mt-5 mb-5 border border-1 border-light p-5 rounded-5">
        <h2 className="mb-4 text-warning">Login</h2>
        <form onSubmit={handleLogin} className='text-white'>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary" disabled={isLoading}>
            {isLoading ? (
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            ) : (
              'Login'
            )}
          </button>
          <button className="btn btn-link" onClick={() => navigate('/register')}>Register</button>
        </form>
        {message && <p className="mt-3 text-danger">{message}</p>}
      </div>
    </div>
  );
};

export default Login;

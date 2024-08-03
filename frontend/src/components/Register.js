import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); // Default role set to 'user'
  const [message, setMessage] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);   
  const apiUrl = process.env.REACT_APP_API_URL;

  const handleShowPassword   
 = () => {
    setShowPassword(!showPassword); // Toggle showPassword state
  };
  const handleUsernameChange = (e) => {
    const value = e.target.value;
    setUsername(value);
  
    if (value.match(/[^a-zA-Z0-9]/)) {
      setUsernameError('Username can only contain letters and numbers');
    } else if (value.length < 3) {
      setUsernameError('Username must be at least 3 characters long');
    } else if (value.length > 20) {
      setUsernameError('Username must be less than 20 characters long');
    } else {
      setUsernameError('');
    }
  };
  
  

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
  
    const hasNumber = /\d/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasUpperCase = /[A-Z]/.test(value);
    const hasSpecialChar = /[!@#$%^&*()_+]/g.test(value); // Adjust special characters as needed
  
    let errorMessage = '';
  
    if (value.length < 8) {
      errorMessage = 'Password must be at least 8 characters long';
    } else if (!hasNumber) {
      errorMessage = 'Password must contain at least one number';
    } else if (!hasLowerCase) {
      errorMessage = 'Password must contain at least one lowercase letter';
    } else if (!hasUpperCase) {
      errorMessage = 'Password must contain at least one uppercase letter';
    } else if (!hasSpecialChar) {
      errorMessage = 'Password must contain at least one special character';
    }
  
    setPasswordError(errorMessage);
  };
  

  const handleRegister = async (e) => {
    e.preventDefault();

    // if (usernameError || passwordError) {
    //   setMessage('Please fix the errors before submitting');
    //   return;
    // }

    try {
      const response = await axios.post(`${apiUrl}/api/auth/register`, {
        username,
        password, // **Consider hashing password on frontend for improved security**
        role,
      });
      setMessage(response.data.message); // Update message based on server response
      navigate('/login'); // Redirect to login page on success
    } catch (error) {
      // Handle potential errors:
      if (error.response && error.response.data) {
        setMessage(error.response.data.error); // Display specific error message
      } else {
        setMessage('Registration failed. Please try again.'); // Generic error message
      }
    }
  };

  return (
    <div className="container mt-5 border border-1 border-light p-5 rounded-5">
      <h2 className="mb-4 text-warning">Register</h2>
      <form onSubmit={handleRegister}>
        <div className="mb-3 text-light">
          <label htmlFor="username" className="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={username}
            onChange={handleUsernameChange}
            required
          />
          {usernameError && <p className="text-danger">{usernameError}</p>}
        </div>
        <div className="mb-3 text-light">
  <label htmlFor="password" className="form-label">Password</label>
  <input
    type={showPassword ? "text" : "password"} // Change input type based on showPassword state
    className="form-control"
    id="password"
    value={password}
    onChange={handlePasswordChange}
    required
  />
  {passwordError && <p className="text-danger">{passwordError}</p>}
  <div className="form-check">
    <input
      type="checkbox"
      className="form-check-input"
      id="showPassword"
      checked={showPassword} // Set checkbox checked based on showPassword state
      onChange={handleShowPassword}
    />
    <label htmlFor="showPassword" className="form-check-label">
      Show Password
    </label>
  </div>
</div>

        <div className="mb-3 text-light">
          <label htmlFor="role" className="form-label">Role</label>
          <select
            id="role"
            className="form-control"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Register</button>
        <button className="btn btn-link" onClick={() => navigate('/login')}>
          Login
        </button>
      </form>
      {message && <p className="mt-3 text-danger">{message}</p>}
    </div>
  );
};

export default Register;
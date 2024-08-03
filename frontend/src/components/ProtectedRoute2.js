import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute2 = ({ children }) => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  if (!token || !user || user.role !== 'admin') {
    alert("Only Admins can acess...")
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute2;

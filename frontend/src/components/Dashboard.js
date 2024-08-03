import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="container mt-5 hh">
      <div className="row">
        <div className="col text-center">
          <h1 className="display-4 text-warning">Administrator Dashboard</h1>
          <p className="text-white">Welcome to the admin dashboard. Here you can manage users and cars.</p>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-md-6 mb-3">
          <div className="card bg-dark text-white">
            <div className="card-body">
              <h5 className="card-title text-warning">Manage Users</h5>
              <p className="card-text">View, edit, or remove users from the system.</p>
              <Link to="/manage-users" className="btn btn-primary">Go to Users</Link>
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-3">
          <div className="card bg-dark text-white">
            <div className="card-body">
              <h5 className="card-title text-warning">Manage Cars</h5>
              <p className="card-text">Add, edit, or remove cars from the system.</p>
              <Link to="/manage-cars" className="btn btn-primary">Go to Cars</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

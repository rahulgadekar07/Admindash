import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import CarList from "./components/CarList";
import ProtectedRoute from "./components/ProtectedRoute";
import Header from "./components/Header";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "./components/Footer";
import ManageCars from "./components/ManageCars";
import ManageUsers from "./components/ManageUsers";
import ProtectedRoute2 from "./components/ProtectedRoute2";

const App = () => {
  return (
    <div className="upmostdiv">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/manage-users"
            element={
              <ProtectedRoute2>
              <ManageUsers/>
              </ProtectedRoute2>
            }
          />
          <Route
            path="/manage-cars"
            element={
              <ProtectedRoute2>
                <ManageCars/>
              </ProtectedRoute2>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute2>
                <Dashboard />
              </ProtectedRoute2>
            }
          />
          <Route
            path="/cars"
            element={
              <ProtectedRoute>
                <CarList />
              </ProtectedRoute>
            }
          />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
};

export default App;

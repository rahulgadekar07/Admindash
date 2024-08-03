import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Header.css";

const Header = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");

    // Check if the current path is '/'
    if (window.location.pathname === "/") {
      window.location.reload();
    }
    navigate("/");
  };
  return (
    <header className="header">
      <nav className="navbar navbar-expand-lg ">
        <div className="container-fluid">
          {/* <Link className="navbar-brand" to="/">Admin Dashboard</Link> */}
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav me-auto  ">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              {isLoggedIn && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/dashboard">
                      Dashboard
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/cars">
                      Cars
                    </Link>
                  </li>
                </>
              )}
            </ul>
            {isLoggedIn ? (
              <button
                className="btn btn-outline-danger btn-sm"
                onClick={handleLogout}
              >
                Logout
              </button>
            ) : null}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;

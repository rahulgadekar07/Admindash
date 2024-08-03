import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  const isLoggedIn = localStorage.getItem('token');

  return (
  <div className='hh'>

 
    <div className="container ">
      <h1 className=" text-center text-warning" style={{ animation: 'fadeIn 3s',fontSize:'4rem' }}>
        Assignment for Quadiro Technologies.
      </h1>

      <p className="text-center text-white mb-4 " style={{ animation: 'fadeIn 3s', fontFamily:"sans-serif",fontSize:'1.5rem'  }}>
        Discover a vast collection of vehicles at your fingertips. Manage and
        explore various car models, their specifications, and availability. This
        is your central hub for all things automotive.
      </p>

    

      <div className="d-flex justify-content-center mt-4 mb-2">
        {isLoggedIn ? (
          <Link to="/cars" className="btn btn-success btn-lg mx-2">
            View Cars
          </Link>
        ) : (
          <>
            <Link to="/login" className="btn btn-success btn-lg mx-2">
              Login
            </Link>
            <Link to="/register" className="btn btn-primary btn-lg mx-2">
              Register
            </Link>
          </>
        )}
      </div>
      <div className="car-image-container">
        <img
          src="./pngwing.png"
          alt="Car Image"
          className="car-image"
          style={{ animation: 'fadeIn 3s' }}
        />
      </div>
    </div>
    </div>
  );
};

export default Home;

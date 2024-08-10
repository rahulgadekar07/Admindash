import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/CarList.css";

const CarList = () => {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [minYear, setMinYear] = useState("");
  const [maxYear, setMaxYear] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [isLoading, setIsLoading] = useState(true); // State for loading indicator
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchCars = async () => {
      setIsLoading(true); // Set loading to true before making request
      const response = await axios.get(`${apiUrl}/api/cars/getCars`);
      setCars(response.data);
      setFilteredCars(response.data);
      setIsLoading(false); // Set loading to false after receiving data
    };
    fetchCars();
  }, []);

  useEffect(() => {
    const filteredData = cars.filter((car) => {
      const nameMatch = car.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const yearMatch =
        (minYear ? car.manufacturingYear >= minYear : true) &&
        (maxYear ? car.manufacturingYear <= maxYear : true);
      const priceMatch =
        (minPrice ? car.price >= minPrice : true) &&
        (maxPrice ? car.price <= maxPrice : true);
      return nameMatch && yearMatch && priceMatch;
    });
    setFilteredCars(filteredData);
  }, [cars, searchQuery, minYear, maxYear, minPrice, maxPrice]);

  return (
    <div className="hh">
      <div className="container ">
        <h2 className="mb-4 text-warning">Car List</h2>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search cars"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="text-white">
            Min Year:{" "}
            <input
              type="number"
              value={minYear}
              onChange={(e) => setMinYear(e.target.value)}
            />
            Max Year:{" "}
            <input
              type="number"
              value={maxYear}
              onChange={(e) => setMaxYear(e.target.value)}
            />
          </div>
          <div className="text-white">
            Min Price:{" "}
            <input
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
            Max Price:{" "}
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>
        </div>
        {isLoading ? (
          <div className="text-center mt-5">
            <span className="spinner-border spinner-border-lg" role="status" aria-hidden="true"></span>
          </div>
        ) : (
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Manufacturing Year</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {filteredCars.map((car) => (
                <tr key={car._id}>
                  <td>{car.name}</td>
                  <td>{car.manufacturingYear}</td>
                  <td>{car.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default CarList;

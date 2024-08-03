import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useNavigate} from 'react-router-dom';
import '../styles/ManageCars.css';
const ManageCars = () => {
  const [cars, setCars] = useState([]);
  const [sortField, setSortField] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const apiUrl = process.env.REACT_APP_API_URL;

  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentCar, setCurrentCar] = useState(null);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    manufacturingYear: '',
    price: '',
  });

  useEffect(() => {
    fetchCars();
  }, [sortField]);
  const handleSort = (field) => {
    const sortedCars = [...cars].sort((a, b) => {
      if (a[field] < b[field]) {
        return sortOrder === 'asc' ? -1 : 1;
      }
      if (a[field] > b[field]) {
        return sortOrder === 'asc' ? 1 : -1;
      }
      return 0;
    });
    setCars(sortedCars);
    setSortField(field);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };
  
  const fetchCars = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/cars/getCars`);
      setCars(response.data);
    } catch (error) {
      console.error('Error fetching cars:', error);
    }
  };

  const handleAddCar = async () => {
    try {
      await axios.post(`${apiUrl}/api/cars`, formData);
      fetchCars();
      setFormData({ name: '', manufacturingYear: '', price: '' });
      setShowAddModal(false);
    } catch (error) {
      console.error('Error adding car:', error);
    }
  };

  const handleEditCar = async () => {
    try {
      await axios.put(`${apiUrl}/api/cars/${currentCar._id}`, formData);
      fetchCars();
      setShowEditModal(false);
    } catch (error) {
      console.error('Error editing car:', error);
    }
  };

  const handleDeleteCar = async () => {
    try {
      await axios.delete(`${apiUrl}/api/cars/${currentCar._id}`);
      fetchCars();
      setShowDeleteModal(false);
    } catch (error) {
      console.error('Error deleting car:', error);
    }
  };

  const openEditModal = (car) => {
    setCurrentCar(car);
    setFormData(car);
    setShowEditModal(true);
  };
const handleMangeUsers=()=>{
  navigate("/manage-users")
}
  const openDeleteModal = (car) => {
    setCurrentCar(car);
    setShowDeleteModal(true);
  };

  return (
    <div className='hh'>
    <div className="container">
      <h1 className='text-warning'>Manage Cars</h1>
      <button
          className="btn mx-2 btn-success my-1 add-car-button my-2"
          onClick={() => setShowAddModal(true)}
        >
          Add Car
        </button>
        <button className='btn mx-2 my-1 btn-warning ' onClick={handleMangeUsers}>
          Manage users
        </button>
      <div className="table-container">
        <table className="table table-striped mt-3">
        <thead>
              <tr>
                <th>
                  <button onClick={() => handleSort('name')}>
                    {sortField === 'name' ? `Sorted by Name ${sortOrder === 'asc' ? '▲' : '▼'}` : 'Name'}
                  </button>
                </th>
                <th>
                  <button onClick={() => handleSort('manufacturingYear')}>
                    {sortField === 'manufacturingYear' ? `Sorted by Manufacturing Year ${sortOrder === 'asc' ? '▲' : '▼'}` : 'Manufacturing Year'}
                  </button>
                </th>
                <th>
                  <button onClick={() => handleSort('price')}>
                    {sortField === 'price' ? `Sorted by Price ${sortOrder === 'asc' ? '▲' : '▼'}` : 'Price'}
                  </button>
                </th>
                <th>Actions</th>
              </tr>
            </thead>

          <tbody>
            {cars.map((car) => (
              <tr key={car._id}>
                <td>{car.name}</td>
                <td>{car.manufacturingYear}</td>
                <td>{car.price}</td>
                <td>
                  <button className="btn btn-primary me-2" onClick={() => openEditModal(car)}>Edit</button>
                  <button className="btn btn-danger" onClick={() => openDeleteModal(car)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      
      </div>

      {showAddModal && (
        <div className="modal show" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Car</h5>
                <button type="button" className="btn-close" onClick={() => setShowAddModal(false)}></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="carName" className="form-label">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="carName"
                      placeholder="Enter car name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="carManufacturingYear" className="form-label">Manufacturing Year</label>
                    <input
                      type="number"
                      className="form-control"
                      id="carManufacturingYear"
                      placeholder="Enter manufacturing year"
                      value={formData.manufacturingYear}
                      onChange={(e) => setFormData({ ...formData, manufacturingYear: e.target.value })}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="carPrice" className="form-label">Price</label>
                    <input
                      type="number"
                      className="form-control"
                      id="carPrice"
                      placeholder="Enter price"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowAddModal(false)}>Close</button>
                <button type="button" className="btn btn-success" onClick={handleAddCar}>Add Car</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showEditModal && (
        <div className="modal show" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Car</h5>
                <button type="button" className="btn-close" onClick={() => setShowEditModal(false)}></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="editCarName" className="form-label">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="editCarName"
                      placeholder="Enter car name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="editCarManufacturingYear" className="form-label">Manufacturing Year</label>
                    <input
                      type="number"
                      className="form-control"
                      id="editCarManufacturingYear"
                      placeholder="Enter manufacturing year"
                      value={formData.manufacturingYear}
                      onChange={(e) => setFormData({ ...formData, manufacturingYear: e.target.value })}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="editCarPrice" className="form-label">Price</label>
                    <input
                      type="number"
                      className="form-control"
                      id="editCarPrice"
                      placeholder="Enter price"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowEditModal(false)}>Close</button>
                <button type="button" className="btn btn-primary" onClick={handleEditCar}>Save Changes</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="modal show" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Delete</h5>
                <button type="button" className="btn-close" onClick={() => setShowDeleteModal(false)}></button>
              </div>
              <div className="modal-body">
                Are you sure you want to delete this car?
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>Close</button>
                <button type="button" className="btn btn-danger" onClick={handleDeleteCar}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default ManageCars;

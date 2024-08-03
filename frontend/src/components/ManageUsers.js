import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/ManageUsers.css";
import { useNavigate } from "react-router-dom";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL;

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        `${apiUrl}/api/auth/getUsers`
      );
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleDelete = async (userId) => {
    setUserIdToDelete(userId);
    setShowConfirmModal(true); // Open confirmation modal
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(
        `${apiUrl}/api/auth/deleteUser/${userIdToDelete}`
      );
      fetchUsers(); // Refresh the list after deleting a user
      setShowConfirmModal(false); // Close confirmation modal after confirmation
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const cancelDelete = () => {
    setShowConfirmModal(false); // Close confirmation modal on cancel
  };
  const handleMangeCars = () => {
    navigate("/manage-cars");
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="manage-users hh">
      <div className="d-flex justify-content-between">
        <h1 className="text-warning">Manage Users</h1>
        <div>
          {" "}
          <button className="btn  btn-warning" onClick={handleMangeCars}>
            Manage Cars
          </button>
        </div>
      </div>

      <table className="user-table">
        <thead className="text-dark">
          <tr>
            <th>Username</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="text-white">
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.role}</td>
              <td>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(user._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showConfirmModal && (
        <div className="confirm-modal">
          <h2 className="text-warning">Confirm Delete</h2>
         
          <p className="text-white">
            {" "}
            Are you sure you want to delete this user?
          </p>
          <button className="btn btn-danger mx-1" onClick={confirmDelete}>
            Delete
          </button>
          <button className="btn btn-secondary mx-1" onClick={cancelDelete}>
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;

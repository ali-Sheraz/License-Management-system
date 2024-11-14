import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiService from '../Services/apiService'; // Adjust the path as necessary
import './UpdateApplication.css'; // Import your CSS file for styling

const UpdateUsers = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    createdBy: '',
    updatedBy: '',
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [validationError, setValidationError] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await apiService.get(`/userTable/${userId}`);
        console.log(data);

        setFormData({
          username: data.username,
          email: data.email,
          password: data.password,
          createdBy: data.createdBy,
          updatedBy: data.updatedBy,
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
        setErrorMessage('Failed to fetch user data. Please try again later.');
        setTimeout(() => {
          setErrorMessage('');
        }, 1000);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.password) {
      setValidationError('User Name and Password are required fields.');
      setTimeout(() => {
        setValidationError('');
      }, 1000); // Hide the validation error after 1 second
      return;
    }

    const updatedFormData = {
      ...formData,
      createdOn: new Date().toISOString(),
      updatedOn: new Date().toISOString(),
    };
    try {
      await apiService.put(`/userTable/${userId}`, updatedFormData);
      setSuccessMessage('User updated successfully!');
      setTimeout(() => {
        setSuccessMessage('');
        navigate('/getusers'); // Redirect to home or another page after successful update
      }, 1000);
    } catch (error) {
      console.error('Error updating user:', error);
      setErrorMessage('Failed to update user. Please try again.');
      setTimeout(() => {
        setErrorMessage('');
      }, 1000);
    }
  };

  return (
    <div className="update-application-container">
      <h2 style={{ color: "#5c5c9f" }}>Update User</h2>
      <form onSubmit={handleSubmit} className="update-application-form">
        <div className="form-group">
          <label htmlFor="username">User Name:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="createdBy">Created By:</label>
          <select
            id="createdBy"
            name="createdBy"
            value={formData.createdBy}
            onChange={handleInputChange}
            className="form-control"
          >
            <option>Select an option</option>
            <option value="admin">Admin</option>
            <option value="system">System</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="updatedBy">Updated By:</label>
          <select
            id="updatedBy"
            name="updatedBy"
            value={formData.updatedBy}
            onChange={handleInputChange}
            className="form-control"
          >
            <option>Select an option</option>
            <option value="admin">Admin</option>
            <option value="system">System</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Update</button>
      </form>
      {validationError && <div className="alert alert-danger mt-3">{validationError}</div>}
      {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}
      {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}
    </div>
  );
};

export default UpdateUsers;

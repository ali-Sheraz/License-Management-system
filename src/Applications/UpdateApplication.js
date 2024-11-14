import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiService from '../Services/apiService'; // Ensure the path is correct
import './UpdateApplication.css'; // Import your CSS file for styling

const UpdateApplication = () => {
  const { appId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    appName: '',
    description: '',
    maxUsers: '',
    createdBy: '',
    updatedBy: '',
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [validationError, setValidationError] = useState('');

  useEffect(() => {
    const fetchApplicationData = async () => {
      try {
        const data = await apiService.get(`/oneapplication/${appId}`);
        setFormData({
          appName: data.appName,
          description: data.description,
          maxUsers: data.maxUsers,
          createdBy: data.createdBy,
          updatedBy: data.updatedBy,
        });
      } catch (error) {
        console.error('Error fetching application data:', error);
        setErrorMessage('Failed to fetch application data. Please try again later.');
        setTimeout(() => {
          setErrorMessage('');
        }, 1000);
      }
    };

    fetchApplicationData();
  }, [appId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.appName || !formData.maxUsers) {
      setValidationError('Application Name and Max Users are required fields.');
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
      await apiService.put(`/application/${appId}`, updatedFormData);
      setSuccessMessage('Application updated successfully!');
      setTimeout(() => {
        setSuccessMessage('');
        navigate('/registeredapplication'); // Redirect to home or another page after successful update
      }, 1000);
    } catch (error) {
      console.error('Error updating application:', error);
      setErrorMessage('Failed to update application. Please try again.');
      setTimeout(() => {
        setErrorMessage('');
      }, 1000);
    }
  };

  return (
    <div className="update-application-container">
      <h2 style={{ color: "#5c5c9f" }}>Update Application</h2>
      <form onSubmit={handleSubmit} className="update-application-form">
        <div className="form-group">
          <label htmlFor="appName">Application Name:</label>
          <input
            type="text"
            id="appName"
            name="appName"
            value={formData.appName}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="form-control"
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="maxUsers">Max Users:</label>
          <input
            type="number"
            id="maxUsers"
            name="maxUsers"
            value={formData.maxUsers}
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
            <option value="">Select an option</option>
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
            <option value="">Select an option</option>
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

export default UpdateApplication;

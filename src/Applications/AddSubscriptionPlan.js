// src/components/AddSubscriptionPlan.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../Services/apiService'; // Adjust the import path as needed
import './AddSubscriptionPlan.css';

const SUBSCRIPTION_PLANS_API_URL = '/subscriptionPlan';

export default function AddSubscriptionPlan() {
  const history = useNavigate();
  const currentDate = new Date().toISOString();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    durationMonths: '',
    subscriptionType: 'General',
    createdOn: currentDate,
    createdBy: '',
    updatedOn: currentDate,
    updatedBy: '',
  });

  const [validationErrors, setValidationErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setValidationErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = {};
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }
    if (!formData.price.trim()) {
      errors.price = 'Price is required';
    }
    if (!formData.durationMonths.trim()) {
      errors.durationMonths = 'Duration is required';
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    const dataToSend = {
      name: formData.name,
      description: formData.description,
      price: formData.price,
      durationMonths: formData.durationMonths,
      subscriptionType: formData.subscriptionType,
      createdOn: formData.createdOn,
      createdBy: formData.createdBy,
      updatedOn: formData.updatedOn,
      updatedBy: formData.updatedBy
    };

    try {
      const response = await apiService.post(SUBSCRIPTION_PLANS_API_URL, dataToSend, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log('Response:', response);
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 3000); // Hide message after 3 seconds
      // history('/');
    } catch (error) {
      console.error('Error saving data:', error);
      setErrorMessage(`Error saving data: ${error.response?.data || error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="add-subscription-plan-container">
      {errorMessage && (
        <div className="error-message-box">
          <span>&#10060;</span> {errorMessage}
        </div>
      )}
      
      <form className="subscription-form" onSubmit={handleSubmit}>
      <h2 style={{ color: "rgb(52, 71, 103)" }}>Add Subscription Plan</h2>
        <div className="form-group">
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
          {validationErrors.name && <div className="error-message">{validationErrors.name}</div>}
        </div>

        <div className="form-group">
          <label>Description:</label>
          <input type="text" name="description" value={formData.description} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Price:</label>
          <input type="number" name="price" value={formData.price} onChange={handleChange} />
          {validationErrors.price && <div className="error-message">{validationErrors.price}</div>}
        </div>

        <div className="form-group">
          <label>Duration (Months):</label>
          <input type="number" name="durationMonths" value={formData.durationMonths} onChange={handleChange} />
          {validationErrors.durationMonths && <div className="error-message">{validationErrors.durationMonths}</div>}
        </div>

        <div className="form-group">
          <label>Subscription Type:</label>
          <select name="subscriptionType" value={formData.subscriptionType} onChange={handleChange}>
            <option value="General">General</option>
            <option value="Custom">Custom</option>
          </select>
        </div>

        <div className="form-group">
          <label>Created By:</label>
          <select name="createdBy" value={formData.createdBy} onChange={handleChange}>
            <option>Select an option</option>
            <option value="admin">Admin</option>
            <option value="system">System</option>
          </select>
        </div>

        <div className="form-group">
          <label>Updated By:</label>
          <select name="updatedBy" value={formData.updatedBy} onChange={handleChange}>
            <option>Select an option</option>
            <option value="admin">Admin</option>
            <option value="system">System</option>
          </select>
        </div>

        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Submitting...' : 'Submit'}
        </button>
        {showSuccessMessage && (
          <div className="success-message">
            <span>&#10003;</span> Data saved successfully!
          </div>
        )}
      </form>
    </div>
  );
}

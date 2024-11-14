import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const APPLICATION_REST_API_URL = 'https://localhost:9092/license-server/v1/application/1';

export default function AddApplication() {
  const history = useNavigate();
  const currentDate = new Date().toISOString();

  const [formData, setFormData] = useState({
    appName: '',
    description: '',
    subscriptionId: 2,
    maxUsers: 10,
    isActive: true,
    createdOn: currentDate,
    createdBy: 'system',
    updatedOn: currentDate,
    updatedBy: 'system',
    file: null,
  });

const [validationErrors, setValidationErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setValidationErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({ ...prevData, file: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = {};
    if (!formData.appName.trim()) {
      errors.appName = 'Application name is required';
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append('file', formData.file);
    formDataToSend.append('app', new Blob([JSON.stringify({
      appName: formData.appName,
      description: formData.description,
      subscriptionPlan: {
        subscriptionId: formData.subscriptionId
      },
      maxUsers: formData.maxUsers,
      isActive: formData.isActive,
      createdOn: formData.createdOn,
      createdBy: formData.createdBy,
      updatedOn: formData.updatedOn,
      updatedBy: formData.updatedBy
    })], {
      type: 'application/json'
    }));

    try {
      const response = await axios.post(APPLICATION_REST_API_URL, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log('Response:', response.data);
      alert('Data saved successfully!');
      history('/');
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  return (
    <div className="add-application-container">
      <h2 style={{ color: "#5c5c9f" }}>Add Application</h2>
      <form className="application-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Application Name:</label>
          <input type="text" name="appName" value={formData.appName} onChange={handleChange} />
          {validationErrors.appName && <div className="error-message" style={{ color: 'red' }}>{validationErrors.appName}</div>}
        </div>

        <div className="form-group">
          <label>Description:</label>
          <input type="text" name="description" value={formData.description} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Subscription ID:</label>
          <input type="number" name="subscriptionId" value={formData.subscriptionId} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>File:</label>
          <input type="file" name="file" onChange={handleFileChange} />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../Services/apiService'; // Ensure the path is correct
import './UserSubscriptionPlan.css'; // Import your CSS file for styling

const API_URL = '/application'; // Base URL is handled in apiService

const RegisteredApplications = () => {
  const [applications, setApplications] = useState([]);
  const [hoveredAppId, setHoveredAppId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserSubscriptions = async () => {
      try {
        const data = await apiService.get(API_URL);
        setApplications(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching applications:', error);
      }
    };

    fetchUserSubscriptions();
  }, []);

  const handleUpdate = (appId) => {
    navigate(`/updateapplication/${appId}`);
  };

  const handleMouseEnter = (appId) => {
    setHoveredAppId(appId);
  };

  const handleMouseLeave = () => {
    setHoveredAppId(null);
  };

  return (
    <div className="user-subscription-container">
      <h2 style={{color:'rgb(52, 71, 103)'}}>Applications</h2>
      <div className="table-container">
        <table className="user-subscription-table">
          <thead>
            <tr>
              <th>Application ID</th>
              <th>Application Name</th>
              <th>Description</th>
              <th>Max Users</th>
              <th>Is Active</th>
              <th>User ID</th>
              <th>Subscription ID</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((application) => (
              <tr key={application.appId}>
                <td
                  onMouseEnter={() => handleMouseEnter(application.appId)}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => handleUpdate(application.appId)}
                  style={{ cursor: 'pointer', position: 'relative' }}
                >
                  {application.appId}
                  {hoveredAppId === application.appId && (
                    <div className="pop-up show">
                      <table className="user-subscription-table">
                        <thead>
                          <tr>
                            <th>Application ID</th>
                            <th>Application Name</th>
                            <th>Description</th>
                            <th>Max Users</th>
                            <th>Is Active</th>
                            <th>User ID</th>
                            <th>Subscription ID</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>{application.appId}</td>
                            <td>{application.appName}</td>
                            <td>{application.description}</td>
                            <td>{application.maxUsers}</td>
                            <td>{application.isActive ? 'Active' : 'Inactive'}</td>
                            <td>{application.owner.userId}</td>
                            <td>{application.subscriptionPlan.subscriptionId}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  )}
                </td>
                <td>{application.appName}</td>
                <td>{application.description}</td>
                <td>{application.maxUsers}</td>
                <td>{application.isActive ? 'Active' : 'Inactive'}</td>
                <td>{application.owner.userId}</td>
                <td>{application.subscriptionPlan.subscriptionId}</td>
                <td>
                  <button onClick={() => handleUpdate(application.appId)}>
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RegisteredApplications;

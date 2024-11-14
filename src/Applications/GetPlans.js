import React, { useEffect, useState } from 'react';
import { Container } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Skeleton from 'react-loading-skeleton';
import apiService from '../Services/apiService'; // Adjust the import path as needed
import './AllSessions.css'; // Import your CSS file for styling

const GetPlans = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_URL = '/subscriptionPlan'; // Relative URL for the API endpoint

  useEffect(() => {
    const fetchUserSubscriptions = async () => {
      try {
        const response = await apiService.get(API_URL);
        setTimeout(() => {
          setPlans(response);
          setLoading(false);
        }, 3000); // Set loading to false after 3 seconds
      } catch (error) {
        console.error('Error fetching Plans:', error);
        setLoading(false);
      }
    };

    fetchUserSubscriptions();
  }, []);

  const columns = [
    { field: 'subscriptionId', headerName: 'Subscription ID', width: 150 },
    { field: 'description', headerName: 'Description', width: 300 },
    { field: 'durationMonths', headerName: 'Duration (Months)', width: 150 },
    { field: 'price', headerName: 'Price', width: 150 },
    {
      field: 'subscriptionType', headerName: 'Subscription Type', width: 200,
      renderCell: (params) => (
        params.value === 'Custom' ? (
          <div className="date-cell">{params.value}</div>
        ) : (
          <div className="date-cell-remain">{params.value}</div>
        )
      )
    },
    {
      field: 'startDate',
      headerName: 'Start Date',
      width: 150,
      renderCell: (params) => (
        params.value ? (
          <div className="date-cell">{params.value}</div>
        ) : (
          <div>{params.value}</div>
        )
      )
    },
    {
      field: 'endDate',
      headerName: 'End Date',
      width: 100,
      renderCell: (params) => (
        params.value ? (
          <div className="date-cell">{params.value}</div>
        ) : (
          <div>{params.value}</div>
        )
      )
    },
  ];

  const renderSkeleton = () => {
    const rows = [];
    for (let i = 0; i < 5; i++) {
      rows.push(
        <div key={i} className="skeleton-row">
          {columns.map((column, index) => (
            <div key={index} className="skeleton-cell">
              <Skeleton height={20} />
            </div>
          ))}
        </div>
      );
    }
    return rows;
  };

  return (
    <div className="css-sa3w6d">
    <Container>
      <h2 style={{ display:"flex",color: "#5c5c9f",marginBlock:"revert" }}>Plans</h2>
      <div className="session-content">
        <div style={{ height: '100%', width: '100%' }}>
          {loading ? (
            <div className="skeleton-container">
              {renderSkeleton()}
            </div>
          ) : (
            <DataGrid
              rows={plans}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5, 10, 20]}
              pagination
              autoHeight
              getRowId={(row) => row.subscriptionId}
              classes={{
                columnHeaders: 'data-grid-header',
              }}
            />
          )}
        </div>
      </div>
    </Container>
    </div>
  );
};

export default GetPlans;

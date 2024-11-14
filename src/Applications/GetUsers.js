import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Button, Menu, MenuItem } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Skeleton from 'react-loading-skeleton';
import { CSVLink } from 'react-csv';
import apiService from '../Services/apiService'; // Adjust the import path as needed
import './AllSessions.css'; // Import your CSS file for styling
import MoreVertIcon from '@mui/icons-material/MoreVert'; // Import MoreVertIcon from Material-UI
import {Form, Icon, Input, Message } from 'semantic-ui-react';
const GetUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [anchorEl, setAnchorEl] = useState(null); // State for menu anchor element
  const API_URL = '/userTable'; // Relative URL for the API endpoint
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await apiService.get(API_URL);
        setTimeout(() => {
          setUsers(response);
          setLoading(false);
        }, 3000); // Set loading to false after 3 seconds
      } catch (error) {
        console.error('Error fetching users:', error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleUpdate = (userId) => {
    navigate(`/updateusers/${userId}`);
  };

  const handleExportClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleExportClose = () => {
    setAnchorEl(null);
  };

  const handlePrint = () => {
    window.print();
  };

  const columns = [
    { field: 'userId', headerName: 'User ID', width: 150 },
    {
      field: 'username', headerName: 'Username', width: 200,
      renderCell: (params) => (
        params.value ? (
          <div className="date-cell-remain">{params.value}</div>
        ) : (
          <div>{params.value}</div>
        )
      )
    },
    {
      field: 'email', headerName: 'Email', width: 200,
      renderCell: (params) => (
        params.value ? (
          <div className="date-cell-remain">{params.value}</div>
        ) : (
          <div>{params.value}</div>
        )
      )
    },
    { field: 'password', headerName: 'Password', width: 200 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 100,
      renderCell: (params) => (
        <button style={{ display: "inline ", background: "linear-gradient(195deg,rgb(26, 115, 232),rgb(73, 163, 241))" }} onClick={() => handleUpdate(params.row.userId)}>Update</button>
      ),
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

  // Filter rows based on search text
  const filteredUsers = users.filter((user) =>
    Object.keys(user).some((key) =>
      String(user[key]).toLowerCase().includes(searchText.toLowerCase())
    )
  );

  const clearSearch = () => {
    setSearchText('');
  };

  // Prepare data for CSV export
  const csvData = [
    ["User ID", "Username", "Email", "Password"],
    ...filteredUsers.map(user => [user.userId, user.username, user.email, user.password])
  ];

  return (
    <div className="css-sa3w6d">
      <Container>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ color: "rgb(52, 71, 103)", marginBlock: "revert" }}>Users</h2>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Input
              type="search"
              value={searchText}
              icon={searchText && <Icon name='close' link onClick={clearSearch} />}
              iconPosition={searchText ? 'end' : null}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search..."
              style={{ fontSize: 14, marginRight: '16px' }}
            />
            <Button
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleExportClick}
              startIcon={<MoreVertIcon />}
              variant="contained"
              color="secondary"
            >
              Export
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleExportClose}
            >
              <MenuItem onClick={handleExportClose}>
                <CSVLink
                  data={csvData}
                  filename={"users.csv"}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  Download as CSV
                </CSVLink>
              </MenuItem>
              <MenuItem onClick={() => { handleExportClose(); handlePrint(); }}>Print</MenuItem>
            </Menu>
          </div>
        </div>
        <div className="session-content">
          <div style={{ height: 400, width: '100%' }}>
            {loading ? (
              <div className="skeleton-container">
                {renderSkeleton()}
              </div>
            ) : (
              <DataGrid
                rows={filteredUsers}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5, 10, 20]}
                pagination
                getRowId={(row) => row.userId}
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

export default GetUsers;

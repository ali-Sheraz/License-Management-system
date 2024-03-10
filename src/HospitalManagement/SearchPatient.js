// SearchPatient.js
import React, { useState } from 'react';
import axios from 'axios';
import '../loader.css';
import { useNavigate } from 'react-router-dom';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';

const USER_REST_API_URL = 'http://localhost:8080/api/patients';

const SearchPatient = () => {
  const [patients, setPatients] = useState([]);
  const [criteria, setCriteria] = useState({ age: '', gender: '', disease: '' });

  const history = useNavigate();

  const fetchData = () => {
    return axios.get(USER_REST_API_URL, { params: criteria })
      .then(response => {
        setPatients(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setPatients([]); // Reset patients state
        alert('No Patient Found!');
      });
  };

  const viewDetail = (patientId) => {
    // Navigate to the patient details page with the patient's ID
    history(`/viewpatientdetail/${patientId}`);
  };

  const handleCriteriaChange = (e) => {
    const { name, value } = e.target;
    setCriteria((prevCriteria) => ({ ...prevCriteria, [name]: value }));
  };

  const handleSearchClick = () => {
    // Validation: Check if all fields are filled
    if (!criteria.age || !criteria.gender || !criteria.disease) {
      alert('Please fill in all fields before searching.');
      return;
    }

    // Fetch data when all fields are filled
    fetchData();
  };

  return (
    <div>
      <h1 style={{ textAlign:'center',color: "#5c5c9f" }}>Hospital Management System</h1>
      <div className="horizontal-inputs">
        <div>
          <label>Age:</label>
          <input type="number" name="age" onChange={handleCriteriaChange} />
        </div>
        <div>
          <label>Gender:</label>
          <input type="text" name="gender" onChange={handleCriteriaChange} />
        </div>
        <div>
          <label>Disease:</label>
          <input type="text" name="disease" onChange={handleCriteriaChange} />
        </div>
      </div>
      <button style={{ marginLeft:'35em',marginBlock: '1rem' }} onClick={handleSearchClick}>
        Search Patients
      </button>
      <div>
        <TableContainer component={Paper} sx={{ marginLeft: 'auto', marginRight: 'auto', width: '60%' }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow sx={{ backgroundColor: '#5c5c9f' }}>
                <TableCell sx={{ color: 'white' }}>Name</TableCell>
                <TableCell sx={{ color: 'white' }}>Age</TableCell>
                <TableCell sx={{ color: 'white' }}>Gender</TableCell>
                <TableCell sx={{ color: 'white' }}>Address</TableCell>
                <TableCell sx={{ color: 'white' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {patients.map((person, index) => (
                <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell>{person.name}</TableCell>
                  <TableCell>{person.age}</TableCell>
                  <TableCell>{person.gender}</TableCell>
                  <TableCell>{person.address}</TableCell>
                  <TableCell>
                    <button onClick={() => viewDetail(person.id)}>View Details</button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default SearchPatient;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import { height } from '@mui/system';

const USER_REST_API_URL = 'http://localhost:8080/api/patients';

const ViewPatientMoreDetails = () => {
  const [patientDetail, setPatientDetail] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchPatientDetail = async () => {
      try {
        if (id) {
          console.log('Fetching patient details for ID:', id);
          const response = await axios.get(`${USER_REST_API_URL}/${id}`);
          console.log('Response data:', response.data);
          setPatientDetail(response.data);
        }
      } catch (error) {
        console.error('Error fetching patient details:', error);
      }
    };

    fetchPatientDetail();
  }, [id]);

  if (!patientDetail) {
    console.log('Patient details are still loading...');
    return <div>Loading...</div>;
  }

  return (
    <div>
      <TableContainer
        component={Paper}
        sx={{
          margin: 'auto',
          justifyContent:'center',
          width:"80%",

        }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#5c5c9f' }}>
              <TableCell sx={{ color: 'white' }}>Visit Date</TableCell>
              <TableCell sx={{ color: 'white' }}>Visit Time</TableCell>
              <TableCell sx={{ color: 'white' }}>Consulting Doctor</TableCell>
              <TableCell sx={{ color: 'white' }}>Disease</TableCell>
              <TableCell sx={{ color: 'white' }}>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell>{patientDetail.visits[0].date}</TableCell>
              <TableCell>{patientDetail.visits[0].time}</TableCell>
              <TableCell>{patientDetail.visits[0].consultingDoctor.name}</TableCell>
              <TableCell>{patientDetail.visits[0].disease.name}</TableCell>
              <TableCell>{patientDetail.visits[0].disease.description}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ViewPatientMoreDetails;

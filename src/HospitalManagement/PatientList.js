import React, { useState, useEffect } from 'react';
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
import CircularProgress from '@mui/material/CircularProgress';
const USER_REST_API_URL = 'http://localhost:8080/api/patients';


export default function User() {
    const [dat, setdata] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [patientToDelete, setPatientToDelete] = useState(null);
    const history = useNavigate();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true); // Set loading to true when fetching data
        try {
            const response = await axios.get(USER_REST_API_URL);
            console.log('API Response:', response.data);
            setdata(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false); // Set loading to false after fetching, whether successful or not
        }
    };
    const add = () => {
        history('/addpatient');
    }
    const criteria = () => {
        history('/SearchPatient');
    }
    const handleDelete = (patient) => {
        setPatientToDelete(patient);
        setDeleteDialogOpen(true);
    };

    const confirmDelete = async () => {
        try {
            await axios.delete(`${USER_REST_API_URL}/${patientToDelete.id}`);
            alert('Data Deleted successfully!');
            fetchData();
        } catch (error) {
            console.error('Error deleting data:', error);
        } finally {
            setDeleteDialogOpen(false);
            setPatientToDelete(null);
        }
    };

    const cancelDelete = () => {
        setDeleteDialogOpen(false);
        setPatientToDelete(null);
    };
    const handleUpdate = (patientId) => {
        // Navigate to the patient details page with the patient's ID
        history(`/updaterecord/${patientId}`);
    };

    return (
        <div>
            <h1 style={{ textAlign:'center',color: "#5c5c9f" }}>Hospital Management System</h1>
            <div className='hom'>
                <button style={{ marginLeft: '8rem', display: 'block', marginBottom: "1rem" }} onClick={add}>
                    Add Patient  </button>
                    <button style={{marginLeft: '8rem', display: 'block', marginBottom: "1rem"  }} onClick={criteria}>
                    Criteria Based Search
                </button>

            </div>

            {loading ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ marginBottom: '10px', display: 'flex', justifyContent: 'center' }}>
                        <div className="loader"></div>
                        <div className="loader"></div>
                        <div className="loader"></div>
                    </div>
                    <CircularProgress size={80} thickness={5} color="secondary" />
                </div>
            ) : (
                <div>
                    <TableContainer component={Paper} sx={{ marginLeft: "auto", marginRight: "auto", width: "80%" }}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow sx={{ backgroundColor: "#5c5c9f", }}>
                                    <TableCell sx={{ color: "white" }}>Name</TableCell>
                                    <TableCell sx={{ color: "white" }}>Age</TableCell>
                                    <TableCell sx={{ color: "white" }}>Gender</TableCell>
                                    <TableCell sx={{ color: "white" }}>Address</TableCell>
                                    <TableCell sx={{ color: "white" }}>Visit Date</TableCell>
                                    <TableCell sx={{ color: "white" }}>Consulting Doctor</TableCell>
                                    <TableCell sx={{ color: "white" }}>Disease</TableCell>
                                    <TableCell sx={{ color: "white" }}>Description</TableCell>
                                    <TableCell sx={{ color: 'white' }}>Delete</TableCell>
                                    <TableCell sx={{ color: 'white' }}>Update</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {dat.map((person, index) => (
                                    <TableRow
                                        key={index}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell>{person.name}</TableCell>
                                        <TableCell>{person.age}</TableCell>
                                        <TableCell>{person.gender}</TableCell>
                                        <TableCell>{person.address}</TableCell>
                                        <TableCell>{person.visits.slice(-1)[0].date}</TableCell>
                                        <TableCell>{person.visits.slice(-1)[0].consultingDoctor.name}</TableCell>
                                        <TableCell>{person.visits.slice(-1)[0].disease.name}</TableCell>
                                        <TableCell>{person.visits.slice(-1)[0].disease.description}</TableCell>
                                        <TableCell>
                                            <button onClick={() => handleDelete(person)}>Delete</button>
                                        </TableCell>
                                        <TableCell>
                                            <button onClick={() => handleUpdate(person.id)}>Update</button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            )}
            {isDeleteDialogOpen && (
                <div className="delete-dialog">
                    <p>Are you sure you want to delete {patientToDelete ? patientToDelete.name : ''}?</p>
                    <div className='hom'>
                        <button style={{ marginRight: '1rem' }} onClick={confirmDelete}>Yes</button>
                        <button onClick={cancelDelete}>No</button>
                    </div>
                </div>
            )}

        </div>
    );
}

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const USER_REST_API_URL = 'http://localhost:8080/api/patients';

export default function UpdateRecord() {
  const currentDate = new Date();
  const history = useNavigate();
  const formattedDate = currentDate.toISOString().split('T')[0];
  const formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const { id } = useParams();

  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    phone: '',
    address: '',
    visitDate: formattedDate,
    visitTime: formattedTime,
    diseaseName: '',
    diseaseDescription: '',
    doctorName: '',
    doctorSpecialty: '',
  });

  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    const fetchPatientDetail = async () => {
      try {
        if (id) {
          console.log('Fetching patient details for ID:', id);
          const response = await axios.get(`${USER_REST_API_URL}/${id}`);
          console.log('Response data:', response.data);

          // Set patient details in the form
          const { name, age, gender, phone, address, visits } = response.data;
          if (visits.length > 0) {
            const lastVisit = visits[visits.length - 1];
            const { date, time, disease, consultingDoctor }= lastVisit;

          setFormData({
            name,
            age: age.toString(),
            gender,
            phone,
            address,
            visitDate: date,
            visitTime: time,
            diseaseName: disease.name,
            diseaseDescription: disease.description,
            doctorName: consultingDoctor.name,
            doctorSpecialty: consultingDoctor.specialty,
          });
        }
    }
      } catch (error) {
        console.error('Error fetching patient details:', error);
      }
    };

    fetchPatientDetail();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setValidationErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic form validation
    const errors = {};
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }
    if (!formData.age.trim()) {
      errors.age = 'Age is required';
    } else if (isNaN(formData.age) || formData.age <= 0) {
      errors.age = 'Age must be a valid positive number';
    }
    if (!formData.gender.trim()) {
      errors.gender = 'Gender is required';
    }
    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      errors.phone = 'Phone number must be 10 digits';
    }
    if (!formData.address.trim()) {
      errors.address = 'Address is required';
    }
    if (!formData.visitDate.trim()) {
      errors.visitDate = 'Visit date is required';
    }
    if (!formData.visitTime.trim()) {
      errors.visitTime = 'Visit time is required';
    }
    if (!formData.diseaseName.trim()) {
      errors.diseaseName = 'Disease name is required';
    }
    if (!formData.diseaseDescription.trim()) {
      errors.diseaseDescription = 'Disease description is required';
    }
    if (!formData.doctorName.trim()) {
      errors.doctorName = 'Doctor name is required';
    }
    if (!formData.doctorSpecialty.trim()) {
      errors.doctorSpecialty = 'Doctor specialty is required';
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    try {
      const response = await axios.put(`${USER_REST_API_URL}/${id}`, {
        ...formData,
        visits: [
          {
            date: formattedDate,
            time: formattedTime,
            disease: {
              name: formData.diseaseName,
              description: formData.diseaseDescription,
            },
            consultingDoctor: {
              name: formData.doctorName,
              specialty: formData.doctorSpecialty,
            },
          },
        ],
      });

      console.log('Data updated successfully:', response.data);
      // Reset the form or handle success accordingly
      // ...

      // Show alert
      alert('Data updated successfully!');
      history('/');
    } catch (error) {
      console.error('Error updating data:', error);
      // Handle error
    }
  };

  return (
    <div className="add-patient-container">
      <h2 style={{ color: 'blue' }}>Update Patient Record</h2>
      <form className="patient-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
          {validationErrors.name && <div className="error-message">{validationErrors.name}</div>}
        </div>

        <div className="form-group">
          <label>Age:</label>
          <input type="number" name="age" value={formData.age} onChange={handleChange} />
          {validationErrors.age && <div className="error-message" style={{ color: 'red' }}>{validationErrors.age}</div>}
        </div>

        <div className="form-group">
          <label>Gender:</label>
          <input type="text" name="gender" value={formData.gender} onChange={handleChange} />
          {validationErrors.gender && <div className="error-message" style={{ color: 'red' }}>{validationErrors.gender}</div>}
        </div>

        <div className="form-group">
          <label>Phone:</label>
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
          {validationErrors.phone && <div className="error-message" style={{ color: 'red' }}>{validationErrors.phone}</div>}
        </div>

        <div className="form-group">
          <label>Address:</label>
          <input type="text" name="address" value={formData.address} onChange={handleChange} />
          {validationErrors.address && <div className="error-message" style={{ color: 'red' }}>{validationErrors.address}</div>}
        </div>

        <div className="form-group">
          <label>Visit Date:</label>
          <input type="date" name="visitDate" value={formData.visitDate} onChange={handleChange} />
          {validationErrors.visitDate && <div className="error-message" style={{ color: 'red' }}>{validationErrors.visitDate}</div>}
        </div>

        <div className="form-group">
          <label>Visit Time:</label>
          <input type="time" name="visitTime" value={formData.visitTime} onChange={handleChange} />
          {validationErrors.visitTime && <div className="error-message" style={{ color: 'red' }}>{validationErrors.visitTime}</div>}
        </div>

        <div className="form-group">
          <label>Disease Name:</label>
          <input type="text" name="diseaseName" value={formData.diseaseName} onChange={handleChange} />
          {validationErrors.diseaseName && <div className="error-message" style={{ color: 'red' }}>{validationErrors.diseaseName}</div>}
        </div>

        <div className="form-group">
          <label>Disease Description:</label>
          <input type="text" name="diseaseDescription" value={formData.diseaseDescription} onChange={handleChange} />
          {validationErrors.diseaseDescription && <div className="error-message" style={{ color: 'red' }}>{validationErrors.diseaseDescription}</div>}
        </div>

        <div className="form-group">
          <label>Doctor Name:</label>
          <input type="text" name="doctorName" value={formData.doctorName} onChange={handleChange} />
          {validationErrors.doctorName && <div className="error-message" style={{ color: 'red' }}>{validationErrors.doctorName}</div>}
        </div>

        <div className="form-group">
          <label>Doctor Specialty:</label>
          <input type="text" name="doctorSpecialty" value={formData.doctorSpecialty} onChange={handleChange} />
          {validationErrors.doctorSpecialty && <div className="error-message" style={{ color: 'red' }}>{validationErrors.doctorSpecialty}</div>}
        </div>

        <button type="submit">Update</button>
      </form>
    </div>
  );
}

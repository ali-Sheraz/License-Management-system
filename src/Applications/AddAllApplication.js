// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const APPLICATION_REST_API_URL = 'https://localhost:9092/license-server/v1/application/1';
// const SUBSCRIPTION_PLANS_API_URL = 'https://localhost:9092/license-server/v1/subscriptionPlan';
// const UPLOAD_CERTIFICATE_API_URL = 'https://localhost:9092/license-server/v1/uploadCertificate';

// export default function AddAllApplication() {
//   const history = useNavigate();
//   const currentDate = new Date().toISOString();

//   const [formData, setFormData] = useState({
//     appName: '',
//     description: '',
//     subscriptionId: '',
//     maxUsers: 10,
//     isActive: true,
//     createdOn: currentDate,
//     createdBy: 'system',
//     updatedOn: currentDate,
//     updatedBy: 'system',
//     file: null,
//   });

//   const [validationErrors, setValidationErrors] = useState({});
//   const [subscriptionType, setSubscriptionType] = useState(''); // Initialize as empty
//   const [subscriptionPlans, setSubscriptionPlans] = useState([]);
//   const [isFileUploaded, setIsFileUploaded] = useState(false); // Track if file is uploaded

//   useEffect(() => {
//     const fetchSubscriptionPlans = async () => {
//       try {
//         const response = await axios.get(SUBSCRIPTION_PLANS_API_URL);
//         setSubscriptionPlans(response.data);
//       } catch (error) {
//         console.error('Error fetching subscription plans:', error);
//       }
//     };

//     fetchSubscriptionPlans();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({ ...prevData, [name]: value }));
//     setValidationErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
//   };

//   const handleSubscriptionTypeChange = (e) => {
//     setSubscriptionType(e.target.value);
//     setFormData((prevData) => ({ ...prevData, subscriptionId: '' })); // Reset subscriptionId on change
//   };

//   const handleFileChange = async (e) => {
//     const file = e.target.files[0];
//     setFormData((prevData) => ({ ...prevData, file }));

//     // Upload the file to get the subscription plan ID
//     const formDataToSend = new FormData();
//     formDataToSend.append('file', file);

//     try {
//       const response = await axios.post(UPLOAD_CERTIFICATE_API_URL, formDataToSend, {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         }
//       });

//       // Assuming the response is a string, we need to parse it correctly
//       const responseText = response.data;
//       const subscriptionIdMatch = responseText.match(/subscriptionId=(\d+)/);
//       const subscriptionId = subscriptionIdMatch ? subscriptionIdMatch[1] : '';

//       if (subscriptionId) {
//         setFormData((prevData) => ({ ...prevData, subscriptionId }));
//         setIsFileUploaded(true); // Set file uploaded state to true
//         alert('File uploaded successfully and subscription ID set!');
//       } else {
//         alert('File uploaded but failed to extract subscription ID.');
//       }
//     } catch (error) {
//       console.error('Error uploading file:', error);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const errors = {};
//     if (!formData.appName.trim()) {
//       errors.appName = 'Application name is required';
//     }

//     if (Object.keys(errors).length > 0) {
//       setValidationErrors(errors);
//       return;
//     }

//     const dataToSend = {
//       appName: formData.appName,
//       description: formData.description,
//       subscriptionPlan: {
//         subscriptionId: formData.subscriptionId
//       },
//       maxUsers: formData.maxUsers,
//       isActive: formData.isActive,
//       createdOn: formData.createdOn,
//       createdBy: formData.createdBy,
//       updatedOn: formData.updatedOn,
//       updatedBy: formData.updatedBy
//     };

//     try {
//       const response = await axios.post(APPLICATION_REST_API_URL, dataToSend, {
//         headers: {
//           'Content-Type': 'application/json'
//         }
//       });

//       console.log('Response:', response.data);
//       alert('Data saved successfully!');
//       history('/');
//     } catch (error) {
//       console.error('Error saving data:', error);
//     }
//   };

//   return (
//     <div className="add-application-container">
//       <h2 style={{ color: "#5c5c9f" }}>Add Application</h2>
//       <form className="application-form" onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label>Application Name:</label>
//           <input type="text" name="appName" value={formData.appName} onChange={handleChange} />
//           {validationErrors.appName && <div className="error-message" style={{ color: 'red' }}>{validationErrors.appName}</div>}
//         </div>

//         <div className="form-group">
//           <label>Description:</label>
//           <input type="text" name="description" value={formData.description} onChange={handleChange} />
//         </div>

//         <div className="form-group">
//           <label>Subscription ID:</label>
//           <input type="number" name="subscriptionId" value={formData.subscriptionId} onChange={handleChange} disabled={subscriptionType !== 'General'} />
//         </div>

//         <div className="form-group">
//           <label>Subscription Type:</label>
//           <select name="subscriptionType" value={subscriptionType} onChange={handleSubscriptionTypeChange}>
//             <option value="">Select Subscription Type</option>
//             <option value="General">General</option>
//             <option value="Custom">Custom</option>
//           </select>
//         </div>

//         {subscriptionType === 'General' && (
//           <div className="form-group">
//             <label>Select Subscription Plan:</label>
//             <select name="selectedSubscriptionPlan" value={formData.subscriptionId} onChange={(e) => setFormData((prevData) => ({ ...prevData, subscriptionId: e.target.value }))}>
//               <option value="">Select a Plan</option>
//               {subscriptionPlans.map((plan) => (
//                 <option key={plan.subscriptionId} value={plan.subscriptionId}>
//                   {plan.name}
//                 </option>
//               ))}
//             </select>
//           </div>
//         )}

//         {subscriptionType === 'Custom' && (
//           <div className="form-group">
//             <label>Upload File:</label>
//             <input type="file" name="file" onChange={handleFileChange} disabled={isFileUploaded} />
//             {isFileUploaded && <p style={{ color: 'green' }}>File uploaded successfully. You cannot upload another file.</p>}
//           </div>
//         )}

//         <div className="form-group">
//           <label>Max Users:</label>
//           <input type="number" name="maxUsers" value={formData.maxUsers} onChange={handleChange} />
//         </div>

//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// }
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const APPLICATION_REST_API_URL = 'https://localhost:9092/license-server/v1/application/1';
// const SUBSCRIPTION_PLANS_API_URL = 'https://localhost:9092/license-server/v1/subscriptionPlan';
// const UPLOAD_CERTIFICATE_API_URL = 'https://localhost:9092/license-server/v1/uploadCertificate';

// export default function AddAllApplication() {
//   const history = useNavigate();
//   const currentDate = new Date().toISOString();

//   const [formData, setFormData] = useState({
//     appName: '',
//     description: '',
//     subscriptionId: '',
//     maxUsers: 10,
//     isActive: true,
//     createdOn: currentDate,
//     createdBy: 'system',
//     updatedOn: currentDate,
//     updatedBy: 'system',
//     file: null,
//   });

//   const [validationErrors, setValidationErrors] = useState({});
//   const [subscriptionType, setSubscriptionType] = useState(''); // Initialize as empty
//   const [subscriptionPlans, setSubscriptionPlans] = useState([]);
//   const [isFileUploaded, setIsFileUploaded] = useState(false); // Track if file is uploaded

//   useEffect(() => {
//     const fetchSubscriptionPlans = async () => {
//       try {
//         const response = await axios.get(SUBSCRIPTION_PLANS_API_URL);
//         setSubscriptionPlans(response.data);
//       } catch (error) {
//         console.error('Error fetching subscription plans:', error);
//       }
//     };

//     fetchSubscriptionPlans();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({ ...prevData, [name]: value }));
//     setValidationErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
//   };

//   const handleSubscriptionTypeChange = (e) => {
//     setSubscriptionType(e.target.value);
//     setFormData((prevData) => ({ ...prevData, subscriptionId: '' })); // Reset subscriptionId on change
//   };

//   const handleFileChange = async (e) => {
//     const file = e.target.files[0];

//     // Validate file type here
//     if (file && file.type !== 'application/x-x509-ca-cert') {
//       alert('Only .cer files are allowed.');
//       return;
//     }

//     setFormData((prevData) => ({ ...prevData, file }));

//     // Upload the file to get the subscription plan ID
//     const formDataToSend = new FormData();
//     formDataToSend.append('file', file);

//     try {
//       const response = await axios.post(UPLOAD_CERTIFICATE_API_URL, formDataToSend, {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         }
//       });

//       // Assuming the response is a string, we need to parse it correctly
//       const responseText = response.data;
//       const subscriptionIdMatch = responseText.match(/subscriptionId=(\d+)/);
//       const subscriptionId = subscriptionIdMatch ? subscriptionIdMatch[1] : '';

//       if (subscriptionId) {
//         setFormData((prevData) => ({ ...prevData, subscriptionId }));
//         setIsFileUploaded(true); // Set file uploaded state to true
//         alert('File uploaded successfully and subscription ID set!');
//       } else {
//         alert('File uploaded but failed to extract subscription ID.');
//       }
//     } catch (error) {
//       console.error('Error uploading file:', error);
//       alert(`File upload failed: ${error.response.data}`);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const errors = {};
//     if (!formData.appName.trim()) {
//       errors.appName = 'Application name is required';
//     }

//     if (Object.keys(errors).length > 0) {
//       setValidationErrors(errors);
//       return;
//     }

//     const dataToSend = {
//       appName: formData.appName,
//       description: formData.description,
//       subscriptionPlan: {
//         subscriptionId: formData.subscriptionId
//       },
//       maxUsers: formData.maxUsers,
//       isActive: formData.isActive,
//       createdOn: formData.createdOn,
//       createdBy: formData.createdBy,
//       updatedOn: formData.updatedOn,
//       updatedBy: formData.updatedBy
//     };

//     try {
//       const response = await axios.post(APPLICATION_REST_API_URL, dataToSend, {
//         headers: {
//           'Content-Type': 'application/json'
//         }
//       });

//       console.log('Response:', response.data);
//       alert('Data saved successfully!');
//       history('/');
//     } catch (error) {
//       console.error('Error saving data:', error);
//     }
//   };

//   return (
//     <div className="add-application-container">
//       <h2 style={{ color: "#5c5c9f" }}>Add Application</h2>
//       <form className="application-form" onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label>Application Name:</label>
//           <input type="text" name="appName" value={formData.appName} onChange={handleChange} />
//           {validationErrors.appName && <div className="error-message" style={{ color: 'red' }}>{validationErrors.appName}</div>}
//         </div>

//         <div className="form-group">
//           <label>Description:</label>
//           <input type="text" name="description" value={formData.description} onChange={handleChange} />
//         </div>

//         <div className="form-group">
//           <label>Subscription ID:</label>
//           <input type="number" name="subscriptionId" value={formData.subscriptionId} onChange={handleChange} disabled={subscriptionType !== 'General'} />
//         </div>

//         <div className="form-group">
//           <label>Subscription Type:</label>
//           <select name="subscriptionType" value={subscriptionType} onChange={handleSubscriptionTypeChange}>
//             <option value="">Select Subscription Type</option>
//             <option value="General">General</option>
//             <option value="Custom">Custom</option>
//           </select>
//         </div>

//         {subscriptionType === 'General' && (
//           <div className="form-group">
//             <label>Select Subscription Plan:</label>
//             <select name="selectedSubscriptionPlan" value={formData.subscriptionId} onChange={(e) => setFormData((prevData) => ({ ...prevData, subscriptionId: e.target.value }))}>
//               <option value="">Select a Plan</option>
//               {subscriptionPlans.map((plan) => (
//                 <option key={plan.subscriptionId} value={plan.subscriptionId}>
//                   {plan.name}
//                 </option>
//               ))}
//             </select>
//           </div>
//         )}

//         {subscriptionType === 'Custom' && (
//           <div className="form-group">
//             <label>Upload File (.cer only):</label>
//             <input type="file" name="file" accept=".cer" onChange={handleFileChange} disabled={isFileUploaded} />
//             {isFileUploaded && <p style={{ color: 'green' }}>File uploaded successfully. You cannot upload another file.</p>}
//           </div>
//         )}

//         <div className="form-group">
//           <label>Max Users:</label>
//           <input type="number" name="maxUsers" value={formData.maxUsers} onChange={handleChange} />
//         </div>

//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// }
// src/components/AddAllApplication.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../Services/apiService'; // Adjust the import path as needed
import './AddAllApplication.css';
import Modal from './Modal';

const APPLICATION_API_URL = '/application/1';
const SUBSCRIPTION_PLANS_API_URL = '/subscriptionPlan';
const UPLOAD_CERTIFICATE_API_URL = '/uploadCertificate';

export default function AddAllApplication() {
  const history = useNavigate();
  const currentDate = new Date().toISOString();
  const [isModalOpen, setIsModalOpen] = useState(true);

  const [formData, setFormData] = useState({
    appName: '',
    description: '',
    subscriptionId: '',
    maxUsers: 10,
    isActive: true,
    createdOn: currentDate,
    createdBy: 'system',
    updatedOn: currentDate,
    updatedBy: 'system',
    file: null,
  });

  const [validationErrors, setValidationErrors] = useState({});
  const [subscriptionType, setSubscriptionType] = useState('');
  const [subscriptionPlans, setSubscriptionPlans] = useState([]);
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchSubscriptionPlans = async () => {
      try {
        const plans = await apiService.get(SUBSCRIPTION_PLANS_API_URL);
        setSubscriptionPlans(plans);
      } catch (error) {
        console.error('Error fetching subscription plans:', error);
      }
    };

    fetchSubscriptionPlans();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setValidationErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };

  const handleSubscriptionTypeChange = (e) => {
    setSubscriptionType(e.target.value);
    setFormData((prevData) => ({ ...prevData, subscriptionId: '' }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({ ...prevData, file }));
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

    setIsLoading(true);
    setErrorMessage('');

    if (subscriptionType === 'Custom' && formData.file) {
      const formDataToSend = new FormData();
      formDataToSend.append('file', formData.file);

      try {
        const responseText = await apiService.post(UPLOAD_CERTIFICATE_API_URL, formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        const subscriptionIdMatch = responseText.match(/subscriptionId=(\d+)/);
        const subscriptionId = subscriptionIdMatch ? subscriptionIdMatch[1] : '';
        console.log("subscription id is :",subscriptionId)

        if (subscriptionId) {
          formData.subscriptionId = subscriptionId;
          setIsFileUploaded(true);
          alert('File uploaded successfully and subscription ID set!');
        } else {
          alert('File uploaded but failed to extract subscription ID.');
          setIsLoading(false);
          return;
        }
      } catch (error) {
        console.error('Error uploading file:', error);
        setErrorMessage(`File upload failed: ${error.response?.data || error.message}`);
        setIsLoading(false);
        return;
      }
    }

    const dataToSend = {
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
    };

    try {
      const response = await apiService.post(APPLICATION_API_URL, dataToSend, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log('Response:', response);
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 3000);
      history('/');
    } catch (error) {
      console.error('Error saving data:', error);
      setErrorMessage(`Error saving data: ${error.response?.data || error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="add-application-container">
      {showSuccessMessage && (
        <div className="success-message">
          <span>&#10003;</span> Data saved successfully!
        </div>
      )}
      {errorMessage && (
        <div className="error-message-box">
          <span>&#10060;</span> {errorMessage}
        </div>
      )}
      <Modal isOpen={isModalOpen} onClose={closeModal} />
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
          <input type="number" name="subscriptionId" value={formData.subscriptionId} onChange={handleChange} disabled={subscriptionType !== 'General'} />
        </div>

        <div className="form-group">
          <label>Subscription Type:</label>
          <select name="subscriptionType" value={subscriptionType} onChange={handleSubscriptionTypeChange}>
            <option value="">Select Subscription Type</option>
            <option value="General">General</option>
            <option value="Custom">Custom</option>
          </select>
        </div>

        {subscriptionType === 'General' && (
          <div className="form-group">
            <label>Select Subscription Plan:</label>
            <select name="selectedSubscriptionPlan" value={formData.subscriptionId} onChange={(e) => setFormData((prevData) => ({ ...prevData, subscriptionId: e.target.value }))}>
              <option value="">Select a Plan</option>
              {subscriptionPlans.map((plan) => (
                <option key={plan.subscriptionId} value={plan.subscriptionId}>
                  {plan.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {subscriptionType === 'Custom' && (
          <div className="form-group">
            <label>Upload File (.cer only):</label>
            <input type="file" name="file" accept=".cer" onChange={handleFileChange} />
          </div>
        )}

        <div className="form-group">
          <label>Max Users:</label>
          <input type="number" name="maxUsers" value={formData.maxUsers} onChange={handleChange} />
        </div>

        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
}

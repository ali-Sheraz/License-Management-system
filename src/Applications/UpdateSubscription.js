// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import './UpdateSubscription.css'; // Import your CSS file for styling

// const SUBSCRIPTION_PLANS_API_URL = 'https://localhost:9092/license-server/v1/subscriptionPlan';
// const UPDATE_CERTIFICATE_URL = 'https://localhost:9092/license-server/v1/updateCertificate';
// const UPDATE_USER_SUBSCRIPTION_PLAN='https://localhost:9092/license-server/v1/userSubscriptionPlan'

// const UpdateSubscription = () => {
//   const { userId, appId, subscriptionId, subscriptionType } = useParams();
//   const [subscriptionPlans, setSubscriptionPlans] = useState([]);
//   const [selectedSubscription, setSelectedSubscription] = useState('');
//   const [submittedSubscriptionId, setSubmittedSubscriptionId] = useState('');
//   const [certificateUpdated, setCertificateUpdated] = useState(false);
//   const [file, setFile] = useState(null);
//   const [successMessage, setSuccessMessage] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');

//   useEffect(() => {
//     const fetchSubscriptionPlans = async () => {
//       try {
//         const response = await axios.get(SUBSCRIPTION_PLANS_API_URL);
//         console.log('Fetched subscription plans:', response.data);
//         setSubscriptionPlans(response.data);
//       } catch (error) {
//         console.error('Error fetching subscription plans:', error);
//         setErrorMessage('Failed to fetch subscription plans. Please try again later.');
//       }
//     };

//     if (subscriptionType.toLowerCase() === 'general') {
//       fetchSubscriptionPlans();
//     }
//   }, [subscriptionType]);

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (subscriptionType.toLowerCase() === 'custom' && file && !certificateUpdated) {
//       try {
//         const formData = new FormData();
//         formData.append('file', file);

//         const certificateResponse = await axios.put(`${UPDATE_CERTIFICATE_URL}/${subscriptionId}`, formData, {
//           headers: {
//             'Content-Type': 'multipart/form-data'
//           }
//         });
//         console.log('Certificate update response:', certificateResponse.data);
        
//         const updatedSubscriptionId = extractSubscriptionIdFromResponse(certificateResponse.data);
//         console.log('Updated subscription ID from certificate response:', updatedSubscriptionId);

//         const userSubscriptionResponse = await axios.put(`${UPDATE_USER_SUBSCRIPTION_PLAN}/${userId}/${appId}/${updatedSubscriptionId}`);
//         console.log('User subscription update response:', userSubscriptionResponse.data);
//         setSubmittedSubscriptionId(updatedSubscriptionId);
//         setCertificateUpdated(true);
//         setSuccessMessage(`Subscription updated successfully with ID: ${updatedSubscriptionId}`);

//         // Clear success message after 3 seconds
//         setTimeout(() => {
//           setSuccessMessage('');
//         }, 1000);
//       } catch (error) {
//         console.error('Error updating certificate or user subscription:', error);
//         setErrorMessage('Failed to update certificate or user subscription. Please try again.');
//         setTimeout(() => {
//             setErrorMessage('');
//           }, 1000);
//       }
//     } else {
//       try {
//         const response = await axios.put(`https://localhost:9092/license-server/v1/userSubscriptionPlan/${userId}/${appId}/${selectedSubscription}`);
//         console.log('Update response:', response.data);
//         setSubmittedSubscriptionId(selectedSubscription);
//         setSuccessMessage(`Subscription updated successfully with ID: ${selectedSubscription}`);

//         // Clear success message after 3 seconds
//         setTimeout(() => {
//           setSuccessMessage('');
//         }, 1000);
//       } catch (error) {
//         console.error('Error updating subscription:', error);
//         setErrorMessage('Failed to update subscription. Please try again.');
//         setTimeout(() => {
//             setErrorMessage('');
//           }, 1000);
//       }
//     }
//   };

//   const extractSubscriptionIdFromResponse = (responseText) => {
//     const subscriptionIdMatch = responseText.match(/subscriptionId=(\d+)/);
//     return subscriptionIdMatch ? subscriptionIdMatch[1] : '';
//   };

//   return (
//     <div className="container">
//       <div className="row justify-content-center mt-5">
//         <div className="col-md-8">
//           <div className="card">
//             <div className="card-body">
//               <h2  style={{ color: "#5c5c9f" }} className="card-title text-center mb-4">Update Subscription</h2>
//               <form onSubmit={handleSubmit} className="update-subscription-form">
//                 {subscriptionType.toLowerCase() === 'general' && (
//                   <div className="form-group">
//                     <label htmlFor="subscriptionPlan" className="select-label">Select Subscription Plan:</label>
//                     <select
//                       id="subscriptionPlan"
//                       className="form-control subscription-select"
//                       value={selectedSubscription}
//                       onChange={(e) => setSelectedSubscription(e.target.value)}
//                     >
//                       <option value="">Select a plan</option>
//                       {subscriptionPlans.map((plan) => (
//                         <option key={plan.subscriptionId} value={plan.subscriptionId}>
//                           {plan.name}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                 )}
//                 {subscriptionType.toLowerCase() === 'custom' && !certificateUpdated && (
//                   <div className="form-group">
//                     <label htmlFor="file" className="file-label">Upload File:</label>
//                     <input
//                       type="file"
//                       id="file"
//                       className="form-control-file"
//                       onChange={handleFileChange}
//                     />
//                   </div>
//                 )}
//                 <div className="form-group text-center">
//                   <button type="submit" className="btn btn-primary submit-button">Submit</button>
//                 </div>
//               </form>
//               {successMessage && (
//                 <div className="alert alert-success mt-3" role="alert">
//                   {successMessage}
//                 </div>
//               )}
//               {errorMessage && (
//                 <div className="alert alert-danger mt-3" role="alert">
//                   {errorMessage}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UpdateSubscription;
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import apiService from '../Services/apiService'; // Ensure the path is correct
import './UpdateSubscription.css'; // Import your CSS file for styling

const UpdateSubscription = () => {
  const { userId, appId, subscriptionId, subscriptionType } = useParams();
  const [subscriptionPlans, setSubscriptionPlans] = useState([]);
  const [selectedSubscription, setSelectedSubscription] = useState('');
  const [submittedSubscriptionId, setSubmittedSubscriptionId] = useState('');
  const [certificateUpdated, setCertificateUpdated] = useState(false);
  const [file, setFile] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchSubscriptionPlans = async () => {
      try {
        const data = await apiService.get('/subscriptionPlan');
        console.log('Fetched subscription plans:', data);
        setSubscriptionPlans(data);
      } catch (error) {
        console.error('Error fetching subscription plans:', error);
        setErrorMessage('Failed to fetch subscription plans. Please try again later.');
        setTimeout(() => {
          setErrorMessage('');
        }, 1000);
      }
    };

    if (subscriptionType.toLowerCase() === 'general') {
      fetchSubscriptionPlans();
    }
  }, [subscriptionType]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (subscriptionType.toLowerCase() === 'custom' && file && !certificateUpdated) {
      try {
        const certificateResponse = await apiService.putWithFile(`/updateCertificate/${subscriptionId}`, file, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        console.log('Certificate update response:', certificateResponse);
        
        const updatedSubscriptionId = extractSubscriptionIdFromResponse(certificateResponse);
        console.log('Updated subscription ID from certificate response:', updatedSubscriptionId);

        await apiService.put(`/userSubscriptionPlan/${userId}/${appId}/${updatedSubscriptionId}`);
        console.log('User subscription update response');
        setSubmittedSubscriptionId(updatedSubscriptionId);
        setCertificateUpdated(true);
        setSuccessMessage(`Subscription updated successfully with ID: ${updatedSubscriptionId}`);

        // Clear success message after 3 seconds
        setTimeout(() => {
          setSuccessMessage('');
        }, 1000);
      } catch (error) {
        console.error('Error updating certificate or user subscription:', error);
        setErrorMessage('Failed to update certificate or user subscription. Please try again.');
        setTimeout(() => {
          setErrorMessage('');
        }, 1000);
      }
    } else {
      try {
        await apiService.put(`/userSubscriptionPlan/${userId}/${appId}/${selectedSubscription}`);
        console.log('Update response');
        setSubmittedSubscriptionId(selectedSubscription);
        setSuccessMessage(`Subscription updated successfully with ID: ${selectedSubscription}`);

        // Clear success message after 3 seconds
        setTimeout(() => {
          setSuccessMessage('');
        }, 1000);
      } catch (error) {
        console.error('Error updating subscription:', error);
        setErrorMessage('Failed to update subscription. Please try again.');
        setTimeout(() => {
          setErrorMessage('');
        }, 1000);
      }
    }
  };

  const extractSubscriptionIdFromResponse = (responseText) => {
    const subscriptionIdMatch = responseText.match(/subscriptionId=(\d+)/);
    return subscriptionIdMatch ? subscriptionIdMatch[1] : '';
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <h2 style={{ color: "#5c5c9f" }} className="card-title text-center mb-4">Update Subscription</h2>
              <form onSubmit={handleSubmit} className="update-subscription-form">
                {subscriptionType.toLowerCase() === 'general' && (
                  <div className="form-group">
                    <label htmlFor="subscriptionPlan" className="select-label">Select Subscription Plan:</label>
                    <select
                      id="subscriptionPlan"
                      className="form-control subscription-select"
                      value={selectedSubscription}
                      onChange={(e) => setSelectedSubscription(e.target.value)}
                    >
                      <option value="">Select a plan</option>
                      {subscriptionPlans.map((plan) => (
                        <option key={plan.subscriptionId} value={plan.subscriptionId}>
                          {plan.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                {subscriptionType.toLowerCase() === 'custom' && !certificateUpdated && (
                  <div className="form-group">
                    <label htmlFor="file" className="file-label">Upload File:</label>
                    <input
                      type="file"
                      id="file"
                      className="form-control-file"
                      onChange={handleFileChange}
                    />
                  </div>
                )}
                <div className="form-group text-center">
                  <button type="submit" className="btn btn-primary submit-button">Submit</button>
                </div>
              </form>
              {successMessage && (
                <div className="alert alert-success mt-3" role="alert">
                  {successMessage}
                </div>
              )}
              {errorMessage && (
                <div className="alert alert-danger mt-3" role="alert">
                  {errorMessage}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateSubscription;

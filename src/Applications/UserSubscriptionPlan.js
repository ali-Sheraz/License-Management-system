// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate from React Router
// import { Table, Button, Container, Header } from 'semantic-ui-react'; // Import Semantic UI React components
// import './UserSubscriptionPlan.css'; // Import your CSS file for additional styling if needed

// const UserSubscriptionPlan = () => {
//   const [userSubscriptions, setUserSubscriptions] = useState([]);
//   const API_URL = 'https://localhost:9092/license-server/v1/userSubscriptionPlan'; // Replace with your actual API URL
//   const navigate = useNavigate(); // Initialize useNavigate for navigation

//   useEffect(() => {
//     const fetchUserSubscriptions = async () => {
//       try {
//         const response = await axios.get(API_URL);
//         setUserSubscriptions(response.data);
//       } catch (error) {
//         console.error('Error fetching user subscriptions:', error);
//       }
//     };

//     fetchUserSubscriptions();
//   }, []);

//   const handleUpdate = (userId, appId, subscriptionId, subscriptionType) => {
//     // Navigate to the update page with parameters
//     navigate(`/updateSubscription/${userId}/${appId}/${subscriptionId}/${subscriptionType}`);
//   };

//   return (
//     <Container className="user-subscription-container">
//       <Header as="h2" textAlign="center">User Subscription Plans</Header>
//       <Table celled striped>
//         <Table.Header>
//           <Table.Row>
//             <Table.HeaderCell>User Subscription ID</Table.HeaderCell>
//             <Table.HeaderCell>User ID</Table.HeaderCell>
//             <Table.HeaderCell>Username</Table.HeaderCell>
//             <Table.HeaderCell>Application ID</Table.HeaderCell>
//             <Table.HeaderCell>Application Name</Table.HeaderCell>
//             <Table.HeaderCell>Subscription ID</Table.HeaderCell>
//             <Table.HeaderCell>Subscription Plan</Table.HeaderCell>
//             <Table.HeaderCell>Subscription Type</Table.HeaderCell>
//             <Table.HeaderCell>Start Date</Table.HeaderCell>
//             <Table.HeaderCell>End Date</Table.HeaderCell>
//             <Table.HeaderCell>Actions</Table.HeaderCell>
//           </Table.Row>
//         </Table.Header>
//         <Table.Body>
//           {userSubscriptions.map((subscription) => (
//             <Table.Row key={subscription.userSubscriptionId}>
//               <Table.Cell>{subscription.userSubscriptionId}</Table.Cell>
//               <Table.Cell>{subscription.userTable.userId}</Table.Cell>
//               <Table.Cell>{subscription.userTable.username}</Table.Cell>
//               <Table.Cell>{subscription.application.appId}</Table.Cell>
//               <Table.Cell>{subscription.application.appName}</Table.Cell>
//               <Table.Cell>{subscription.subscriptionPlan.subscriptionId}</Table.Cell>
//               <Table.Cell>{subscription.subscriptionPlan.name}</Table.Cell>
//               <Table.Cell>{subscription.subscriptionPlan.subscriptionType}</Table.Cell>
//               <Table.Cell>{subscription.startDate}</Table.Cell>
//               <Table.Cell>{subscription.endDate}</Table.Cell>
//               <Table.Cell>
//                 <Button 
//                   primary
//                   onClick={() => handleUpdate(
//                     subscription.userTable.userId,
//                     subscription.application.appId,
//                     subscription.subscriptionPlan.subscriptionId,
//                     subscription.subscriptionPlan.subscriptionType
//                   )}
//                 >
//                   Update
//                 </Button>
//               </Table.Cell>
//             </Table.Row>
//           ))}
//         </Table.Body>
//       </Table>
//     </Container>
//   );
// };

// export default UserSubscriptionPlan;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from React Router
import apiService from '../Services/apiService'; // Adjust the path as necessary
import './UserSubscriptionPlan.css'; // Import your CSS file for styling

const UserSubscriptionPlan = () => {
  const [userSubscriptions, setUserSubscriptions] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate for navigation
   const API_URL='/userSubscriptionPlan'
  useEffect(() => {
    const fetchUserSubscriptions = async () => {
      try {
        const data = await apiService.get(API_URL);
        setUserSubscriptions(data);
        console.log("fetched: ",data)
      } catch (error) {
        console.error('Error fetching user subscriptions:', error);
      }
    };

    fetchUserSubscriptions();
  }, []);

  const handleUpdate = (userId, appId, subscriptionId, subscriptionType) => {
    // Navigate to the update page with parameters
    navigate(`/updateSubscription/${userId}/${appId}/${subscriptionId}/${subscriptionType}`);
  };

  const isExpired = (endDate) => {
    const today = new Date();
    return new Date(endDate) < today;
  };

  return (
    <div className="user-subscription-container">
      <h2 style={{ color: "rgb(52, 71, 103)" }}>User Subscription Plans</h2>
      <div className="table-container">
        <table className="user-subscription-table">
          <thead>
            <tr>
              <th>User Subscription ID</th>
              <th>User ID</th>
              <th>Username</th>
              <th>APP ID</th>
              <th>APP Name</th>
              <th>Subscription ID</th>
              <th>Subscription Plan</th>
              <th>Subscription Type</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {userSubscriptions.map((subscription) => (
              <tr key={subscription.userSubscriptionId}>
                <td>{subscription.userSubscriptionId}</td>
                <td>{subscription.userTable.userId}</td>
                <td>{subscription.userTable.username}</td>
                <td>{subscription.application.appId}</td>
                <td>{subscription.application.appName}</td>
                <td>{subscription.subscriptionPlan.subscriptionId}</td>
                <td>{subscription.subscriptionPlan.name}</td>
                <td>{subscription.subscriptionPlan.subscriptionType}</td>
                <td>{subscription.startDate}</td>
                <td className={isExpired(subscription.endDate) ? 'expired-end-date' : ''}>
                  {subscription.endDate}
                </td>
                <td>
                  <button
                    onClick={() => handleUpdate(
                      subscription.userTable.userId,
                      subscription.application.appId,
                      subscription.subscriptionPlan.subscriptionId,
                      subscription.subscriptionPlan.subscriptionType
                    )}
                  >
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

export default UserSubscriptionPlan;

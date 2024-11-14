// import React, { useEffect, useState } from 'react';
// import { CircularProgress, Container, Tooltip, Input } from '@mui/material';
// import { DataGrid } from '@mui/x-data-grid';
// import Skeleton from 'react-loading-skeleton';
// import apiService from '../Services/apiService'; // Adjust the import path as needed
// import './AllSessions.css';

// const AllSession = () => {
//   const [userSession, setUserSession] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showSuccessMsg, setShowSuccessMsg] = useState(false);
//   const [hoveredAppId, setHoveredAppId] = useState(null);
//   const [appDetails, setAppDetails] = useState(null);
//   const [searchDate, setSearchDate] = useState('');
//   const API_URL = '/userSession';

//   useEffect(() => {
//     fetchUserSessions();
//   }, []);

//   const fetchUserSessions = async () => {
//     try {
//       const response = await apiService.get(API_URL);
//       console.log('Fetched user sessions:', response);

//       const transformedSessions = response.map(session => ({
//         sessionId: session.sessionId,
//         userId: session.userTable?.userId || 'N/A',
//         appId: session.application?.appId || 'N/A',
//         subscriptionId: session.application?.subscriptionPlan?.subscriptionId || 'N/A',
//         startTime: session.startTime,
//         endTime: session.endTime,
//       }));
//       setTimeout(() => {
//         setUserSession(transformedSessions);
//         setLoading(false);
//         setShowSuccessMsg(true);
//         setTimeout(() => {
//           setShowSuccessMsg(false);
//         }, 3000);
//       }, 2000);
//     } catch (error) {
//       console.error('Error fetching sessions:', error);
//       setLoading(false);
//     }
//   };

//   const fetchAppDetails = async (appId) => {
//     try {
//       const response = await apiService.get(`/oneapplication/${appId}`);
//       console.log('Fetched application details:', response);
//       setAppDetails(response); // Set the application details in state
//     } catch (error) {
//       console.error('Error fetching application details:', error);
//       setAppDetails(null); // Clear details on error
//     }
//   };

//   const handleCellEnter = (appId) => {
//     setHoveredAppId(appId); // Set the hovered appId
//     fetchAppDetails(appId); // Fetch application details for the hovered appId
//   };

//   const handleCellLeave = () => {
//     setHoveredAppId(null); // Clear the hovered appId
//     setAppDetails(null); // Clear application details
//   };

//   const handleSearchDateChange = (event) => {
//     const { value } = event.target;
//     setSearchDate(value); // Update search date
//     filterSessions(value);
//   };

//   const filterSessions = async (searchDate) => {
//     setLoading(true); // Set loading state to true

//     if (!searchDate) {
//       // If searchDate is empty, fetch original user sessions
//       await fetchUserSessions();
//     } else {
//       // Filter sessions based on searchDate
//       const filteredSessions = userSession.filter(session => {
//         const sessionDate = new Date(session.startTime).toISOString().split('T')[0];
//         return sessionDate === searchDate;
//       });

//       setUserSession(filteredSessions);
//       setLoading(false); // Set loading state to false after setting filtered sessions
//     }
//   };


//   const columns = [
//     { field: 'sessionId', headerName: 'Session ID', width: 150 },
//     { field: 'userId', headerName: 'User ID', width: 150 },
//     {
//       field: 'appId',
//       headerName: 'Application ID',
//       width: 150,
//       renderCell: (params) => (
//         <Tooltip
//           title={
//             hoveredAppId === params.value && appDetails ? (
//               <div className="tooltip-content">
//                 <div><strong>Name:</strong> {appDetails.appName}</div>
//                 <div><strong>Description:</strong> {appDetails.description}</div>
//                 <div><strong>Max Users:</strong> {appDetails.maxUsers}</div>
//                 <div><strong>isActive:</strong> {appDetails.isActive}</div>
//                 {/* Add more fields as needed */}
//               </div>
//             ) : null
//           }
//           arrow
//           enterDelay={500} // Delay before showing tooltip
//           leaveDelay={200} // Delay before hiding tooltip
//         >
//           <div
//             className="tooltip-cell"
//             onMouseEnter={() => handleCellEnter(params.value)}
//             onMouseLeave={handleCellLeave}
//           >
//             {params.value}
//           </div>
//         </Tooltip>
//       ),
//     },
//     { field: 'subscriptionId', headerName: 'Subscription ID', width: 180 },
//     { field: 'startTime', headerName: 'Start Time', width: 200 },
//     { field: 'endTime', headerName: 'End Time', width: 200 },
//   ];

//   const renderSkeleton = () => {
//     const rows = [];
//     for (let i = 0; i < 5; i++) {
//       rows.push(
//         <div key={i} className="skeleton-row">
//           {columns.map((column, index) => (
//             <div key={index} className="skeleton-cell">
//               <Skeleton height={20} />
//             </div>
//           ))}
//         </div>
//       );
//     }
//     return rows;
//   };

//   return (
//     <>
//       {showSuccessMsg && (
//         <div className={`success-msg ${showSuccessMsg ? '' : 'hidden'}`}>
//           <span>&#10003;</span> Data retrieved successfully!
//         </div>
//       )}
//       <div className="css-sa3w6d">
//         <Container>
//           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//             <h2 style={{ color: "#5c5c9f" }}>Sessions</h2>
//             <Input
//               id="search-date"
//               type="date"
//               value={searchDate}
//               onChange={handleSearchDateChange}
//               inputProps={{ // Specify input props for customization
//                 style: { fontSize: 14 } // Adjust font size if needed
//               }}
//               InputLabelProps={{
//                 shrink: true,
//               }}
//             />
//           </div>
//           <div className="session-content">
//             <div className="data-grid-container" style={{ height: 400, width: '100%' }}>
//               {loading ? (
//                 <div className="skeleton-container">
//                   {renderSkeleton()}
//                 </div>
//               ) : (
//                 <DataGrid
//                   rows={userSession}
//                   columns={columns}
//                   pageSize={5}
//                   rowsPerPageOptions={[5, 10, 20]}
//                   pagination

//                   getRowId={(row) => `${row.sessionId}-${row.appId}`}
//                   classes={{
//                     columnHeaders: 'data-grid-header',
//                   }}
//                 />
//               )}
//             </div>
//           </div>
//         </Container>
//       </div>
//     </>
//   );
// };
//export default AllSession;


import React, { useEffect, useState } from 'react';
import { CircularProgress, Container, Tooltip } from '@mui/material';
import { Button, Form, Icon, Input, Message } from 'semantic-ui-react';
import { DataGrid } from '@mui/x-data-grid';
import Skeleton from 'react-loading-skeleton';
import apiService from '../Services/apiService'; // Adjust the import path as needed
import './AllSessions.css';

const AllSession = () => {
  const [userSession, setUserSession] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);
  const [hoveredAppId, setHoveredAppId] = useState(null);
  const [appDetails, setAppDetails] = useState(null);
  const [searchDate, setSearchDate] = useState('');
  const API_URL = '/userSession';

  useEffect(() => {
    fetchUserSessions();
  }, []);

  const fetchUserSessions = async () => {
    try {
      const response = await apiService.get(API_URL);
      console.log('Fetched user sessions:', response);

      const transformedSessions = response.map(session => ({
        sessionId: session.sessionId,
        userId: session.userTable?.userId || 'N/A',
        appId: session.application?.appId || 'N/A',
        subscriptionId: session.application?.subscriptionPlan?.subscriptionId || 'N/A',
        startTime: session.startTime,
        endTime: session.endTime,
      }));
      setTimeout(() => {
        setUserSession(transformedSessions);
        setLoading(false);
        setShowSuccessMsg(true);
        setTimeout(() => {
          setShowSuccessMsg(false);
        }, 3000);
      }, 2000);
    } catch (error) {
      console.error('Error fetching sessions:', error);
      setLoading(false);
    }
  };

  const fetchAppDetails = async (appId) => {
    try {
      const response = await apiService.get(`/oneapplication/${appId}`);
      console.log('Fetched application details:', response);
      setAppDetails(response); // Set the application details in state
    } catch (error) {
      console.error('Error fetching application details:', error);
      setAppDetails(null); // Clear details on error
    }
  };

  const handleCellEnter = (appId) => {
    setHoveredAppId(appId); // Set the hovered appId
    fetchAppDetails(appId); // Fetch application details for the hovered appId
  };

  const handleCellLeave = () => {
    setHoveredAppId(null); // Clear the hovered appId
    setAppDetails(null); // Clear application details
  };

  const handleSearchDateChange = (event) => {
    const { value } = event.target;
    setSearchDate(value); // Update search date
    filterSessions(value);
  };

  const filterSessions = async (searchDate) => {
    setLoading(true); // Set loading state to true

    if (!searchDate) {
      // If searchDate is empty, fetch original user sessions
      await fetchUserSessions();
    } else {
      // Filter sessions based on searchDate
      const filteredSessions = userSession.filter(session => {
        const sessionDate = new Date(session.startTime).toISOString().split('T')[0];
        return sessionDate === searchDate;
      });

      setUserSession(filteredSessions);
      setLoading(false); // Set loading state to false after setting filtered sessions
    }
  };


  const columns = [
    {
      field: 'sessionId', headerName: 'Session ID', width: 150,
      renderCell: (params) => (
        params.value ? (
          <div className="date-cell-color">{params.value}</div>
        ) : (
          <div>{params.value}</div>
        )
      )
    },
    {
      field: 'userId', headerName: 'User ID', width: 150,
      renderCell: (params) => (
        params.value ? (
          <div className="date-cell-color">{params.value}</div>
        ) : (
          <div>{params.value}</div>
        )
      )
    },
    {
      field: 'appId',
      headerName: 'Application ID',
      width: 150,
      renderCell: (params) => (
        <Tooltip
          title={
            hoveredAppId === params.value && appDetails ? (
              <div className="tooltip-content">
                <div><strong>Name:</strong> {appDetails.appName}</div>
                <div><strong>Description:</strong> {appDetails.description}</div>
                <div><strong>Max Users:</strong> {appDetails.maxUsers}</div>
                <div><strong>isActive:</strong> {appDetails.isActive}</div>
              </div>
            ) : null
          }
          arrow
          enterDelay={500} // Delay before showing tooltip
          leaveDelay={200} // Delay before hiding tooltip
        >
          <div
            className="tooltip-cell"
            onMouseEnter={() => handleCellEnter(params.value)}
            onMouseLeave={handleCellLeave}
          >
            {params.value}
          </div>
        </Tooltip>
      ),
    },
    
    { field: 'subscriptionId', headerName: 'Subscription ID', width: 180 },
    { field: 'startTime', headerName: 'Start Time', width: 200,
    renderCell: (params) => (
      params.value ? (
        <div className="date-cell-remain">{params.value}</div>
      ) : (
        <div>{params.value}</div>
      )
    ) },
    { field: 'endTime', headerName: 'End Time', width: 200 ,
    renderCell: (params) => (
      params.value ? (
        <div className="date-cell">{params.value}</div>
      ) : (
        <div>{params.value}</div>
      )
    )},
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
    <>
      {showSuccessMsg && (
        <div className={`success-msg ${showSuccessMsg ? '' : 'hidden'}`}>
          <span>&#10003;</span> Data retrieved successfully!
        </div>
      )}
      <div className="css-sa3w6d">
        <Container className='cont'>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ color: "rgb(52, 71, 103)",marginBlock:"revert" }}>Sessions</h2>
            <Input
              id="search-date"
              type="date"
              value={searchDate}
              onChange={handleSearchDateChange}
              inputProps={{ // Specify input props for customization
                style: { fontSize: 14 } // Adjust font size if needed
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          <div className="session-content">
            <div className="data-grid-container" style={{ height: '100%', width: '100%' }}>
              {loading ? (
                <div className="skeleton-container">
                  {renderSkeleton()}
                </div>
              ) : (
                <DataGrid
                  rows={userSession}
                  columns={columns}
                  pageSize={5}
                  rowsPerPageOptions={[5, 10, 20]}
                  pagination
                  autoHeight
                  getRowId={(row) => `${row.sessionId}-${row.appId}`}
                  classes={{
                    columnHeaders: 'data-grid-header',
                  }}
                />
              )}
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default AllSession;

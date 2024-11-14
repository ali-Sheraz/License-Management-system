// import React, { useEffect, useState } from 'react';
// import './Profile.css';
// import { GoogleMap, LoadScript, MarkerF } from '@react-google-maps/api';

// const Profile = () => {
//   const [user, setUser] = useState({
//     name: '',
//     email: '',
//     bio: '',
//     location: '',
//     profilePicture: ''
//   });
//   const [loading, setLoading] = useState(true);
//   const [map, setMap] = useState(null); // State for the Google Map instance
//   const [searchLocation, setSearchLocation] = useState(''); // State for the location search input
//   const [markerPosition, setMarkerPosition] = useState(null); // State for marker position

//   useEffect(() => {
//     // Fetch user data from local storage
//     const storedUser = JSON.parse(localStorage.getItem('user'));
//     if (storedUser) {
//       setTimeout(() => {
//         setUser(storedUser);
//         setLoading(false);
//       }, 3000); // Show skeleton for 3 seconds
//     } else {
//       setLoading(false);
//     }
//   }, []);

//   // Handle location search input change
//   const handleLocationChange = (e) => {
//     setSearchLocation(e.target.value);
//   };

//   // Handle location search form submit
//   const handleLocationSubmit = (e) => {
//     e.preventDefault();
//     // Use geocoding API or any other service to get coordinates for the searched location
//     // For simplicity, let's assume we have hardcoded coordinates here
//     const coordinates = { lat: 40.712776, lng: -74.005974 }; // Example coordinates (New York City)
//     setMarkerPosition(coordinates);
//     if (map) {
//       map.panTo(coordinates);
//       map.setZoom(12); // Adjust zoom level as needed
//     }
//   };

//   return (
//     <div className="profile-container">
//       <div className="profile-card">
//         <div className="profile-picture">
//           {loading ? (
//             <div className="skeleton skeleton-picture"></div>
//           ) : (
//             <img src={user.profilePicture || "https://i.pinimg.com/originals/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg"} alt="Profile" />
//           )}
//         </div>
//         <div className="profile-details">
//           {loading ? (
//             <>
//               <div className="skeleton skeleton-text skeleton-name"></div>
//               <div className="skeleton skeleton-text skeleton-email"></div>
//               <div className="skeleton skeleton-text skeleton-location"></div>
//               <div className="skeleton skeleton-text skeleton-bio"></div>
//             </>
//           ) : (
//             <>
//               <h2>{user.name || 'No Name Provided'}</h2>
//               <p className="profile-email">{user.email || 'No Email Provided'}</p>
//               <p className="profile-location">{user.location || 'No Location Provided'}</p>
//               <p className="profile-bio">{user.bio || 'No Bio Available'}</p>
//             </>
//           )}
//         </div>
//       </div>

    
//     </div>
//   );
// };

// export default Profile;
import React from 'react';
import { useStore } from './store'; // Import useStore from store.js
import './Profile.css';

const Profile = () => {
  const { count, increase, decrease } = useStore();
  return (
    <>
      <div className="cards-container">
        <div className="card">
          <div className="icon">💳</div>
          <h3>Payments</h3>
          <p>Total Payments: 10</p>
          <p>Payments in 7 Days: 4</p>
        </div>
        <div className="card">
          <div className="icon">👥</div>
          <h3>Customers</h3>
          <p>Total Customers: 0</p>
          <p>Customers in 7 Days: 0</p>
        </div>
        <div className="card">
          <div className="icon">💰</div>
          <h3>Balance</h3>
          <p>Available: £0.00</p>
          <p>Pending: £29.85</p>
        </div>
        <div className="card">
          <div className="icon">💸</div>
          <h3>Payouts</h3>
          <p>Total: £560.92</p>
          <p>Last 7 Days: £151.60</p>
        </div>
      </div>
      <div>
        <h1>{count}</h1>
        <button onClick={increase}>Increase</button>
        <button onClick={decrease}>Decrease</button>
      </div>
    </>
  );
};

export default Profile;

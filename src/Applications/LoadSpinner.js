// LoadSpinner.js
import React from 'react';
import { BeatLoader } from 'react-spinners';

const LoadSpinner = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh', // Use minHeight instead of height
      width: '100%', // Ensure full width
      position: 'fixed', // Fixed position to keep it centered
      top: 0, // Align to the top of the viewport
      left: 0, // Align to the left of the viewport
      backgroundColor: 'rgba(255, 255, 255, 0.9)', // Semi-transparent background
      zIndex: 9999, // Higher z-index to ensure it's above other content
    }}>
      <p style={{ marginTop: '10px', fontFamily: 'Arial, sans-serif', fontSize: '26px', color: '#0000FF' }}>Hold on tight...!</p>
      <BeatLoader color="#0253cc" loading={true} /> {/* Change color prop here */}
    </div>
  );
};

export default LoadSpinner;

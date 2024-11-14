// src/Applications/navbar/Layout.js

// import React from 'react';
// import { useLocation } from 'react-router-dom';
// import Navbar from './Navbar';
// import Footer from './Footer';
// import './Layout.css'; // CSS file for layout styling

// const Layout = ({ children }) => {
//   const location = useLocation();

//   // Check if current path is '/login', then hide the navbar
//   const shouldHideNavbar = location.pathname === '/login';

//   return (
//     <div className="layout">
//       {!shouldHideNavbar && <Navbar />}
//       <div className="content">
//         {children}
//       </div>
//       {!shouldHideNavbar && <Footer />}
//     </div>
//   );
// };

// export default Layout;

// src/Applications/navbar/Layout.js
import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { ThemeContext } from './ThemeContext'; // Import ThemeContext
import './Layout.css';
import logo from '../../assets/logo.jpeg'; // Adjust the path to your logo

const Layout = ({ children }) => {
  const location = useLocation();
  const { theme } = useContext(ThemeContext); // Use theme context

  const shouldHideNavbar = location.pathname === '/login';

  return (
    <div className={`layout ${theme}`}>
      {!shouldHideNavbar && (
        <>
          <div className="logo-container">
            <img src={logo} alt="Logo" className="logo" />
          </div>
          <Navbar />
        </>
      )}
      <div className="content">
        {children}
      </div>
      {!shouldHideNavbar && <Footer />}
    </div>
  );
};

export default Layout;

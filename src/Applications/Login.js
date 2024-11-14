// import React, { useState } from 'react';
// import './Login.css';
// import { useNavigate } from 'react-router-dom';
// import LoadSpinner from './LoadSpinner'; 

// const LOGIN_URL = 'https://localhost:9092/license-server/v1/login';
// const SIGNUP_URL = 'https://localhost:9092/license-server/v1/userTable';

// export default function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [username, setUsername] = useState('');
//   const [mode, setMode] = useState('login'); // 'login' or 'signup'
//   const [successMessage, setSuccessMessage] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');
//   const [showSignupSuccess, setShowSignupSuccess] = useState(false); // New state for showing signup success
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false); 

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true); // Start showing loading spinner
//     console.log('Email:', email);
//     console.log('Password:', password);
//     console.log('Username:', username);

//     let data;
//     if (mode === 'login') {
//       data = {
//         email: email,
//         password: password,
//       };
//     } else {
//       const currentDate = new Date().toISOString().split('T')[0]; // Format as YYYY-MM-DD
//       data = {
//         username: username,
//         email: email,
//         password: password,
//         updatedBy: 'Admin',
//         createdBy: 'Admin',
//         updatedOn: currentDate,
//         createdOn: currentDate,
//       };
//     }

//     const url = mode === 'login' ? LOGIN_URL : SIGNUP_URL;

//     try {
//       const response = await fetch(url, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data),
//       });

//       const result = await response.json();
//       console.log("response is: ", result);
//       if (response.ok) {
//         if (mode === 'login') {
//           setSuccessMessage('Login successful!');
//           localStorage.setItem('user', JSON.stringify(result));
//           setTimeout(() => {
//             setLoading(false); // Hide loading spinner
//             setSuccessMessage('');
//             setErrorMessage('');
//             navigate("/");
//           }, 1000);
//         } else {
//           setShowSignupSuccess(true); // Show signup success message and flip to login side
//           setTimeout(() => {
//             setShowSignupSuccess(false);
//             setLoading(false); // Hide loading spinner
//             setSuccessMessage('');
//             setErrorMessage('');
//             setMode('login'); // Automatically switch to login mode after signup
//           }, 1000);
//         }
//       } else {
//         setErrorMessage(result.message || (mode === 'login' ? 'Login failed' : 'Sign up failed'));
//         setTimeout(() => {
//             setLoading(false); // Hide loading spinner
//           setSuccessMessage('');
//           setErrorMessage('');
//         }, 1000);
//       }
//     } catch (error) {
//       setErrorMessage('An error occurred. Please try again later.');
//       setTimeout(() => {
//         setLoading(false); // Hide loading spinner
//         setSuccessMessage('');
//         setErrorMessage('');
//       }, 1000);
//     }
//   };

//   const toggleMode = () => {
//     setMode(mode === 'login' ? 'signup' : 'login');
//     setSuccessMessage('');
//     setErrorMessage('');
//   };

//   return (
//     <div className="add-login-container">
//       <div className={`flip-container ${mode}`}>
//         <div className={`flipper ${showSignupSuccess ? 'flipped' : ''}`}>
//           {/* Login Side */}
//           <div className="front">
//             <form className="application-form" onSubmit={handleSubmit}>
//               <h2 style={{ color: "#5c5c9f" }} className="login-title">Login</h2>
//               {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}
//               {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}
//               <div className="form-group">
//                 <label htmlFor="email">Email</label>
//                 <input
//                   type="email"
//                   id="email"
//                   className="form-control"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                 />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="password">Password</label>
//                 <input
//                   type="password"
//                   id="password"
//                   className="form-control"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                 />
//               </div>
//               <button type="submit" className="btn btn-primary">Login</button>
//               <p className={`toggle-mode ${mode === 'login' ? 'light' : ''}`} onClick={toggleMode}>
//                 {mode === 'login' ? "Don't have an account?" : 'Sign Up'}
//               </p>
//             </form>
//           </div>

//           {/* Signup Side */}
//           <div className="back">
//             <form className="application-form" onSubmit={handleSubmit}>
//               <h2 className="login-title">Sign Up</h2>
//               {showSignupSuccess && <div className="alert alert-success mt-3">Sign up successful!</div>}
//               {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}
//               <div className="form-group">
//                 <label htmlFor="signup-username">Username</label>
//                 <input
//                   type="text"
//                   id="signup-username"
//                   className="form-control"
//                   value={username}
//                   onChange={(e) => setUsername(e.target.value)}
//                   required
//                 />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="signup-email">Email</label>
//                 <input
//                   type="email"
//                   id="signup-email"
//                   className="form-control"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                 />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="signup-password">Password</label>
//                 <input
//                   type="password"
//                   id="signup-password"
//                   className="form-control"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                 />
//               </div>
//               <button type="submit" className="btn btn-primary">Sign Up</button>
//               <p className={`toggle-mode ${mode === 'login' ? 'light' : ''}`} onClick={toggleMode}>
//                 {mode === 'login' ? "Already have an account?" : 'Login'}
//               </p>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
// Login.js
// import React, { useState } from 'react';
// import './Login.css';
// import { useNavigate } from 'react-router-dom';
// import LoadSpinner from './LoadSpinner'; // Ensure the path is correct
// import logo from '../assets/logo.jpeg';
// const LOGIN_URL = 'https://localhost:9092/license-server/v1/login';
// const SIGNUP_URL = 'https://localhost:9092/license-server/v1/userTable';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [username, setUsername] = useState('');
//   const [mode, setMode] = useState('login');
//   const [successMessage, setSuccessMessage] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');
//   const [showSignupSuccess, setShowSignupSuccess] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
    
//     let data;
//     if (mode === 'login') {
//       data = { email, password };
//     } else {
//       const currentDate = new Date().toISOString().split('T')[0];
//       data = {
//         username,
//         email,
//         password,
//         updatedBy: 'Admin',
//         createdBy: 'Admin',
//         updatedOn: currentDate,
//         createdOn: currentDate,
//       };
//     }

//     const url = mode === 'login' ? LOGIN_URL : SIGNUP_URL;

//     try {
//       const response = await fetch(url, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(data),
//       });

//       const result = await response.json();
//       if (response.ok) {
//         if (mode === 'login') {
//           setSuccessMessage('Login successful!');
//           localStorage.setItem('user', JSON.stringify(result));
//           setTimeout(() => {
//             setLoading(false);
//             setSuccessMessage('');
//             setErrorMessage('');
//             navigate('/');
//           }, 7000);
//         } else {
//           setShowSignupSuccess(true);
//           setTimeout(() => {
//             setShowSignupSuccess(false);
//             setLoading(false);
//             setSuccessMessage('');
//             setErrorMessage('');
//             setMode('login');
//             navigate('/');
//           }, 3000);
//         }
//       } else {
//         setErrorMessage(result.message || (mode === 'login' ? 'Login failed' : 'Sign up failed'));
//         setTimeout(() => {
//           setLoading(false);
//           setSuccessMessage('');
//           // setErrorMessage('');
//         }, 3000);
//       }
//     } catch (error) {
//       setErrorMessage('An error occurred. Please try again later.');
//       setTimeout(() => {
//         setLoading(false);
//         setSuccessMessage('');
//         setErrorMessage('');
//       }, 3000);
//     }
//   };

//   const toggleMode = () => {
//     setMode(mode === 'login' ? 'signup' : 'login');
//     setSuccessMessage('');
//     setErrorMessage('');
//   };

//   return (
//     <>
//       {loading ? (
//         <LoadSpinner />
//       ) : (
//         <div className="add-login-container">

//           <div className={`flip-container ${mode}`}>
//           <img src={logo} alt="Logo" className="logo" />
//             <div className={`flipper ${showSignupSuccess ? 'flipped' : ''}`}>
  
//               <div className="front">
             
//                 <form className="application-form" onSubmit={handleSubmit}>
//                   <h2 className="login-title">Login</h2>
//                   {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}
//                   {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}
//                   <div className="form-group">
//                     <label htmlFor="email">Email</label>
//                     <input
//                       type="email"
//                       id="email"
//                       className="form-control"
//                       value={email}
//                       onChange={(e) => setEmail(e.target.value)}
//                       required
//                     />
//                   </div>
//                   <div className="form-group">
//                     <label htmlFor="password">Password</label>
//                     <input
//                       type="password"
//                       id="password"
//                       className="form-control"
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                       required
//                     />
//                   </div>
//                   <button type="submit" className="btn btn-primary">
//                     {mode === 'login' ? 'Login' : 'Sign Up'}
//                   </button>
//                   <p className="toggle-mode" onClick={toggleMode}>
//                     {mode === 'login' ? "Don't have an account?" : 'Login instead'}
//                   </p>
//                 </form>
//               </div>

//               <div className="back">
//                 <form className="application-form" onSubmit={handleSubmit}>
//                   <h2 className="login-title">Sign Up</h2>
//                   {showSignupSuccess && <div className="alert alert-success mt-3">Sign up successful!</div>}
//                   {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}
//                   <div className="form-group">
//                     <label htmlFor="signup-username">Username</label>
//                     <input
//                       type="text"
//                       id="signup-username"
//                       className="form-control"
//                       value={username}
//                       onChange={(e) => setUsername(e.target.value)}
//                       required
//                     />
//                   </div>
//                   <div className="form-group">
//                     <label htmlFor="signup-email">Email</label>
//                     <input
//                       type="email"
//                       id="signup-email"
//                       className="form-control"
//                       value={email}
//                       onChange={(e) => setEmail(e.target.value)}
//                       required
//                     />
//                   </div>
//                   <div className="form-group">
//                     <label htmlFor="signup-password">Password</label>
//                     <input
//                       type="password"
//                       id="signup-password"
//                       className="form-control"
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                       required
//                     />
//                   </div>
//                   <button type="submit" className="btn btn-primary">
//                     {mode === 'login' ? 'Login' : 'Sign Up'}
//                   </button>
//                   <p className="toggle-mode" onClick={toggleMode}>
//                     {mode === 'login' ? "Already have an account?" : 'Login instead'}
//                   </p>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Login;
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import apiService from '../Services/apiService'; // Ensure the path is correct
// import LoadSpinner from './LoadSpinner'; // Ensure the path is correct
// import logo from '../assets/logo.jpeg'; // Ensure the path is correct
// import './Login.css'; // Ensure the path is correct

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [username, setUsername] = useState('');
//   const [mode, setMode] = useState('login');
//   const [successMessage, setSuccessMessage] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');
//   const [showSignupSuccess, setShowSignupSuccess] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     let data;
//     if (mode === 'login') {
//       data = { email, password };
//     } else {
//       const currentDate = new Date().toISOString().split('T')[0];
//       data = {
//         username,
//         email,
//         password,
//         updatedBy: 'Admin',
//         createdBy: 'Admin',
//         updatedOn: currentDate,
//         createdOn: currentDate,
//       };
//     }

//     const url = mode === 'login' ? '/login' : '/userTable';

//     try {
//       const result = await apiService.post(url, data);
//       if (mode === 'login') {
//         setSuccessMessage('Login successful!');
//         localStorage.setItem('user', JSON.stringify(result));
//         setTimeout(() => {
//           setLoading(false);
//           setSuccessMessage('');
//           setErrorMessage('');
//           navigate('/');
//         }, 3000);
//       } else {
//         setShowSignupSuccess(true);
//         setTimeout(() => {
//           setShowSignupSuccess(false);
//           setLoading(false);
//           setSuccessMessage('');
//           setErrorMessage('');
//           setMode('login');
//           navigate('/');
//         }, 3000);
//       }
//     } catch (error) {
//       setErrorMessage(error.message || (mode === 'login' ? 'Login failed' : 'Sign up failed'));
//       setTimeout(() => {
//         setLoading(false);
//         setSuccessMessage('');
//       }, 3000);
//     }
//   };

//   const toggleMode = () => {
//     setMode(mode === 'login' ? 'signup' : 'login');
//     setSuccessMessage('');
//     setErrorMessage('');
//   };

//   return (
//     <>
//       {loading ? (
//         <LoadSpinner />
//       ) : (
//         <div className="add-login-container">
//           <div className={`flip-container ${mode}`}>
//             <img src={logo} alt="Logo" className="logo" />
//             <div className={`flipper ${showSignupSuccess ? 'flipped' : ''}`}>
//               {/* Login Side */}
//               <div className="front">
//                 <form className="application-form" onSubmit={handleSubmit}>
//                   <h2 className="login-title">Login</h2>
//                   {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}
//                   {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}
//                   <div className="form-group">
//                     <label htmlFor="email">Email</label>
//                     <input
//                       type="email"
//                       id="email"
//                       className="form-control"
//                       value={email}
//                       onChange={(e) => setEmail(e.target.value)}
//                       required
//                     />
//                   </div>
//                   <div className="form-group">
//                     <label htmlFor="password">Password</label>
//                     <input
//                       type="password"
//                       id="password"
//                       className="form-control"
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                       required
//                     />
//                   </div>
//                   <button type="submit" className="btn btn-primary">Login</button>
//                   <p className="toggle-mode" onClick={toggleMode}>
//                     {mode === 'login' ? "Don't have an account?" : 'Login instead'}
//                   </p>
//                 </form>
//               </div>

//               {/* Signup Side */}
//               <div className="back">
//                 <form className="application-form" onSubmit={handleSubmit}>
//                   <h2 className="login-title">Sign Up</h2>
//                   {showSignupSuccess && <div className="alert alert-success mt-3">Sign up successful!</div>}
//                   {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}
//                   <div className="form-group">
//                     <label htmlFor="signup-username">Username</label>
//                     <input
//                       type="text"
//                       id="signup-username"
//                       className="form-control"
//                       value={username}
//                       onChange={(e) => setUsername(e.target.value)}
//                       required
//                     />
//                   </div>
//                   <div className="form-group">
//                     <label htmlFor="signup-email">Email</label>
//                     <input
//                       type="email"
//                       id="signup-email"
//                       className="form-control"
//                       value={email}
//                       onChange={(e) => setEmail(e.target.value)}
//                       required
//                     />
//                   </div>
//                   <div className="form-group">
//                     <label htmlFor="signup-password">Password</label>
//                     <input
//                       type="password"
//                       id="signup-password"
//                       className="form-control"
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                       required
//                     />
//                   </div>
//                   <button type="submit" className="btn btn-primary">Sign Up</button>
//                   <p className="toggle-mode" onClick={toggleMode}>
//                     {mode === 'login' ? "Already have an account?" : 'Login instead'}
//                   </p>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Login;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Icon, Input, Message } from 'semantic-ui-react';
import apiService from '../Services/apiService'; // Ensure the path is correct
import LoadSpinner from './LoadSpinner'; // Ensure the path is correct
import logo from '../assets/logo.jpeg'; // Ensure the path is correct
import './Login.css'; // Ensure the path is correct

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [mode, setMode] = useState('login');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showSignupSuccess, setShowSignupSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let data;
    if (mode === 'login') {
      data = { email, password };
    } else {
      const currentDate = new Date().toISOString().split('T')[0];
      data = {
        username,
        email,
        password,
        updatedBy: 'Admin',
        createdBy: 'Admin',
        updatedOn: currentDate,
        createdOn: currentDate,
      };
    }

    const url = mode === 'login' ? '/login' : '/userTable';

    try {
      const result = await apiService.post(url, data);
      if (mode === 'login') {
        setSuccessMessage('Login successful!');
        localStorage.setItem('user', JSON.stringify(result));
        setTimeout(() => {
          setLoading(false);
          setSuccessMessage('');
          setErrorMessage('');
          navigate('/');
        }, 3000);
      } else {
        setShowSignupSuccess(true);
        setTimeout(() => {
          setShowSignupSuccess(false);
          setLoading(false);
          setSuccessMessage('');
          setErrorMessage('');
          setMode('login');
          navigate('/');
        }, 3000);
      }
    } catch (error) {
      setErrorMessage(error.message || (mode === 'login' ? 'Login failed' : 'Sign up failed'));
      setTimeout(() => {
        setLoading(false);
        setSuccessMessage('');
      }, 3000);
    }
  };

  const toggleMode = () => {
    setMode(mode === 'login' ? 'signup' : 'login');
    setSuccessMessage('');
    setErrorMessage('');
  };

  return (
    <>
      {loading ? (
        <LoadSpinner />
      ) : (
        <div className="add-login-container">
          <div className={`flip-container ${mode}`}>
            <img src={logo} alt="Logo" className="logo" />
            <div className={`flipper ${showSignupSuccess ? 'flipped' : ''}`}>
              {/* Login Side */}
              <div className="front">
                <Form className="application-form" onSubmit={handleSubmit}>
                  <h2 className="login-title">Login</h2>
                  {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}
                  {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}
                  <Form.Field>
                    <label htmlFor="email">Email</label>
                    <Input
                      id="email"
                      icon='user'
                      iconPosition='left'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </Form.Field>
                  <Form.Field>
                    <label htmlFor="password">Password</label>
                    <Input
                      type="password"
                      id="password"
                      icon='lock'
                      iconPosition='left'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </Form.Field>
                  <Button type="submit" primary>Login</Button>
                  <p className="toggle-mode" onClick={toggleMode}>
                    {mode === 'login' ? "Don't have an account?" : 'Login instead'}
                  </p>
                </Form>
              </div>

              {/* Signup Side */}
              <div className="back">
                <Form className="application-form" onSubmit={handleSubmit}>
                  <h2 className="login-title">Sign Up</h2>
                  {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}
                  {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}
                  <Form.Field>
                    <label htmlFor="signup-username">Username</label>
                    <Input
                      type="text"
                      id="signup-username"
                      icon='user'
                      iconPosition='left'
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </Form.Field>
                  <Form.Field>
                    <label htmlFor="signup-email">Email</label>
                    <Input
                      type="email"
                      id="signup-email"
                      icon='mail'
                      iconPosition='left'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </Form.Field>
                  <Form.Field>
                    <label htmlFor="signup-password">Password</label>
                    <Input
                      type="password"
                      id="signup-password"
                      icon='lock'
                      iconPosition='left'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </Form.Field>
                  <Button type="submit" primary>Sign Up</Button>
                  <p className="toggle-mode" onClick={toggleMode}>
                    {mode === 'login' ? "Already have an account?" : 'Login instead'}
                  </p>
                </Form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;

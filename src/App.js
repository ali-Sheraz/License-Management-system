import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddPatient from './HospitalManagement/AddPatient';
import User from './HospitalManagement/PatientList';
import SearchPatient from './HospitalManagement/SearchPatient';
import ViewPatientMoreDetails from './HospitalManagement/ViewPatientMoreDetails';
import UpdateRecord from './HospitalManagement/UpdateRecord';
import React from 'react';
import AddApplication from './Applications/AddApplication';

import UserSubscriptionPlan from './Applications/UserSubscriptionPlan';
import AddAllApplication from './Applications/AddAllApplication';
import UpdateSubscription from './Applications/UpdateSubscription';
import Layout from './Applications/navbar/Layout';
import UserLicense from './Applications/UserLicense';
import RegisteredApplications from './Applications/RegisteredApplications';
import UpdateApplication from './Applications/UpdateApplication';
import Login from './Applications/Login';
import AllSessions from './Applications/AllSessions';
import AddSubscriptionPlan from './Applications/AddSubscriptionPlan';
import GetPlans from './Applications/GetPlans';
import GetUsers from './Applications/GetUsers';
import UpdateUsers from './Applications/UpdateUsers';
import Profile from './Applications/Profile';
import LoadSpinner from './Applications/LoadSpinner';
import { ThemeProvider } from './Applications/navbar/ThemeContext'; // Import ThemeProvider


function App() {

  return (

    <ThemeProvider>

    <Router>
      <Layout>
              <Routes>
        {/* <Route exact path="/" element={<User />} /> */}
        
        {/* <Route exact path="/" element={<AddApplication />} /> */}
        <Route exact path="/" element={<AddAllApplication />} />
        <Route path="/usersubscriptionplan" element={<UserSubscriptionPlan />} />
        <Route path="/registeredapplication" element={<RegisteredApplications />} />
        <Route path="/updateSubscription/:userId/:appId/:subscriptionId/:subscriptionType" element={<UpdateSubscription />} />
        <Route path="/updateapplication/:appId" element={<UpdateApplication />} />
        <Route path="/userlicense" element={<UserLicense />} />
        <Route path="/login" element={<Login />} />
        
        <Route path="/getplans" element={<GetPlans />} />
        <Route path="/allsessions" element={<AllSessions />} />
        <Route path="/addsubscriptionplan" element={<AddSubscriptionPlan />} />
        <Route path="/getusers" element={<GetUsers />} />
        <Route path="/updateusers/:userId" element={<UpdateUsers />} />
        <Route path="/profile" element={<Profile />} />
        {/* <Route path="/loader" element={<LoadSpinner />} /> */}
        <Route path="/addpatient" element={<AddPatient />} />
        <Route path="/searchpatient" element={<SearchPatient />} />
        <Route path="/viewpatientdetail/:id" element={<ViewPatientMoreDetails />} />
        <Route path="/updaterecord/:id" element={<UpdateRecord />} />
    
       

      </Routes>
      </Layout>

    </Router>
    </ThemeProvider>
  );
}

export default App;


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddPatient from './HospitalManagement/AddPatient';
import User from './HospitalManagement/PatientList';
import SearchPatient from './HospitalManagement/SearchPatient';
import ViewPatientMoreDetails from './HospitalManagement/ViewPatientMoreDetails';
import UpdateRecord from './HospitalManagement/UpdateRecord';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<User />} />
        <Route path="/addpatient" element={<AddPatient />} />
        <Route path="/searchpatient" element={<SearchPatient />} />
        {/* Update the route to capture the 'id' parameter */}
        <Route path="/viewpatientdetail/:id" element={<ViewPatientMoreDetails />} />
        <Route path="/updaterecord/:id" element={<UpdateRecord />} />

      </Routes>
    </Router>
  );
}

export default App;

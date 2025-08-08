import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom'; // Import Routes and Route from react-router-dom
import Login from './pages/login.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AdminContext } from './context/AdminContext.jsx';
import Navbar from './components/Navbar.jsx';
import Slidebar from './components/Slidebar.jsx';
import AllAppointments from './pages/Admin/AllAppointments.jsx';
import AddDoctor from './pages/Admin/AddDoctor.jsx';
import DoctorsList from './pages/Admin/DoctorsList.jsx';
import Dashboard from './pages/Admin/Dashboard.jsx';
import { DoctorContext } from './context/DoctorContext.jsx';
import DoctorDashboard from './pages/Doctor/DoctorDashboard';
import DoctorAppointment from './pages/Doctor/DoctorAppointment';
import DoctorProfile from './pages/Doctor/DoctorProfile.jsx';

const App = () => {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);

  return aToken || dToken ? (
    <div className="bg-white">
      <ToastContainer />
      <Navbar />
      <div className="flex items-start">
        <Slidebar />
        {/* Correcting Routes setup */}
        <div className="flex-1 p-6"> {/* Main content area */}
          <Routes>
            {/* Admin Route*/}
            <Route path="/" element={<></>} />
            <Route path="/admin-dashboard" element={<Dashboard />} />
            <Route path="/all-appointments" element={<AllAppointments />} />
            <Route path="/add-doctor" element={<AddDoctor />} />
            <Route path="/doctor-list" element={<DoctorsList />} />

               {/* Doctor Route*/}
             <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
             <Route path="/doctor-appointments" element={<DoctorAppointment />} />
             <Route path="/doctor-profile" element={<DoctorProfile />} />
          </Routes>
        </div>
      </div>
    </div>
  ) : (
    <div>
      <Login />
      <ToastContainer />
    </div>
  );
};

export default App;

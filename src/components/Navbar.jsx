import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import assets from '../assets/assets';
import { AdminContext } from '../context/AdminContext';
import { DoctorContext } from '../context/DoctorContext';

const Navbar = () => {
  const { aToken, setAToken } = useContext(AdminContext); // Get token and setter from context
  const {dToken, setDToken} = useContext(DoctorContext)
  const navigate = useNavigate(); // Hook to navigate to other pages

  const handleLogout = () => {
     navigate('/');
    // Clear the token from context and localStorage/sessionStorage
    aToken && setAToken(''); // Clear token in context
    aToken && localStorage.removeItem('aToken'); // Remove token from localStorage
    aToken && sessionStorage.removeItem('aToken'); // Remove token from sessionStorage
    
   dToken && setDToken('');
   dToken && localStorage.removeItem('dToken');
   dToken && sessionStorage.removeItem('dToken');
   
  };

  return (
  <div className="flex justify-between items-center px-6 sm:px-10 py-4 border-b bg-white shadow-lg">
    {/* Logo and Text Section */}
    <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-5 text-xs sm:text-base">
      <img className="h-20 sm:h-24 w-auto cursor-pointer" src={assets.Hlogo} alt="Logo" />
      <div className="flex flex-col items-center sm:items-start gap-1">
        <p className="text-green-600 text-2xl sm:text-3xl font-bold tracking-wide">CarePoints</p>
        <p className="border px-3 py-2 rounded-full text-sm font-medium text-gray-600">{aToken ? 'Admin Dashboard' : 'Doctor Dashboard'}</p>
      </div>
    </div>
    {/* Logout Button */}
    <button
      onClick={handleLogout}
      className="bg-primary text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300"
    >
      Logout
    </button>
  </div>
);

};

export default Navbar;

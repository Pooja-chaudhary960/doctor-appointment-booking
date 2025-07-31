import axios from 'axios';
import { createContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
  const [aToken, setAToken] = useState("");
  const [doctors, setDoctors] = useState([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;  // Should be `http://localhost:4000`

  // Fetch all doctors from backend
  const getAllDoctors = async () => {
    try {
      console.log("Token:", aToken);  // Log token to ensure it's valid
      const url = `${backendUrl}/api/admin/all-doctors`;  // URL with correct path
      const { data } = await axios.post(url, {}, {
        headers: { Authorization: `Bearer ${aToken}` },
      });

      console.log("Response data:", data);  // Log the response from the server
      if (data.success) {
        setDoctors(data.doctors);  // Populate the doctors state
      } else {
        toast.error(data.message);  // Show error message if any
      }
    } catch (error) {
      toast.error("Error fetching doctors: " + error.message);  // Handle errors
      console.error("Error fetching doctors:", error);
    }
  };

  // Retrieve token from localStorage on initial load
  useEffect(() => {
    const token = localStorage.getItem("aToken");
    if (token) {
      setAToken(token);
    } else {
      console.log("No token found");
    }
  }, []);

  // Fetch doctors if token is available
  useEffect(() => {
    if (aToken) {
      getAllDoctors();
    }
  }, [aToken]);

  // Changed availability function
 const changedAvailability = async (docId) => {
  try {
    // Check if docId is correctly passed before sending the request
    console.log("docId being sent:", docId);

    const { data } = await axios.post(`${backendUrl}/api/admin/change-availability`, 
      { docId },  // Ensure docId is being passed correctly
      {
        headers: {
          Authorization: `Bearer ${aToken}`  // Make sure the token is being sent correctly
        }
      }
    );

    if (data.success) {
      toast.success(data.message);
      getAllDoctors();  // Re-fetch doctors after successful update
    } else {
      toast.error(data.message);  // Show error message from backend
    }
  } catch (error) {
    toast.error("Error changing availability: " + error.message);
    console.error("Error:", error);
  }
};

  // Provide context to children components
  const value = {
    aToken,
    setAToken,
    backendUrl,
    doctors,
    getAllDoctors,
    changedAvailability,
  };

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;

import { useState, createContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [dToken, setDToken] = useState(localStorage.getItem("dToken") || "");
  const [appointments, setAppointments] = useState([]);
  const [dashData, setDashData] = useState(null);  // Use null to signify no data
  const [profileData, setProfileData] = useState(null);  // Same for profileData

  // Check token validity when the component mounts
  useEffect(() => {
    if (!dToken) {
      toast.error("No token found. Please log in again.");
    }
  }, [dToken]);

  // Fetch appointments
  const getAppointments = async () => {
    if (!dToken) {
      toast.error("No token found. Please log in again.");
      return;
    }

    console.log("Token being sent:", dToken);  // Log the token to check if it's being set

    try {
      const response = await axios.get(`${backendUrl}/api/doctor/appointments`, {
        headers: { Authorization: `Bearer ${dToken}` },
      });
      console.log('Response:', response); // Log the response from the server
      if (response.data.success) {
        setAppointments(response.data.appointments);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Axios Error:', error);  // Log error
      toast.error("Error fetching appointments: " + error.message);
    }
  };

  // Complete an appointment
  const completeAppointments = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/doctor/complete-appointment`,
        { appointmentId },
        { headers: { Authorization: `Bearer ${dToken}` } }
      );
      if (data.success) {
        toast.success(data.message);
        getAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error completing appointment: " + error.message);
    }
  };

  // Cancel an appointment
  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/doctor/cancel-appointment`,
        { appointmentId },
        { headers: { Authorization: `Bearer ${dToken}` } }
      );
      if (data.success) {
        toast.success(data.message);
        getAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error canceling appointment: " + error.message);
    }
  };

  useEffect(() => {
  console.log("Token in useEffect:", dToken);
  if (dToken) {
    getDashData();  // Only fetch if token exists
  }
}, [dToken]);  // Re-run whenever dToken changes

  // Fetch dashboard data
const getDashData = async () => {
  try {
    const { data } = await axios.get(`${backendUrl}/api/doctor/dashboard`, {
      headers: { Authorization: `Bearer ${dToken}` }, // Using dToken for Authorization
    });
    console.log("Dashboard Data:", data); // Log the data to ensure it's being fetched
    if (data.success) {
      setDashData(data.dashData); // Set the data in state if successful
    } else {
      toast.error(data.message); // Show error if the response is unsuccessful
    }
  } catch (error) {
    toast.error("Error fetching dashboard data: " + error.message); // Handle any errors
    console.error("Error fetching dashboard data:", error);
  }
};


  // Fetch profile data
  const getProfileData = async () => {
  if (!dToken) {
    toast.error("No token found. Please log in.");
    return;
  }

  try {
    const response = await axios.get(`${backendUrl}/api/doctor/profile`, {
      headers: { Authorization: `Bearer ${dToken}` },
    });

    const { data } = response;
    if (data.success) {
      setProfileData(data.profileData);
    } else {
      toast.error(data.message);
      setProfileData(null);
    }
  } catch (error) {
    console.error("Profile Fetch Error:", error.response ? error.response.data : error.message);
    toast.error("Error fetching profile data: " + (error.response ? error.response.data.message : error.message));
    setProfileData(null); // Reset profileData on error
  }
};

  const value = {
    dToken,
    setDToken,
    backendUrl,
    appointments,
    setAppointments,
    getAppointments,
    completeAppointments,
    cancelAppointment,
    dashData,
    setDashData,
    getDashData,
    profileData,
    setProfileData,
    getProfileData,
  };

  return (
    <DoctorContext.Provider value={value}>
      {props.children}
    </DoctorContext.Provider>
  );
};

export default DoctorContextProvider;

import axios from "axios";
import { AppContext } from "../context/AppContext";
import { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import {useNavigate} from 'react-router-dom'


const MyAppointments = () => {
  const { backendUrl, token, userData, getDoctorsData } =
    useContext(AppContext); // Removed docId since it's not needed here
  const [appointments, setAppointments] = useState([]);
  const months = [
    "",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split("_");
    return (
      dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
    );
  };

  const navigate = useNavigate()

  // Function to get user appointments
  const getUserAppointments = async () => {
    try {
      // Making sure token is available
      if (!token) {
        toast.warn("Please log in to view your appointments");
        return;
      }

      const { data } = await axios.get(`${backendUrl}/api/user/appointments`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.success) {
        setAppointments(data.appointments.reverse()); // Reverse to show the latest first
      } else {
        toast.error("No appointments found or failed to fetch appointments.");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/cancel-appointment`,
        { appointmentId },
        {
          headers: { Authorization: `Bearer ${token}` }, // Make sure token is passed for authorization
        }
      );

      if (data.success) {
        toast.success(data.message);
        getUserAppointments(); // Refresh the list of appointments after cancellation
        getDoctorsData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const initiatePayment = async (appointmentId, amount) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/initiate-payment`, // Backend route for initiating Khatli payment
        { appointmentId, amount },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        // Redirect the user to the Khatli payment page
        window.location.href = data.paymentUrl;
      } else {
        toast.error("Failed to initiate payment");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error initiating payment");
    }
  };

  // Fetch appointments when the component mounts
  useEffect(() => {
    if (token && userData) {
      getUserAppointments();
    }
  }, [token, userData]);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <p className="text-xl font-semibold mb-6 mt-0 md:mt-6">My Appointments</p>

      <div className="space-y-6">
        {appointments.length === 0 ? (
          <p>No appointments found.</p>
        ) : (
          appointments.slice(0, 2).map((item) => (
            <div
              key={item._id}
              className="flex flex-col md:flex-row items-start gap-6 bg-white p-5 rounded-xl shadow-md"
            >
              {/* Doctor Image */}
              <div className="w-32 h-32">
                <img
                  src={item.docData.image}
                  alt={item.docData.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>

              {/* Doctor Info */}
              <div className="flex-1">
                <p className="text-lg font-bold">{item.docData.name}</p>
                <p className="text-sm text-gray-600">
                  {item.docData.speciality}
                </p>
                <p className="text-sm font-medium mt-2">Address:</p>
                <p className="text-sm text-gray-700">{item.docData.address}</p>
                <p className="text-sm text-gray-800 mt-2">
                  <span className="font-semibold">Date & Time:</span>{" "}
                  {slotDateFormat(item.slotDate)} | {item.slotTime}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3 mt-4 md:mt-0">
                {!item.cancelled && !item.payment && (
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
                    onClick={() => initiatePayment(item._id, item.amount)} // Trigger the initiatePayment function
                  >
                    Pay Online
                  </button>
                )}

                {!item.cancelled && (
                  <button
                    onClick={() => cancelAppointment(item._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                  >
                    Cancel Appointment{" "}
                  </button>
                )}
                {item.cancelled && (
                  <button className="sm:min-w-48 py-2 border border-red-500 rounded text-red-500">
                    Appointment cancelled
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyAppointments;

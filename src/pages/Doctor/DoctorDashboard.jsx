import React, { useEffect, useContext } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import assets from "../../assets/assets";

const DoctorDashboard = () => {
  const {
    dToken,
    dashData,
    getDashData,
    completeAppointment,
    cancelAppointment,
  } = useContext(DoctorContext);
  const { currency, slotDateFormat } = useContext(AppContext);

  // Fetch dashboard data once dToken is available
  useEffect(() => {
    console.log("dToken inside useEffect:", dToken); // Log to verify token
    if (dToken) {
      getDashData(); // Fetch data when the token is available
    }
  }, [dToken, getDashData]);

  // Log the data to check if it's being set correctly
  console.log("dashData:", dashData);

  // Check if dashData is not null or undefined
  if (!dashData || Object.keys(dashData).length === 0) {
    return <div>Loading...</div>; // Show loading if data is not available
  }

  return (
    <div className="m-5">
      <div className="flex flex-wrap gap-3">
        {/* Earnings */}
        <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-gray-100 cursor-pointer hover:scale-105 transition-all">
          <img className="w-14" src={assets.earning_icon} alt="" />
          <div>
            <p className="text-xl font-semibold text-gray-400">
              {currency} {dashData.earnings}
            </p>
            <p className="text-gray-400">Earnings</p>
          </div>
        </div>

        {/* Appointments */}
        <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-gray-100 cursor-pointer hover:scale-105 transition-all">
          <img className="w-14" src={assets.appointments_icon} alt="" />
          <div>
            <p className="text-xl font-semibold text-gray-400">
              {dashData.appointments}
            </p>
            <p className="text-gray-400">Appointments</p>
          </div>
        </div>

        {/* Patients */}
        <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-gray-100 cursor-pointer hover:scale-105 transition-all">
          <img className="text-xl font-semibold text-gray-400" src={assets.patients_icon} alt="" />
          <div>
            <p>{dashData.patients}</p>
            <p className="text-gray-400">Patients</p>
          </div>
        </div>
      </div>

      {/* Latest Bookings */}
      <div className="bg-white">
        <div className="flex items-center gap-2 px-4 py-4 mt-10 rounded-t border">
          <img src={assets.list_icon} alt="" />
          <p className="font-semibold">Latest Booking</p>
        </div>
        <div className="pt-4 border border-t-0">
          {dashData.latestAppointments.map((item, index) => (
            <div
              className="flex item-center px-6 py-3 gap-3 hover:bg-gray-100"
              key={index}
            >
              <img className="rounded-full w-10" src={item.userData.image} alt="" />
              <div className="flex-1 text-sm">
                <p className="text-gray-800 font-medium">{item.userData.name}</p>
                <p className="text-gray-600">{slotDateFormat(item.slotDate)}</p>
              </div>
              {item.cancelled ? (
                <p className="text-red-400 text-xs font-medium">Cancelled</p>
              ) : item.isCompleted ? (
                <p className="text-green-500 text-xs font-medium">Completed</p>
              ) : (
                <div className="flex">
                  <img
                    onClick={() => cancelAppointment(item._id)}
                    className="w-10 cursor-pointer"
                    src={assets.cancel_icon}
                    alt=""
                  />
                  <img
                    onClick={() => completeAppointment(item._id)}
                    className="w-10 cursor-pointer"
                    src={assets.tick_icon}
                    alt=""
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;

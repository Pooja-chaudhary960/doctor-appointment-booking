import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const MyAppointments = () => {
  const { doctors } = useContext(AppContext);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <p className="text-xl font-semibold mb-6 mt-0 md:mt-6">My Appointments</p>

      <div className="space-y-6">
        {doctors.slice(0, 2).map((item, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row items-start gap-6 bg-white p-5 rounded-xl shadow-md"
          >
            {/* Doctor Image */}
            <div className="w-32 h-32">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>

            {/* Doctor Info */}
            <div className="flex-1">
              <p className="text-lg font-bold">{item.name}</p>
              <p className="text-sm text-gray-600">{item.speciality}</p>
              <p className="text-sm font-medium mt-2">Address:</p>
              <p className="text-sm text-gray-700">{item.address}</p>
              <p className="text-sm text-gray-800 mt-2">
                <span className="font-semibold">Date & Time:</span> 15 July 2025 | 8:30 PM
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3 mt-4 md:mt-0">
              <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition">
                Pay Online
              </button>
              <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition">
                Cancel Appointment
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointments; 
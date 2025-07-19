import { useState } from 'react';

const MyProfile = () => {
  const [userData, setUserData] = useState({
    name: "Rahul Chaudhary",
    image: "/Images/profile.png",
    email: "rahul32@gmail.com",
    phone: "9822547689",
    address: "Baneshwor",
    gender: "Male",
    dob: "1999-06-16"
  });

  const [isEdit, setIsEdit] = useState(true);

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-2xl">
      <div className="flex flex-col items-center">
        <img
          src={userData.image}
          alt="userProfile"
          className="w-32 h-32 rounded-full border-4 border-green-500 object-cover"
        />

        {/* Name */}
        <div className="mt-4 w-full text-center">
          {isEdit ? (
            <input
              type="text"
              value={userData.name}
              onChange={e => setUserData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          ) : (
            <h2 className="text-xl font-semibold">{userData.name}</h2>
          )}
        </div>
      </div>

      <hr className="my-6" />

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-green-600">Contact Information</h3>

        <div>
          <p className="font-medium">Email ID:</p>
          <p   className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400">{userData.email}</p>
        </div>

        <div>
          <p className="font-medium">Phone:</p>
          {isEdit ? (
            <input
              type="text"
              value={userData.phone}
              onChange={e => setUserData(prev => ({ ...prev, phone: e.target.value }))}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          ) : (
            <p>{userData.phone}</p>
          )}
        </div>

        <div>
          <p className="font-medium">Address:</p>
          {isEdit ? (
            <input
              type="text"
              value={userData.address}
              onChange={e => setUserData(prev => ({ ...prev, address: e.target.value }))}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          ) : (
            <p>{userData.address}</p>
          )}
        </div>
      </div>

      <div className="mt-6 space-y-4">
        <h3 className="text-lg font-semibold text-green-600">Basic Information</h3>

        <div>
          <p className="font-medium">Gender:</p>
          {isEdit ? (
            <select
              value={userData.gender}
              onChange={e => setUserData(prev => ({ ...prev, gender: e.target.value }))}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          ) : (
            <p>{userData.gender}</p>
          )}
        </div>

        <div>
          <p className="font-medium">Date of Birth:</p>
          {isEdit ? (
            <input
              type="date"
              value={userData.dob}
              onChange={e => setUserData(prev => ({ ...prev, dob: e.target.value }))}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          ) : (
            <p>{userData.dob}</p>
          )}
        </div>
      </div>

      <div className="mt-6 text-center">
        {isEdit ? (
          <button
            onClick={() => setIsEdit(false)}
            className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
          >
            Save Information
          </button>
        ) : (
          <button
            onClick={() => setIsEdit(true)}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default MyProfile;

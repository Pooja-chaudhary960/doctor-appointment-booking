import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import assets from "../assets/assets.js";
import axios from "axios";

const MyProfile = () => {
  const { userData, setUserData, token, backendUrl, loadUserProfileData } =
    useContext(AppContext);

  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(null);

  // Update user profile data (backend call)
  const updateUserProfileData = async () => {
    const formData = new FormData();
    formData.append("name", userData.name);
    formData.append("phone", userData.phone);
    formData.append("address", userData.address);
    formData.append("dob", userData.dob);
    formData.append("gender", userData.gender);

    // Append the image if selected
    if (image) {
      formData.append("image", image); // Image is added only if selected
    }
  console.log("Sending FormData:", formData);
    try {
      const response = await axios.put(
        `${backendUrl}/api/user/update-profile`, // Use the backend URL dynamically
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        setUserData(response.data.userData); // Update context data after successful update
        loadUserProfileData(); // Optionally refresh the user data
        setIsEdit(false); // Exit edit mode after saving
      } else {
        console.error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    userData && (
      <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-2xl">
        <div className="flex flex-col items-center">
          {/* Image Upload */}
          {isEdit ? (
            <label htmlFor="image">
              <div className="inline-block relative cursor-pointer">
                <img
                  className="w-36 rounded opacity-75"
                  src={image ? URL.createObjectURL(image) : userData.image || null}
                  alt="Profile"
                />
                <img
                  className="w-10 absolute bottom-12 right-12"
                  src={image ? null : assets.upload_icon}
                  alt="upload icon"
                />
              </div>
              <input
                onChange={(e) => setImage(e.target.files[0])} // Set image on selection
                type="file"
                id="image"
                hidden
              />
            </label>
          ) : (
            <img
              src={userData.image}
              alt="userProfile"
              className="w-32 h-32 rounded-full border-4 border-green-500 object-cover"
            />
          )}

          {/* Name */}
          <div className="mt-4 w-full text-center">
            {isEdit ? (
              <input
                type="text"
                value={userData.name}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, name: e.target.value }))
                }
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            ) : (
              <h2 className="text-xl font-semibold">{userData.name}</h2>
            )}
          </div>
        </div>

        <hr className="my-6" />

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-green-600">
            Contact Information
          </h3>

          <div>
            <p className="font-medium">Email ID:</p>
            <p className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400">
              {userData.email}
            </p>
          </div>

          {/* Phone */}
          <div>
            <p className="font-medium">Phone:</p>
            {isEdit ? (
              <input
                type="text"
                value={userData.phone}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, phone: e.target.value }))
                }
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            ) : (
              <p>{userData.phone}</p>
            )}
          </div>

          {/* Address */}
          <div>
            <p className="font-medium">Address:</p>
            {isEdit ? (
              <input
                type="text"
                value={userData.address}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, address: e.target.value }))
                }
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            ) : (
              <p>{userData.address}</p>
            )}
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <h3 className="text-lg font-semibold text-green-600">
            Basic Information
          </h3>

          {/* Gender */}
          <div>
            <p className="font-medium">Gender:</p>
            {isEdit ? (
              <select
                value={userData.gender}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, gender: e.target.value }))
                }
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            ) : (
              <p>{userData.gender}</p>
            )}
          </div>

          {/* Date of Birth */}
          <div>
            <p className="font-medium">Date of Birth:</p>
            {isEdit ? (
              <input
                type="date"
                value={userData.dob ? userData.dob.split("T")[0] : ""} // Ensure it's in yyyy-mm-dd format
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, dob: e.target.value }))
                } // Update dob correctly
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            ) : (
              <p>{userData.dob}</p>
            )}
          </div>
        </div>

        {/* Save/Cancel Edit */}
        <div className="mt-6 text-center">
          {isEdit ? (
            <button
              onClick={updateUserProfileData} // Call the update function
              className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
            >
              Save Information
            </button>
          ) : (
            <button
              onClick={() => setIsEdit(true)} // Switch to edit mode
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              Edit
            </button>
          )}
        </div>
      </div>
    )
  );
};

export default MyProfile;

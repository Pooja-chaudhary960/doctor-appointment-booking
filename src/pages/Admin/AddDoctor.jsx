import React, { useState, useContext } from "react";
import assets from "../../assets/assets";
import { AdminContext } from "../../context/AdminContext";
import { toast } from 'react-toastify';
import axios from 'axios';

const AddDoctor = () => {

  const [docImg, setDocImg] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [experience, setExperience] = useState('1 year');
  const [fees, setFees] = useState('');
  const [about, setAbout] = useState('');
  const [speciality, setSpeciality] = useState('General physician');
  const [degree, setDegree] = useState('');
  const [address, setAddress] = useState('');

  const { backendUrl, aToken } = useContext(AdminContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (!docImg) {
        return toast.error('Image is not selected');
      }

      const formData = new FormData();
      formData.append('image', docImg);
      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('experience', experience);
      formData.append('fees', Number(fees));
      formData.append('about', about);
      formData.append('speciality', speciality);
      formData.append('degree', degree);
      formData.append('address', address);

      // console log formData
      formData.forEach((value, key) => {
        console.log(`${key} : ${value}`);
      });

      // Make API call to the backend to save the doctor's details
      const { data } = await axios.post(backendUrl + '/api/admin/add-doctor', formData, {
        headers: {
          Authorization: `Bearer ${aToken}`
        }
      });

      if (data.success) {
        toast.success(data.message)
        setDocImg(false)
        setName('')
        setPassword('')
        setEmail('')
        setAddress('')
        setDegree('')
        setAbout('')
        setFees('')
        
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('An error occurred while adding the doctor.');
      console.log(error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg space-y-6">
      {/* Add Doctor Heading */}
      <div className="text-center sm:text-left">
        <h2 className="text-3xl font-semibold text-gray-800">Add Doctor</h2>
      </div>

      <form onSubmit={onSubmitHandler} className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col items-center sm:items-start">
            <label htmlFor="doc-img" className="cursor-pointer">
              <img
                src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
                alt="Upload Area"
                className="w-24 h-24 object-cover rounded-full border-2 border-gray-300 p-2"
              />
            </label>
            <input onChange={(e) => setDocImg(e.target.files[0])} type="file" id="doc-img" hidden />
            <p className="text-sm text-gray-500 text-center mt-2">
              Upload Doctor Picture
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-6 sm:flex-row">
          {/* Left Side */}
          <div className="flex flex-col sm:w-1/2 gap-6">
            <div>
              <label htmlFor="name" className="block text-gray-700 font-medium">
                Doctor Name
              </label>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                id="name"
                name="name"
                placeholder="Enter Name"
                required
                className="mt-1 p-3 w-full border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label htmlFor="doctor-email" className="block text-gray-700 font-medium">
                Doctor Email
              </label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                id="doctor-email"
                name="doctor-email"
                placeholder="Enter Email"
                required
                className="mt-1 p-3 w-full border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label htmlFor="doctor-password" className="block text-gray-700 font-medium">
                Doctor Password
              </label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                id="doctor-password"
                name="doctor-password"
                placeholder="Enter Password"
                required
                className="mt-1 p-3 w-full border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label htmlFor="experience" className="block text-gray-700 font-medium">
                Experience
              </label>
              <select
                onChange={(e) => setExperience(e.target.value)}
                value={experience}
                name="experience"
                id="experience"
                className="mt-1 p-3 w-full border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="1 year">1 year</option>
                <option value="2 year">2 year</option>
                <option value="3 year">3 year</option>
                <option value="4 year">4 year</option>
                <option value="5 year">5 year</option>
                <option value="6 year">6 year</option>
                <option value="7 year">7 year</option>
                <option value="8 year">8 year</option>
              </select>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex flex-col sm:w-1/2 gap-6">
            <div>
              <label htmlFor="doctor-fee" className="block text-gray-700 font-medium">
                Fees
              </label>
              <input
                onChange={(e) => setFees(e.target.value)}
                value={fees}
                type="number"
                id="doctor-fee"
                name="doctor-fee"
                placeholder="Fees"
                required
                className="mt-1 p-3 w-full border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label htmlFor="speciality" className="block text-gray-700 font-medium">
                Speciality
              </label>
              <select
                onChange={(e) => setSpeciality(e.target.value)}
                value={speciality}
                name="speciality"
                id="speciality"
                className="mt-1 p-3 w-full border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="General physician">General Physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Neurologist">Neurologist</option>
              </select>
            </div>

            <div>
              <label htmlFor="doctor-education" className="block text-gray-700 font-medium">
                Education
              </label>
              <input
                onChange={(e) => setDegree(e.target.value)}
                value={degree}
                type="text"
                id="doctor-education"
                name="doctor-education"
                placeholder="Education"
                required
                className="mt-1 p-3 w-full border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label htmlFor="doctor-address" className="block text-gray-700 font-medium">
                Address
              </label>
              <input
                onChange={(e) => setAddress(e.target.value)}
                value={address}
                type="text"
                id="doctor-address"
                name="doctor-address"
                placeholder="Address"
                required
                className="mt-1 p-3 w-full border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="about-doctor" className="block text-gray-700 font-medium">
            About Doctor
          </label>
          <textarea
            onChange={(e) => setAbout(e.target.value)}
            value={about}
            id="about-doctor"
            name="about-doctor"
            placeholder="Write about the doctor"
            rows={5}
            required
            className="mt-1 p-3 w-full border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          ></textarea>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-primary text-white py-2 px-6 rounded-lg hover:bg-green-600 transition duration-300"
          >
            Add Doctor
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddDoctor;

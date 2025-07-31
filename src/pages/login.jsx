import React, { useState, useContext } from 'react';
import assets from '../assets/assets.js';
import { AdminContext } from '../context/AdminContext.jsx';
import { toast } from 'react-toastify';
import axios from 'axios';

const Login = () => {
    const [state, setState] = useState('Admin');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { setAToken, backendUrl } = useContext(AdminContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
        // Adjust the API endpoint for Admin login and Doctor login based on state
        let url = backendUrl + '/api/admin/login'; // Default to Admin login
        if (state === 'Doctor') {
            url = backendUrl + '/api/doctor/login'; // Use Doctor login URL if state is 'Doctor'
        }

        // Log the URL and the data being sent for debugging
        console.log('Sending request to:', url);
        console.log('Request Data:', { email, password });

        const { data } = await axios.post(url, { email, password });

        // Log the API response for debugging
        console.log('API Response:', data);

        if (data.success) {
            // Save token in localStorage and update context
            localStorage.setItem('aToken', data.token);
            setAToken(data.token); // Assuming you are using context to store the token globally
            toast.success('Login successful!');
        } else {
            toast.error(data.message || 'Login failed');
        }
    } catch (error) {
        console.error('Login error:', error);
        toast.error('An error occurred during login');
    }
};

    return (
        <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center">
            <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-gray-600 text-sm shadow-lg">
                <p className="text-2xl font-semibold m-auto">
                    <span className="text-primary">{state}</span> Login
                </p>
                <div className="w-full">
                    <label htmlFor="email">Email</label>
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        className="border rounded-md w-full p-2 mt-1"
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Enter email"
                        required
                    />
                </div>
                <div className="w-full">
                    <label htmlFor="password">Password</label>
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        className="border rounded-md w-full p-2 mt-1"
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Enter Password"
                        required
                    />
                </div>
                <button className="bg-primary text-white w-full py-2 rounded-md text-base" type="submit">
                    Login
                </button>
                {state === 'Admin' ? (
                    <p>
                        Doctor Login?{' '}
                        <span className="text-primary underline cursor-pointer" onClick={() => setState('Doctor')}>
                            Click here
                        </span>
                    </p>
                ) : (
                    <p>
                        Admin Login?{' '}
                        <span className="text-primary underline cursor-pointer" onClick={() => setState('Admin')}>
                            Click here
                        </span>
                    </p>
                )}
            </div>
        </form>
    );
};

export default Login;

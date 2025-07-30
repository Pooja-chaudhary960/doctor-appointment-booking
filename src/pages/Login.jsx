import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

const Login = () => {
  const [state, setState] = useState('Sign Up');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const url = state === 'Sign Up' ? '/api/signup' : '/api/login';

      const data = state === 'Sign Up'
        ? { name, email, password }
        : { email, password };

      const response = await axios.post(url, data);

      console.log('API Response:', response.data);  // Debugging

      if (response.data.success) {
        if (state === 'Sign Up') {
          toast.success('Account created successfully!');
        } else {
          toast.success('Login successful!');
          // Store token in localStorage
          localStorage.setItem('aToken', response.data.token);
          console.log('Token stored in localStorage:', localStorage.getItem('aToken'));  // Debugging
        }
        setEmail('');
        setPassword('');
      } else {
        toast.error(response.data.message || 'An error occurred');
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="min-h-[80vh] flex items-center" onSubmit={onSubmitHandler}>
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg">
        <p className="text-2xl font-semibold">{state === 'Sign Up' ? 'Create Account' : 'Login'}</p>
        <p>Please {state === 'Sign Up' ? 'sign up' : 'log in'} to book an appointment</p>

        {/* Sign-up specific field */}
        {state === 'Sign Up' && (
          <div className="w-full">
            <p>Full Name</p>
            <input
              className="border border-zinc-300 w-full p-2 mt-1"
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
            />
          </div>
        )}

        {/* Email field */}
        <div className="w-full">
          <p>Email</p>
          <input
            className="border border-zinc-300 w-full p-2 mt-1"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </div>

        {/* Password field */}
        <div className="w-full">
          <p>Password</p>
          <input
            className="border border-zinc-300 w-full p-2 mt-1"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
        </div>

        {/* Submit Button */}
        <button
          className="bg-primary text-white w-full py-2 rounded-md text-base"
          type="submit"
          disabled={loading}
        >
          {loading ? (state === 'Sign Up' ? 'Creating Account...' : 'Logging In...') : state === 'Sign Up' ? 'Create Account' : 'Login'}
        </button>

        {/* Toggle between Login and Sign Up */}
        {state === 'Sign Up' ? (
          <p>
            Already have an account?{' '}
            <span
              onClick={() => setState('Login')}
              className="text-primary underline cursor-pointer"
            >
              Login here
            </span>
          </p>
        ) : (
          <p>
            Create a new account?{' '}
            <span
              onClick={() => setState('Sign Up')}
              className="text-primary underline cursor-pointer"
            >
              Click here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;

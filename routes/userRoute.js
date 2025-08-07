import express from 'express';
import { registerUser, loginUser, getProfile, updateProfile, bookAppointment, listAppointment, cancelAppointment, initiatePayment, paymentCallback } from '../controllers/userController.js';
import authUser from '../middlewares/authUser.js'; // Import authUser middleware
import upload from '../middlewares/multer.js'; // Import multer for file uploads

const userRouter = express.Router();

// Public routes
userRouter.post('/register', registerUser); // Register a new user
userRouter.post('/login', loginUser); // Login an existing user

// Protected routes (require authentication)
userRouter.get('/get-profile', authUser, getProfile); // Get authenticated user's profile
userRouter.put('/update-profile', upload.single('image'), authUser, updateProfile); // Update profile and image upload
userRouter.post('/book-appointment', authUser, bookAppointment); // Book an appointment
userRouter.get('/appointments', authUser, listAppointment); // Get user's appointments (protected route)
userRouter.post('/cancel-appointment', authUser, cancelAppointment);

userRouter.post('/initiate-payment', authUser, initiatePayment);  // Route to initiate payment via Khatli
userRouter.post('/payment-callback', paymentCallback);  // Route to handle Khatli callback


export default userRouter;

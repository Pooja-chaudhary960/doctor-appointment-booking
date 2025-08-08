import validator from 'validator';
import bcrypt from 'bcrypt';
import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import {v2 as cloudinary} from 'cloudinary'
import doctorModel from '../models/doctorModel.js';
import appointmentModel from '../models/appointmentModel.js';
import axios from 'axios';
import Payment from '../models/paymentModel.js';
import config from '../config/config.js'; 


// API to register user

const registerUser = async (req,res)=>{
    try{
    const {name, email, password,} = req.body;
    if(!name || !email || !password){
        return res.json({success:false,message:"Missing Details"})
    }
    
    //validating email format
    if(!validator.isEmail(email)){
        return res.json({success:false,message:"enter a valid email"})
    }

    // validating strong password
    if(password.length < 8){
        return res.json({success:false,message:"enter a strong password"})
    }

    // hashing user password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)

    const userData ={
        name,
        email,
        password : hashedPassword,
     
    }

    const newUser = new userModel(userData)
    const user = await newUser.save()
    
    const token = jwt.sign({id:user._id}, process.env.JWT_SECRET )
    res.json({success:true,token})
    }catch(error){
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

//API for user login
const loginUser = async (req,res)=>{
    try{
        const {email,password}=req.body;
        const user = await userModel.findOne({email})

        if(!user){
           return res.json({success:false,message:"User does not exit"})
        }

        const isMatch = await bcrypt.compare(password,user.password)
        if(isMatch){
            const token = jwt.sign({id:user._id}, process.env.JWT_SECRET)
            res.json({success:true,token})
        }else{
            res.json({success:false,message:"Invalid credentials"})
        }
    }catch(error){
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

// ApI to get user profile data

const getProfile = async (req, res) => {
  try {
    // Ensure req.userId is available
    if (!req.userId) {
      return res.status(401).json({ success: false, message: 'User not authenticated. Please log in.' });
    }

    // Fetch user data using the userId
    const userData = await userModel.findById(req.userId).select('-password');

    // If user is not found, return an error
    if (!userData) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    // Send the user data as response
    res.json({ success: true, userData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}

// API to update user profile
const updateProfile = async (req, res) => {
  try {
    const { userId, name, phone, address, dob, gender } = req.body;  // Corrected 'bod' to 'dob'
    const imageFile = req.file; // Corrected to req.file to access the uploaded image

    // Check if required fields are present
    if (!userId || !name || !phone || !dob || !gender) {  // Corrected condition
      return res.status(400).json({ success: false, message: "Data Missing" });
    }

    // Find the user by ID and update the fields
    const updatedUser = await userModel.findByIdAndUpdate(userId, {
      name,
      phone,
      address, 
      dob,     
      gender
    }, { new: true }); // 'new: true' to return the updated document

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // If an image is provided, upload it to Cloudinary and update the user's image URL
    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: 'image' });
      const imageURL = imageUpload.secure_url;

      // Update the image URL in the database
      updatedUser.image = imageURL;
      await updatedUser.save();
    }

    res.status(200).json({ success: true, message: "Profile Updated", userData: updatedUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
}

// API to book appointment
const bookAppointment = async (req, res)=>{
  try{
    const {userId, docId, slotDate, slotTime} = req.body;

    const docData = await doctorModel.findById(docId).select('-password')

    if(!docData.available){
      return res.json({success:false, message:"Doctor not available"})
    }
    let slots_booked = docData.slots_booked

    // checking for slot availability 
    if(slots_booked[slotDate]){
      if(slots_booked[slotDate].includes[slotTime]){
        return res.json({success:false, message:'Slot not available'})
      }else{
        slots_booked[slotDate].push(slotTime)
      }
    }else{
      slots_booked[slotDate] =[]
      slots_booked[slotDate].push(slotTime)
    }
    const userData = await userModel.findById(userId).select('-password')

    delete docData.slots_booked

    const appointmentData = {
      userId,
      docId,
      userData,
      docData,
      amount: docData.fees,
      slotTime,
      slotDate,
      date: Date.now()
    }

    // save in database
    const newAppointment = new appointmentModel(appointmentData)
    await newAppointment.save()

    // save new slots data in docData
    await doctorModel.findByIdAndUpdate(docId,{slots_booked})

    res.json({success:true, message:"Appointment Booked"})

  }catch(error){
    res.status(500).json({ success: false, message: error.message });

  }
}

const listAppointment = async (req, res) => {
  try {
    const userId = req.userId; // Access userId set by authUser middleware

    // Fetch the appointments for the authenticated user
    const appointments = await appointmentModel.find({ userId });

    // If no appointments are found, return an empty array
    if (appointments.length === 0) {
      return res.json({ success: true, appointments: [] });
    }

    // If appointments exist, return them
    res.json({ success: true, appointments });
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ success: false, message: 'Error fetching appointments' });
  }
};

// API to cancel appointment 
const cancelAppointment = async(req, res)=>{
  try{

    const {userId, appointmentId} = req.body
    const appointmentData = await appointmentModel.findById(appointmentId)

    // verify appointment user
    if(appointmentData.userId !== userId){
      return res.json({success:false,message:"Unauthorized action"})
    }
    await appointmentModel.findByIdAndUpdate(appointmentId, {cancelled:true})
    // releasing doctor slot

    const {docId, slotDate, slotTime} = appointmentData

    const doctorData = await doctorModel.findById(docId)

    let slots_booked = doctorData.slots_booked

    slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime)

    await doctorModel.findByIdAndUpdate(docId, {slots_booked})

    res.json({success:true, message:'Appointment Cancelled'})

  }catch(error){
    console.log(error)
    res.json({success: false, message:error.message})
  }
}

const initiatePayment = async (req, res) => {
  try {
    console.log('Payment request received:', req.body);

    const { amount, userId, appointmentId } = req.body;

    if (!amount || !userId || !appointmentId) {
      console.log('Missing data');
      return res.status(400).json({ success: false, message: 'Missing data' });
    }

    console.log('Proceeding to call payment API...');
    const response = await axios.post('https://api.khatli.com/payment', {
      amount,
      userId,
      appointmentId
    });

    console.log('Payment API response:', response.data);

    if (response.data.success) {
      return res.json({ success: true, paymentUrl: response.data.paymentUrl });
    } else {
      console.log('Payment initiation failed:', response.data);
      return res.status(500).json({ success: false, message: 'Failed to initiate payment' });
    }
  } catch (error) {
    console.error('Error initiating payment:', error);
    return res.status(500).json({ success: false, message: 'Error initiating payment' });
  }
};

// Handling the payment callback
const paymentCallback = async (req, res) => {
  try {
    const { paymentStatus, transactionId, appointmentId, amount } = req.body;

    // Ensure the necessary fields are present
    if (!paymentStatus || !transactionId || !appointmentId || !amount) {
      return res.status(400).json({ success: false, message: 'Missing necessary payment data' });
    }

    // Check if payment is successful
    if (paymentStatus === 'success') {
      // Find and update the payment record
      const payment = await Payment.findOneAndUpdate(
        { appointmentId, transactionId },
        { paymentStatus: 'successful', paymentDate: new Date() },
        { new: true }
      );

      if (!payment) {
        return res.status(404).json({ success: false, message: 'Payment record not found' });
      }

      // Mark the appointment as paid
      const appointment = await Appointment.findByIdAndUpdate(appointmentId, { paymentStatus: 'paid' }, { new: true });
      
      if (!appointment) {
        return res.status(404).json({ success: false, message: 'Appointment not found' });
      }

      // Send a success response
      return res.json({ success: true, message: 'Payment successful and appointment updated.' });
    } else {
      // Handle failed payment status
      const payment = await Payment.findOneAndUpdate(
        { appointmentId, transactionId },
        { paymentStatus: 'failed' },
        { new: true }
      );

      if (!payment) {
        return res.status(404).json({ success: false, message: 'Payment record not found for failure' });
      }

      return res.status(400).json({ success: false, message: 'Payment failed' });
    }
  } catch (error) {
    console.error('Error processing payment callback:', error);
    return res.status(500).json({ success: false, message: 'Error processing payment callback' });
  }
};

export {registerUser, loginUser, getProfile, updateProfile, bookAppointment,listAppointment, cancelAppointment, initiatePayment,paymentCallback};
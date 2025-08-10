import doctorModel from "../models/doctorModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import appointmentModel from "../models/appointmentModel.js";


const changedAvailability = async (req, res) => {
  try {
    const { docId } = req.body; // Ensure this is coming from the request body

    if (!docId) {
      return res.status(400).json({ success: false, message: 'docId is required' });
    }

    const docData = await doctorModel.findById(docId);
    if (!docData) {
      return res.status(404).json({ success: false, message: 'Doctor not found' });
    }

    await doctorModel.findByIdAndUpdate(docId, { available: !docData.available });
    res.json({ success: true, message: 'Availability Changed' });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}

const doctorList = async(req,res)=>{
    try{
        const doctors = await doctorModel.find({}).select(['-password','-email'])
        res.json({success:true,doctors})
    }catch(error){
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

// API for doctor Login
const loginDoctor = async (req,res)=>{
  try{
    const {email,password} = req.body
    const doctor = await doctorModel.findOne({email})

    if(!doctor){
      return res.json({success:false,message:'Invalid credentials'})
    }

    const isMatch = await bcrypt.compare(password, doctor.password)

    if(isMatch){
      const token = jwt.sign({id:doctor._id},process.env.JWT_SECRET)
      res.json({success:true,token})
    }else{
      res.json({success:false, message:'Invalid credentials'})
    }
  }catch(error){
    console.log(error)
    res.json({success:false,message:error.message})
  }
}

// API to get doctor appointments for doctor panel
const appointmentsDoctor = async (req, res) =>{
  try{
    const {docId} = req;
    const appointments = await appointmentModel.find({docId})

    res.json({success: true, appointments})
  }catch(error){
     console.log(error)
    res.json({success:false,message:error.message})
  }
}

// API to mark appointment completed for doctor panel
const appointmentComplete = async (req, res) =>{
  try{
    const {docId, appointmentId} = req.body

    const appointmentData = appointmentModel.findById(appointmentId)
    if(appointmentData && appointmentData.docId === docId){

      await appointmentModel.findByIdAndUpdate(appointmentId, {isCompleted:true})
      return res.json({success:true,message:'Appointment Completed'})
    }else{
      return res.json({success:false, message:'Mark Failed'})
    }
  }catch(error){
    console.log(error)
    res.json({success:false,message:error.message})
  }
}

// API to cancel appointment for doctor panel
const appointmentCancel = async (req, res) =>{
  try{
    const {docId, appointmentId} = req.body

    const appointmentData = appointmentModel.findById(appointmentId)
    if(appointmentData && appointmentData.docId === docId){

      await appointmentModel.findByIdAndUpdate(appointmentId, {cancelled:true})
      return res.json({success:true,message:'Appointment Cancelled'})
    }else{
      return res.json({success:false, message:'Cancellation Failed'})
    }
  }catch(error){
    console.log(error)
    res.json({success:false,message:error.message})
  }
}

// API to get dashboard data for doctor panel
const doctorDashboard = async (req, res) => {
  try {
    if (!req.docId) {
      return res.status(400).json({ success: false, message: 'Doctor not authenticated' });
    }

    // Fetch appointments using the doctor's ID (which is now req.docId)
    const appointments = await appointmentModel.find({ docId: req.docId });

    res.status(200).json({ success: true, appointments });
  } catch (error) {
    console.error('Error fetching doctor dashboard:', error);
    res.status(500).json({ success: false, message: 'Error fetching doctor dashboard', error: error.message });
  }
};

// ApI to get doctor Profile for Doctor Panel
const doctorProfile = async (req, res) => {
  try {
    const docId = req.docId;  // Get docId from the token, not from body

    console.log("Doc ID from token:", docId);  // Check if this is correct

    const doctor = await doctorModel.findById(docId);
    if (!doctor) {
      return res.status(404).json({ success: false, message: 'Doctor not found' });
    }

    res.json({
      success: true,
      profileData: doctor,
    });
  } catch (error) {
    console.error("Error in doctorProfile:", error.message);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// API to update doctor profile data from Doctor Panel
const updateDoctorProfile = async (req,res)=>{
  try{
    const {docId, fees, available} = req.body

    await doctorModel.findByIdAndUpdate(docId, {fees, address, available})

    res.json({success:true, message:'Profile Updated'})

  }catch(error){
    console.log(error)
    res.json({success:false,message:error.message})
  }
}
export {changedAvailability, doctorList, loginDoctor, appointmentsDoctor, appointmentComplete, appointmentCancel, doctorDashboard, doctorProfile, updateDoctorProfile};
import validator from 'validator';
import bcrypt from 'bcrypt';
import { v2 as cloudinary } from 'cloudinary';
import doctorModel from "../models/doctorModel.js";

const addDoctor = async (req, res) => {
  try {
    const {
      name, email, password,
      speciality, degree, experience,
      about, fees, address, available  // get available from req.body
    } = req.body;

    const imageFile = req.file;

    // Log received data
    console.log("Body Data:", req.body);
    console.log("File Data:", req.file);

    // Check all required fields except available (if optional, adjust here)
    if (
      !name || !email || !password || !speciality ||
      !degree || !experience || !about || !fees ||
      !address || !imageFile
    ) {
      return res.json({ success: false, message: "Missing Details" });
    }

    // Validate email
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Please enter a valid email" });
    }

    // Validate password
    if (password.length < 8) {
      return res.json({ success: false, message: "Please enter a strong password" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Upload image to Cloudinary
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image"
    });
    const imageUrl = imageUpload.secure_url;

    // Build doctor data, include available with fallback default true
    const doctorData = {
      name,
      email,
      image: imageUrl,
      password: hashedPassword,
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
      available: available !== undefined ? available : true,  // default true if not provided
      date: Date.now()
    };

    // Save to DB
    const newDoctor = new doctorModel(doctorData);
    await newDoctor.save();

    return res.json({ success: true, message: "Doctor Added" });

  } catch (error) {
    console.error("Error in addDoctor:", error);
    return res.json({ success: false, message: error.message });
  }
};

export { addDoctor };

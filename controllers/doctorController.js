import doctorModel from "../models/doctorModel.js";


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


export {changedAvailability, doctorList};
import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  appointmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Appointment', // Reference to the Appointment model
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  },
  transactionId: {
    type: String, // Khatli's transaction ID
    required: true,
  },
  amount: {
    type: Number, // Amount paid
    required: true,
  },
  paymentStatus: {
    type: String, // Payment status: 'pending', 'successful', 'failed'
    default: 'pending',
  },
  paymentDate: {
    type: Date,
    default: Date.now,
  },
  paymentMethod: {
    type: String, // Payment method (Khatli)
    required: true,
  },
});

const Payment = mongoose.model('Payment', paymentSchema);

export default Payment;

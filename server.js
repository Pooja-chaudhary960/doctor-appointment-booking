import express from 'express';
import cors from 'cors';
import config from './config/config.js';  // Ensure this path is correct
import connectDB from './config/mongodb.js';
import dotenv from 'dotenv';
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRoute.js';
import doctorRouter from './routes/doctorRoute.js';
import userRouter from './routes/userRoute.js';

// App config
const app = express();

// Connect to MongoDB
connectDB();

dotenv.config(); // This loads the environment variables from the .env file
//connect cloudinary
connectCloudinary();

// Middlewares
app.use(express.json());
app.use(cors());

// API Endpoints
app.use('/api/admin',adminRouter);
app.use('/api/doctor', doctorRouter);
app.use('/api/user',userRouter);

app.use('/images', express.static('public/images'));

app.get('/', (req, res) => {
  res.send('API WORKING');
});

// Listen on the defined port
const port = config.port || 4000;
app.listen(port, () => console.log(`Server started on port ${port}`));

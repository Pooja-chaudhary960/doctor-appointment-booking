import express from 'express';
import cors from 'cors';
import config from './config/config.js';  // Ensure this path is correct
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRoute.js';

// App config
const app = express();

// Connect to MongoDB
connectDB();

//connect cloudinary
connectCloudinary();

// Middlewares
app.use(express.json());
app.use(cors());

// API Endpoints
app.use('/api/admin',adminRouter);

app.use('/images', express.static('public/images'));

app.get('/', (req, res) => {
  res.send('API WORKING');
});

// Listen on the defined port
const port = config.port || 4000;
app.listen(port, () => console.log(`Server started on port ${port}`));

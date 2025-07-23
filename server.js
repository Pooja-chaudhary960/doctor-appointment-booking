import express from 'express';
import cors from 'cors';
import config from './config/config.js';  // Ensure this path is correct
import connectDB from './config/mongodb.js';

// App config
const app = express();

// Connect to MongoDB
connectDB();

// Middlewares
app.use(express.json());
app.use(cors());

// API Endpoints
app.get('/', (req, res) => {
  res.send('API WORKING');
});

// Listen on the defined port
const port = config.port || 4000;
app.listen(port, () => console.log(`Server started on port ${port}`));

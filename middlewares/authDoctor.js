import jwt from 'jsonwebtoken'; 

const authDoctor = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ success: false, message: 'Authorization header missing. Login Again.' });
    }

    const token = authHeader.split(' ')[1]; // Extract token from 'Bearer <token>'

    if (!token) {
      return res.status(401).json({ success: false, message: 'Token missing. Login Again.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token using secret

    if (!decoded || !decoded.id) {
      return res.status(401).json({ success: false, message: 'Invalid token. Please log in again.' });
    }

    req.docId = decoded.id; // Ensure docId is attached to the req object

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error(error);
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ success: false, message: 'Token expired. Please log in again.' });
    }
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ success: false, message: 'Invalid token. Please log in again.' });
    }

    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

export default authDoctor;

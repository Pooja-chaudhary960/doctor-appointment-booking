import jwt from 'jsonwebtoken';

const authUser = async (req, res, next) => {
  try {
    // Extract the token from the Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ success: false, message: 'Authorization header missing. Login Again.' });
    }

    // Extract token from 'Bearer <token>'
    const token = authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ success: false, message: 'Token missing. Login Again.' });
    }

    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if the decoded token contains 'id'
    if (!decoded || !decoded.id) {
      return res.status(401).json({ success: false, message: 'Invalid token. Please log in again.' });
    }

    // Attach the userId from the decoded token to the request object
    req.userId = decoded.id; // This is crucial

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.log(error);

    // Handle specific errors
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ success: false, message: 'Token expired. Please log in again.' });
    }

    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ success: false, message: 'Invalid token. Please log in again.' });
    }

    // Generic error handler for unknown errors
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

export default authUser;

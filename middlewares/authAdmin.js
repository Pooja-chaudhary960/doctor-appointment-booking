import jwt from 'jsonwebtoken';

// Admin authentication middleware
const authAdmin = async (req, res, next) => {
    try {
        // Extract token from the Authorization header (Bearer <token>)
        const token = req.headers.authorization?.split(' ')[1];

        // If no token is provided, return unauthorized
        if (!token) {
            return res.status(401).json({ success: false, message: 'Not Authorized. Login Again.' });
        }

        // Verify the token using the secret key
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);

        // Check if the decoded email matches the admin email (this should be stored in the token when it's created)
        if (token_decode.email !== process.env.ADMIN_EMAIL) {
            return res.status(401).json({ success: false, message: 'Not Authorized. Login Again.' });
        }

        // Proceed to the next middleware or route handler if the token is valid
        next();
    } catch (error) {
        console.log(error);

        // Handle specific errors
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ success: false, message: 'Token expired. Please log in again.' });
        }

        // For other errors (e.g., invalid token)
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ success: false, message: 'Invalid token. Please log in again.' });
        }

        // Generic error handler for unknown errors
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

export default authAdmin;

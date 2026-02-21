const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

// ----------------------------------------------------
// 1. Protect Routes (Verify JWT & Attach User)
// ----------------------------------------------------
const protect = async (req, res, next) => {
    let token;

    // We check the cookies first since that is our primary storage method
    if (req.cookies && req.cookies.token) {
        token = req.cookies.token;
    } 
    // Fallback: Check the Authorization header just in case Person 2 decides to use 
    // localStorage instead of cookies later, or for easier Postman testing without cookies.
    else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token provided' });
    }

    try {
        // Verify the token using your secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Fetch the user from the database using the ID in the decoded payload
        // IMPORTANT: We use .select('-password') to ensure we NEVER attach the 
        // hashed password to the req object for security reasons.
        req.user = await User.findById(decoded.id).select('-password');

        if (!req.user) {
            return res.status(401).json({ message: 'Not authorized, user not found' });
        }

        // Token is valid and user exists. Move to the next function!
        next();
    } catch (error) {
        console.error('JWT Verification Error:', error.message);
        res.status(401).json({ message: 'Not authorized, token failed or expired' });
    }
};

// ----------------------------------------------------
// 2. Role-Based Access Control (RBAC)
// ----------------------------------------------------
// Example usage in routes: router.post('/upload', protect, authorizeRole('athlete'), uploadVideo)
const authorizeRole = (...roles) => {
    return (req, res, next) => {
        // req.user is set by the `protect` middleware above
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ 
                message: `Access denied. Role '${req.user.role}' is not authorized to access this route.` 
            });
        }
        next();
    };
};

module.exports = { protect, authorizeRole };
const jwt = require('jsonwebtoken');
const authenticateUser = (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    console.log("Auth Header:", authHeader); // Debugging
    
    if (!authHeader) {
        return res.status(401).json({ error: 'Access Denied. No token provided.' });
    }

    const token = authHeader.split(' ')[1]; // Extract token

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded Token:", decoded); // Debugging
        req.user = decoded; // Attach user info to request
        next();
    } catch (error) {
        console.error("JWT Verification Error:", error);
        return res.status(403).json({ error: 'Invalid token' });
    }
};

module.exports = authenticateUser;

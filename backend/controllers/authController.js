// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const pool = require('../init/db');

// const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

// // Signup Function
// const signup = async (req, res) => {
//     const { username, email, password, role } = req.body;

//     if (!username || !email || !password || !role) {
//         return res.status(400).json({ error: "All fields are required" });
//     }

//     try {
//         // Check if username or email already exists
//         const existingUser = await pool.query(
//             'SELECT * FROM Users WHERE Username = $1 OR Email = $2', 
//             [username, email]
//         );

//         if (existingUser.rows.length > 0) {
//             return res.status(409).json({ error: "Username or Email already exists. Please use a different one." });
//         }

//         // Hash password before saving
//         const hashedPassword = await bcrypt.hash(password, 10);
//         const result = await pool.query(
//             'INSERT INTO Users (Username, Email, Password, Role) VALUES ($1, $2, $3, $4) RETURNING *',
//             [username, email, hashedPassword, role]
//         );
//         const user= result.rows[0];
//         const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
//         // res.cookie("token", token, {
//         //     httpOnly: true,   // Prevents access from JavaScript
//         //     secure: process.env.NODE_ENV === "production", // Only send over HTTPS in production
//         //     sameSite: "Strict", // Prevents CSRF attacks
//         //     maxAge: 60 * 60 * 1000 // 1 hour
//         // });

//         res.status(201).json({ message: `${role} registered successfully`, token,role:user.role ,userName:user.username});
//     } catch (error) {
//         console.error("Signup Error:", error.message);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// };

// // Login Function
// const login = async (req, res) => {
//     const { email, password } = req.body;
    
//     if (!email || !password) {
//         return res.status(400).json({ error: "Email and password are required for login." });
//     }

//     try {
//         const result = await pool.query('SELECT * FROM Users WHERE email = $1', [email]);
//         if (result.rows.length === 0) {
//             return res.status(401).json({ error: 'Invalid credentials' });
//         }

//         const user = result.rows[0];
//         const match = await bcrypt.compare(password, user.password);
//         if (!match) {
//             return res.status(401).json({ error: 'Invalid credentials' });
//         }
//         console.log(user.username);
//         const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
//         // // res.cookie("token", token, {
//         // //     httpOnly: true,   // Prevents access from JavaScript
//         // //     secure: process.env.NODE_ENV === "production", // Only send over HTTPS in production
//         // //     sameSite: "Strict", // Prevents CSRF attacks
//         // //     maxAge: 60 * 60 * 1000 // 1 hour
//         // });
//         res.json({ message: "Login successful", token,role: user.role,userName:user.username});
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };


// // Logout Function
// const logout = (req, res) => {
//     res.json({ message: "Logged out successfully" });
// };

// module.exports = { signup, login, logout };
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sql = require('../init/db'); // Ensure you're correctly importing sql

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

// Signup Function
const signup = async (req, res) => {
    const { username, email, password, role } = req.body;
   

    if (!username || !email || !password || !role) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        // Check if username or email already exists
        const existingUser = await sql`SELECT * FROM Users WHERE userName = ${username} OR Email = ${email}`;

        if (existingUser.length > 0) {
            return res.status(409).json({ error: "Username or Email already exists. Please use a different one." });
        }

        // Hash password before saving
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await sql`
    INSERT INTO Users (userName, Email, Password, Role) 
    VALUES (${username}, ${email}, ${hashedPassword}, ${role}) 
    RETURNING userName, Role
`;
const user=result[0];
// console.log(user);

        const token = jwt.sign({ id: user.username, role: role }, JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ message: `${role} registered successfully`, token, role: user.role, userName: user.username });
    } catch (error) {
        console.error("Signup Error:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required for login." });
    }

    try {
        const result = await sql`SELECT * FROM Users WHERE Email = ${email}`;
        // console.log("Login Query Result:", result); // Debugging

        if (result.length === 0) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const user = result[0]; // Get the first result

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user.username, role: user.role }, JWT_SECRET, { expiresIn: '1h' });

        res.json({ message: "Login successful", token, role: user.role, userName: user.username });
    } catch (error) {
        console.error("Login Error:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


// Logout Function
const logout = (req, res) => {
    res.json({ message: "Logged out successfully" });
};

module.exports = { signup, login, logout };

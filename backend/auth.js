const express = require('express'); 
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Import the User model

const router = express.Router();

// Middleware to verify the token
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Get token from headers
    if (!token) return res.status(403).json({ message: 'A token is required for authentication' });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(401).json({ message: 'Invalid token' }); // Invalid token
        req.user = user; // Save user info to request
        next();
    });
};

// Register a new user
router.post('/register', async (req, res) => {
    const { username, email, password, confirmPassword, dateOfBirth, trustedPersonEmail } = req.body;

    // Check if all required fields are provided
    if (!username || !email || !password || !confirmPassword || !dateOfBirth ) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    // Check if passwords match
    if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match.' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
        return res.status(400).json({ message: 'Username already exists. Please choose a different username.' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user and save to database
    const newUser = new User({
        username,
        email,
        trustedPersonEmail, // Add trusted person's email here
        dateOfBirth,
        password: hashedPassword,
    });

    try {
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
});

// Login a user
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // Check if all required fields are provided
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required.' });
    }

    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) {
        return res.status(400).json({ message: 'Invalid username or password.' });
    }

    // Check if the password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: 'Invalid username or password.' });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });

    res.json({ token });
});

// Example of a protected route
router.get('/protected', verifyToken, (req, res) => {
    res.json({ message: `Hello ${req.user.userId}, you are authenticated!` });
});

// Export the router
module.exports = router;

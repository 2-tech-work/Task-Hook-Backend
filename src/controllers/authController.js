const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authController = {
    register: async (req, res) => {
        try {
            const { email, password } = req.body;
            
            // Check if user already exists
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: 'Email already registered' });
            }

            // Create new user
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await User.create({
                email,
                password: hashedPassword
            });

            // Generate token
            const token = jwt.sign(
                { userId: user._id, email: user.email },
                'your-secret-key',
                { expiresIn: '24h' }
            );

            res.status(201).json({
                message: 'Registration successful',
                token,
                userId: user._id
            });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    login: async (req, res) => {
        const { email, password } = req.body;
          
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
  
        // Verify password
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
  
        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id, email: user.email },
            'your-secret-key', // Replace with process.env.JWT_SECRET in production
            { expiresIn: '24h' }
        );
  
        // Send successful response
        res.json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                email: user.email
            }
        });
    }
};
module.exports = authController;
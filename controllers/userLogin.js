const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

// Login functionality using empId or empMobile
const userLogin = async (req, res) => {
    const { empId, empMobile, empPassword,empRole } = req.body;
    console.log(empRole)
    console.log(empMobile)
    console.log(empPassword)
    try {
        // Find user by empId or empMobile
        const user = await User.findOne({
            $or: [{ empId: empId,empRole }, { empMobile: empMobile,empRole }] // Match either empId or empMobile
        });

        if (!user) {
            console.log("User not found.")
            return res.status(400).json({
                message: 'Invalid credentials. User not found.',
            });
        }

        // Compare the provided password with the stored hashed password
        const isMatch = await user.comparePassword(empPassword);
        if (!isMatch) {
            return res.status(401).json({
                message: 'Invalid credentials. Incorrect password.',
            });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id, empId: user.empId, empMobile: user.empMobile },
            process.env.JWT_SECRET || 'your_jwt_secret', // Use your own secret key here
            { expiresIn: '1h' } // Token expires in 1 hour
        );

        // Respond with the token
        res.json({
            message: 'Login successful',
            token,
            user: {
                empId: user.empId,
                empName: user.empName,
                empMobile: user.empMobile,
                empRole: user.empRole,
                empEmail: user.empEmail
            }
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({
            message: 'Server error, please try again later.',
        });
    }
};

module.exports = {
    userLogin,
};

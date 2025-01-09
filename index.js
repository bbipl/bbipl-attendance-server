const express = require("express");
const User = require('./models/userModel');
const connectDB = require("./config/db");
const cors = require("cors");
const dotenv = require("dotenv").config();
const server = express();
const PORT = process.env.PORT;

//---------------------------------------------------------

const attendanceRoutes = require('./routes/attendanceRoutes');
const userRoutes = require('./routes/userRoutes');

// Middleware
server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// Use the routes
server.use('/api', attendanceRoutes); // Prefix the route with '/api'
server.use('/api', userRoutes); // Prefix the route with '/api'

// Root endpoint to check if server is working fine
server.get("/", (req, res) => {
    res.send("I am working fine");
});

// Listen and connect to DB
const startServer = async () => {
    try {
        // Start the server
        server.listen(PORT, async () => {
            console.log("Server is listing on port: ", PORT);
            await connectDB(); // Ensure the DB connection is successful
            
            // Check if the user already exists
            const existingUser = await User.findOne({
                $or: [
                    { empId: "BB0002" },  // Check for duplicate empId
                    { empMobile: "9876543210" }  // Check for duplicate empMobile
                ]
            });

            if (existingUser) {
                console.log("User already exists, skipping creation.");
            } else {
                // Create a new user (just an example)
                const newUser = new User({
                    empId: "BB0002", // Example empId
                    empName: "Rakesh Kumar", // Example name
                    empMobile: "7503677953", // Example mobile
                    empRole: "Admin", // Example role
                    empEmail: "johndoe@example.com", // Example email
                    empPassword: "123987", // This will be hashed automatically in the model
                });

                // Save the new user to the database
                await newUser.save();
                console.log("New user added successfully");
            }
        });
    } catch (error) {
        console.error("Error starting the server or connecting to DB:", error);
    }
};

// Call the function to start the server
startServer();

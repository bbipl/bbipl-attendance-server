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
const mailRouter =require("./routes/mailRouter");
const formsRouter=require('./routes/formsRouter');
const sitesManagementRouter=require("./routes/sitesManagementRouter");
const attendanceOfDevAndFinRouter = require("./routes/attendanceOfDevAndFinRoutes");
// Middleware
server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// Use the routes
server.use('/api', attendanceRoutes); // router for attendance
server.use('/api/attendance/dev-and-fin', attendanceOfDevAndFinRouter); // router for attendance
server.use('/api', userRoutes); // router for users
server.use('/api/email', mailRouter); // router for emails
server.use('/api/forms', formsRouter); // router for forms
server.use('/api/site-management',sitesManagementRouter ); // router for siteDetails

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
                    { empId: "BB0000" },  // Check for duplicate empId
                    { empMobile: "1112223330" }  // Check for duplicate empMobile
                ]
            });

            if (existingUser) {
                console.log("User already exists, skipping creation.");
            } else {
                // Create a new user (just an example)
                const newUser = new User({
                    empId: "BB0000", // Example empId
                    empName: "Rakesh Kumar", // Example name
                    empMobile: "1112223330", // Example mobile
                    empRole: "admin", // Example role
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

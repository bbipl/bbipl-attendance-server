const express = require('express');
const router = express.Router();
const { uploadFile,userFileUpload } = require('../controllers/userFileUploadControllers.js');
const { userLogin } = require('../controllers/userLogin.js');
const { getAllUsers } = require('../controllers/allUsersControllers.js');

// Route to handle attendance form submission
router.post('/upload-users-details', uploadFile,userFileUpload);
router.post('/user-login', userLogin);
router.get('/all-users', getAllUsers);


module.exports = router;

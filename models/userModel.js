const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    empId: {
        type: String,
        required: true,
        unique: true,
    },
    empName: {
        type: String,
        required: true,
    },
    empMobile: {
        type: String,
        required: true,
        unique: true,
    },
    empRole: {
        type: String,
        required: true,
    },
    empEmail: {
        type: String,
        required: false,
    },
    empPassword: {
        type: String,
        required: true,
    }
});

// Middleware to hash password before saving
userSchema.pre('save', async function(next) {
    if (!this.isModified('empPassword')) return next(); // only hash if password is modified
    this.empPassword = await bcrypt.hash(this.empPassword, 10); // Hash the password with 10 salt rounds
    next();
});

// Method to compare the entered password with the stored hashed password
userSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.empPassword);
};

const User = mongoose.model('User', userSchema);

module.exports = User;

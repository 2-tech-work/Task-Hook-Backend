const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/taskmanagement');
        console.log('✅ MongoDB Connected Successfully!');
    } catch (error) {
        console.log('MongoDB Connection Status:', error.message);
    }
};

module.exports = connectDB;
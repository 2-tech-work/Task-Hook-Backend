const mongoose = require('mongoose');

// Define the Task schema
const taskSchema = new mongoose.Schema({
    taskName: {  // Renamed from 'title' to 'taskName'
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  // Reference to User model
        required: true
    },
    groupId: {  // Foreign key to Group model
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group',  // Assuming you have a Group model
        required: true
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],  // Predefined priority levels
        default: 'medium'
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['In progress', 'dev done', 'complete', 'To Do'],  // Updated status values
        default: 'To DO'
    }
}, { timestamps: true });

// Export the Task model
module.exports = mongoose.model('Task', taskSchema);

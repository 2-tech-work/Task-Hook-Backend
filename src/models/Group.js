const Group = require('./models/Group'); // Assuming Group model is in models/Group.js

// Function to get group details with tasks
async function getGroupWithTasks(groupId) {
  try {
    const group = await Group.findById(groupId)
      .populate('tasks')  // Populate the tasks field to get full task details
      .exec();

    if (!group) {
      console.log('Group not found');
      return null;
    }

    // Return an object with Group ID, Group Name, and Tasks
    return {
      groupId: group._id,
      groupName: group.name,
      tasks: group.tasks  // This will contain the populated task objects
    };
  } catch (error) {
    console.error('Error fetching group:', error);
    throw error;
  }
}

// Example usage
getGroupWithTasks('64f1a8b2c8e4f0a2a9b0c123').then(group => {
  console.log(group);  // This will print the group object with tasks
});

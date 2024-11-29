import { find } from "./models/Task"; // Assuming you have a Task model
import { findOneAndUpdate } from "./models/Analytics";
import User from "./models/User";

// Function to calculate and save analytics for a user on a specific date
async function calculateAndSaveAnalytics(userId, date) {
  try {
    // Find all tasks for the user on the given date
    const tasks = await find({
      user: userId,
      date: { $eq: date }, // Assuming tasks have a `date` field
    });

    const totalTasks = tasks.length;
    if (totalTasks === 0) {
      console.log("No tasks found for the user on this date");
      return;
    }

    // Calculate task statuses
    const overdueTasks = tasks.filter(
      (task) => task.status === "overdue"
    ).length;
    const completedTasks = tasks.filter(
      (task) => task.status === "completed"
    ).length;
    const incompleteTasks = tasks.filter(
      (task) => task.status === "incomplete"
    ).length;
    const progressTasks = tasks.filter(
      (task) => task.status === "Progress"
    ).length;
    const todoTasks = tasks.filter((task) => task.status === "to-do").length;

    // Calculate percentages
    const overdueTaskPercentage = (overdueTasks / totalTasks) * 100;
    const completedTaskPercentage = (completedTasks / totalTasks) * 100;
    const incompleteTaskPercentage = (incompleteTasks / totalTasks) * 100;
    const todoTaskPercentage = (todoTasks / totalTasks) * 100;

    // Create or update the analytics for the user on the given date
    const analytics = await findOneAndUpdate(
      { user: userId, date: date },
      {
        totalTasks: totalTasks,
        overdueTaskPercentage: overdueTaskPercentage,
        completedTaskPercentage: completedTaskPercentage,
        incompleteTaskPercentage: incompleteTaskPercentage,
        todoTaskPercentage: todoTaskPercentage,
      },
      { new: true, upsert: true } // Create a new document if one doesn't exist
    );

    console.log("Analytics saved:", analytics);
  } catch (error) {
    console.error("Error calculating analytics:", error);
  }
}

// Example usage
const userId = "64f1a8b2c8e4f0a2a9b0c123"; // Replace with actual user ID
const date = new Date(); // Today's date
calculateAndSaveAnalytics(userId, date);

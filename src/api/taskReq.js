import dbConnect from '@/lib/db'
import Task from '@/models/Task';

export default async function handleTask (req, userData){
    await dbConnect();

    switch (req){
        case "GET": //retrieving all tasks under a current user
            return await fetchTasks(userData); //needs an object ID to find all tasks of that user
        case "POST": //adding a new task
            return await addTask(userData);
        case "PUT": //updating the task with the required information
            return await update(userData);    
        //we need to check which kind of information we want to update, and for which task
        case "DELETE":
            return await deleteTask(userData);
        }


}

async function fetchTasks(username){
    const user = await Task.find({user: username}).lean();
    return user;
}       

async function addTask(taskInfo) {
    try {
      // Convert the entered object into a Task model
      // let newTask = new Task(taskInfo);
      // must be explicit to save user (only add user input and user)
      const newTask = new Task({
        title: taskInfo.title,
        priority: taskInfo.priority,
        description: taskInfo.description,
        date: taskInfo.date,
        // completed defaults 
        user: taskInfo.user
      });
  
      // Save the new task to the database
      await newTask.save();
  
      console.log("Task successfully saved:", newTask);
    } catch (error) {
      // Handle and log any errors during the process
      console.error("Error adding task:", error.message);
  
      // Optionally, throw the error again if the caller needs to handle it
      throw error;
    }
  }


async function deleteTask(taskInfo){ //it would be better to obtain the task ID instead? or...
    //takes the entered object and turns it into a model which can be entered into the database
    await Task.findByIdAndDelete(taskInfo);// what would this take, I suggest an object ID?

}

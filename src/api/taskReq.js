import dbConnect from '@/lib/db'
import Task from '@/models/Task';

//updating tasks
//deleting tasks
//retrieving tasks

export default async function handleUserRequest (req, userData){
    /*
    KINDS OF INPUT:
    -"POST", an object, containing all required information from task
    -"PUT" a piece of information to add or change, example {title: "new name"}
    -"GET", a username to find all associated tasks with the person
    -"DELETE", deleting an existing task, requires the exact information (object ID?)
    */
    await dbConnect();

    switch (req){
        case "GET": //retrieving all tasks under a current user
            return await fetch(userData); //needs an object ID to find all tasks of that user
        case "POST": //adding a new task
            return await add(userData);
        case "PUT": //updating the task with the required information
            return await update(userData);    
        //we need to check which kind of information we want to update, and for which task
        case "DELETE":
            return await deleteTask(userData);
        }


}

async function fetchTasks(username){
    const user = await Task.findMany({id: username});
    return user;
}       

async function addTask(taskInfo){
    //takes the entered object and turns it into a model which can be entered into the database
    let newTask = new Task(taskInfo);
    newTask.save();
}

async function deleteTask(taskInfo){ //it would be better to obtain the task ID instead? or...
    //takes the entered object and turns it into a model which can be entered into the database
    await Task.findByIdAndDelete(taskInfo);// what would this take, I suggest an object ID?

}

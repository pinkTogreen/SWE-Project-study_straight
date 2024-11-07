// import dbConnect from '@/lib/db'

// //adding sessions
// //retrieving session data
// //adding new session data

// export default async function handleSession (req, userData){
//     await dbConnect(); //we can't rely on the same connection all the time, learning things as we go

//     if (req.method === 'GET') {
//         return await fetchUser(userData);
//     }

//     else if (req.method === 'POST'){
//         return await addUser(userData); //expects username and password
//     }

//     else if (req.method === 'PUT'){
//         //updating the task with the required information
//         //this one might be little harder... how can we determine what kind of information was entered?
//     }

// }

// async function fetchTasks(userData){ //this might want to take an ID associated with the task...
//     const user = await Task.findMany({id: userData});

// }

// async function addTask(userData){
//     //simply enters information into the database
//     //takes in form data
//     //and makes the user model
// }

// //do we need something for changing the password?
// //how do people handle deleting accounts? do we even need to worry about that?


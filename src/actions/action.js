'use server'
import checkInfo from '@/api/auth'
import handleSignup from '@/api/signup'
import handleTask from '@/api/taskReq'
import handleSession from '@/api/session'

//import setCurrentUser from '@/api/userData'
//import getCurrentUser from '@/api/userData'
// import User from '@/models/User'
// import Task from '@/models/Task'

let theCurrentUser = "Default";

export const login = async (username, password) => {
	const userData = {
		username: username,
		password: password,
	};

	let response = await checkInfo(userData);

	if(response.valid){
		theCurrentUser = username;
		return true;
	}
	return false;
}

export default async function getCurrentUser() {
    return theCurrentUser;
}

export const addAccount = async (username, password) => {
	const userData = {
		username: username,
		password: password,
	};
	let takenUser = handleSignup("GET", username);
	if (takenUser.exists) {
		return false; //user taken, signup failed
	}
	handleSignup("POST", userData);
	theCurrentUser = username;
	return true; //successfully added account 
}

export const addTask = async (taskDetails) => {
	taskDetails.description === "" ? "No description provided." : taskDetails.description;
	taskDetails.user = theCurrentUser;
	console.log(taskDetails);
	await handleTask('POST', taskDetails);
}

export const getSchedule = async() => {
	let tasks = await handleTask('GET', theCurrentUser);
	let sessions = await handleSession('GET', theCurrentUser);

	let allEvents = [...tasks, ...sessions];
	return allEvents;
}
'use server'
import checkInfo from '@/api/auth'
import User from '@/models/User'
import Task from '@/models/Task'
//import handleUserRequest from '@/app/api/verify'
import { UNDERSCORE_NOT_FOUND_ROUTE } from 'next/dist/shared/lib/constants'
//what the hell is this and where did it come from


export const login = async (username, password) => {
	const userData = {
		username: username,
		password: password,
	}
	return await checkInfo(userData);

}

export const addAccount = async (username, password) => {
	const userData = {
		username: username,
		password: password,
	}
}

export const addTask = async(name, date, description) => {
	if (description === ''){
		description = "empty";
	}
	let newTask = new Task({
		"title":name,
		"date":date,
		"description":description,
	})
	newTask.save();
}
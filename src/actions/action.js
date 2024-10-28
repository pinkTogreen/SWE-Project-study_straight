'use server'
import User from '@/models/User'
//import handleUserRequest from '@/app/api/verify'
import { UNDERSCORE_NOT_FOUND_ROUTE } from 'next/dist/shared/lib/constants'
//what the hell is this and where did it come from


export const signup = async (username, password) => {

	let missingInfo = false;

	if(!username || !password){
		missingInfo = true;
		return missingInfo;
	}

	let newSignup = new User({
		"username": username, 
		"password": password,
	});

	newSignup.save(); //this saves the data to the database
	
	return missingInfo;
}
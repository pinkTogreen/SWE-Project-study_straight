'use server'
import dbConnect from '@/lib/db'
import User from '@/models/User'


export default async function handleSignup (req, userData){
    await dbConnect(); 
    if (req === "GET") {//first we check if the username exists (expects a username)
        return await fetchUser(userData);
    }
    else if (req === 'POST') {//then we add the information to the database
        return await addUser(userData); //expects username and password
    }
}


async function fetchUser(userData){
    const user = await User.findOne({username: userData});
    if (user) {//the username exists
        return {
            message: "This username already exists.",
            exists: true,
        }
    }
    else {
        return {
            message: "This username is available.",
            exists: false,
        }
    }


}

async function addUser(userData){
	let newAccount = new User(userData);
	newAccount.save();
}

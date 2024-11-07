'use server'
import dbConnect from '@/lib/db'
import User from '@/models/User'


export default async function handleSignup (){
    await dbConnect(); //we can't rely on the same connection all the time, learning things as we go
    if (req === "GET") {//first we check if the username exists
        return await fetchUser(userData);
    }
    else if (req === 'POST') {//then we add the information to the database
        return await addUser(userData); //expects username and password
    }
}


async function fetchUser(userData){
    const user = await User.findOne({username: userData.username});
    console.log(user);
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
	let newAccount = new User({
		"username": userData.username, 
		"password": userData.password,
	});
	newAccount.save();
}

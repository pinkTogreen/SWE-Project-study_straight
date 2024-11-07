'use server'
import dbConnect from '@/lib/db'
import User from '@/models/User'

export default async function checkInfo(userData){
    await dbConnect();
    const user = await User.findOne({username: userData.username});
    if(!user || userData.password != user.password){
        return{
            message: "Incorrect Username or Password",
            valid: false,
        }
    }
    else{
        return{
            message: "Login Successful",
            valid: true,
        }
    }
}

'use server'
import dbConnect from '@/lib/db'
import User from '@/models/User'

export default async function checkInfo(userData) {
    try {
        await dbConnect();
        const user = await User.findOne({username: userData.username});
        
        if(!user || userData.password !== user.password) {
            return {
                message: "Incorrect Username or Password",
                valid: false,
            }
        }
        
        return {
            message: "Login Successful",
            valid: true,
        }
    } catch (error) {
        console.error('Authentication error:', error);
        return {
            message: "An error occurred during authentication",
            valid: false,
            error: error.message
        }
    }
}

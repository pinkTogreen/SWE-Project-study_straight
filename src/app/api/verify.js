import dbConnect from '@/lib/db'



export default async function handleUserRequest (req, userData){
    await dbConnect(); //we can't rely on the same connection all the time, learning things as we go

    if (req.method === 'GET') {
        return await fetchUser(userData);
    }
    // else if (req.method === 'POST') {

    // }
    // else if (req.method === 'PUT') {

    // }
    // else if (req.method === 'DELETE') {

    // }
    //I don't think we need an else, unless there's something else.....

}


async function fetchUser(userData){
    const user = await User.find({username: userData.username});
    

    // if userData.password matches the password in the database then they log in, return true
    // if it does not, return false
}
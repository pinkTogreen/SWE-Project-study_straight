import dbConnect from '@/lib/db'
//This is for retrieving, adding, and updating information provided by the user
//This could be the "motherboard" of the API, and provide order for how we handle user information
//This can only be accessed once the user is logged in, so auth.js must be kept separate


export default async function handleUserRequest (req, userData){
    await dbConnect();

    if (req.method === 'GET') {
        return await fetchUser(userData); //how can this be used? obtain the user's tasks and sesssions, courses and information?
    }

    else if (req.method === 'PUT'){
    }

}

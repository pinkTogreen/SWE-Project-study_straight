import dbConnect from '@/lib/db'
//This is for retrieving, adding, and updating information provided by the user
//This could be the "motherboard" of the API, and provide order for how we handle user information
//This can only be accessed once the user is logged in, so verify.js must be kept separate

//we would have to store the active user somewhere, and I'm considering  storing it upon signup or login
//considering a new library to handle this, either next cookies or nookies (lol)\



export default async function handleUserRequest (req, userData){
    await dbConnect(); //we can't rely on the same connection all the time, learning things as we go

    if (req.method === 'GET') {
        return await fetchUser(userData); //how can this be used? obtain the user's tasks and sesssions, courses and information?
    }

    else if (req.method === 'PUT'){
    }

}

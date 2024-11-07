import dbConnect from '@/lib/db'

//This is for retrieving, adding, and updating information provided by the user
//This could be the "motherboard" of the API, and provide order for how we handle user information
//This can only be accessed once the user is logged in, so verify.js must be kept separate

//we would have to store the active user somewhere, and I'm considering  storing it upon signup or login
//considering a new library to handle this, either next cookies or nookies (lol)
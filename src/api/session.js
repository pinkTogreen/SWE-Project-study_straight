import dbConnect from '@/lib/db'
import Session from '@/models/Session';

//adding sessions
//retrieving session data
//adding new session data

export default async function handleSession (req, userData){
    await dbConnect(); //we can't rely on the same connection all the time, learning things as we go

    if (req.method === 'GET') { //takes in a user ID, and returns all of the sessions related to the user
        return await fetch(userData);
    }

    else if (req.method === 'POST'){ //takes in session object
        return await add(userData); //expects session details, this adds a new session
    }

    else if (req.method === 'PUT'){ //takes in session ID (to find the session to edit), and parameters to update
        //changing parts of a session
        return await update();
    }

}

async function fetch(userID){
    return await Session.find(userData);
}

async function add(sessionDetails){
    //there's no check for a prexisting session, as the user can add duplicates if they want to
    const newSession = new Session(sessionDetails);
    newSession.save();
}

async function update(sessionDetails){
    try {
        //Extract the id from the sessionDetails object
        const { id, ...updateData } = sessionDetails;

        //If no ID was given, throw an error
        if (!id) {
            throw new Error("Session ID is required for updating.");
        }

        // Perform the update operation
        const updatedSession = await Session.findOneAndUpdate(
            { _id: id },           // Filter by ID
            { $set: updateData },  // Update the document with new details
            { new: true }          // Return the updated document
        );

        // If no document was found, throw an error
        if (!updatedSession) {
            throw new Error(`Session with ID ${id} not found.`);
        }

        //Console statement for debug
        console.log('Session successfully updated:', updatedSession);
        return updatedSession; // Return the updated session

    } catch (error) {
        //Console statement for debug
        console.error('Error updating session:', error.message);
        throw error;
    }
}

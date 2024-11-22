'use server'
import dbConnect from '@/lib/db'
import Course from '@/models/Course';

export default async function handleCourse (req, userData){
    await dbConnect(); //we can't rely on the same connection all the time, learning things as we go
    switch (req){
        case "GET": //retrieving information related to the course
            return await fetch(userData); 
        case "POST": //adding a new course to the database
            return await add(userData);
        case "PUT": //updating or adding information to the course document
            return await update(userData);
    }       

}

async function fetch (userData){ 
    let response = await Course.find(userData); //takes an object ID of a user, and returns all of the courses under that user
    return response;
}

async function add (userData){ //takes in a prebuilt course object to create new data from
    try {
        const existingCourse = await Course.findOne({name: userData.name}); //find the course if exists, ifi t does, throw error
        if(existingCourse){
            throw new Error('This course has already been added.');
        }
        const newCourse = new Course(userData);
        newCourse.save();
    } catch (error) {
        console.error('Preexisting course', error);
        throw error;
    }
}

async function update (id, userData){
    try {
        const result = await Course.updateOne({ _id: mongoose.Types.ObjectId(id) }, userData);
        return result;
    } catch (error) {
        console.error('Error updating course:', error);
        throw error;
    }
}

export async function getUserCourses(createdBy) {
    await dbConnect();
    try {
        const courses = await Course.find({ createdBy }).lean(); 
        // need to convert document to plan object because we are not using built-in API routes...
        return courses.map(course => ({
            ...course,
            _id: course._id.toString(),
        }));
    } catch (error) {
        console.error("Error getting courses:", error);
        throw new Error("Failed to get courses");
    }
}
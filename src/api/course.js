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
    console.log('Fetching courses with:', userData);
    let response = await Course.find(userData);
    // Log the full document structure
    console.log('Course document structure:', JSON.stringify(response[0], null, 2));
    return response;
}

async function add (userData){ 
    try {
        console.log('Adding course with data:', userData); // Debug log
        
        const existingCourse = await Course.findOne({
            name: userData.name,
            username: userData.username,
            term: userData.term,
            year: userData.year
        });
        
        if(existingCourse){
            throw new Error('This course has already been added.');
        }

        // Explicitly create course with all fields
        const newCourse = new Course({
            name: userData.name,
            description: userData.description,
            term: userData.term,
            year: Number(userData.year), // Ensure year is a number
            username: userData.username
        });

        console.log('About to save course:', newCourse); // Debug log
        await newCourse.save();
        console.log('Saved course:', newCourse); // Debug log
        return newCourse;
    } catch (error) {
        console.error('Error in add function:', error);
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

export async function getUserCourses(user) {
    await dbConnect();
    try {
        // Look for courses with either createdBy or username matching
        const courses = await Course.find({ 
            $or: [
                { createdBy: user },
                { username: user }
            ]
        }).lean(); 

        // Make sure we're including all fields in the returned data
        return courses.map(course => ({
            ...course,
            _id: course._id.toString(),
            year: course.year // Explicitly include year
        }));
    } catch (error) {
        console.error("Error getting courses:", error);
        throw new Error("Failed to get courses");
    }
}
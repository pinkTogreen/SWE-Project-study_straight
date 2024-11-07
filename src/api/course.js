import dbConnect from '@/lib/db'


/*

adding, updating, and removing courses

*/

export default async function handleCourseReq (req, userData){
    await dbConnect(); //we can't rely on the same connection all the time, learning things as we go

    if (req.method === 'GET') {//retrieving information related to the course
        return await fetchCourseInfo(userData);
    }

    else if (req.method === 'POST'){ //adding a new course to the database
        return await addCourse(userData);
    }

    else if (req.method === 'PUT'){ //updating or adding information to the course document
        return await updateCourseInfo(userData);
    }

}
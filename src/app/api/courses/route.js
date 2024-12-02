import { connectDB } from '@/lib/mongodb';
import Course from '@/models/Course';
import { NextResponse } from 'next/server';

export async function GET(req) {
    try {
        await connectDB();
        const { searchParams } = new URL(req.url);
        const username = searchParams.get('username');

        if (!username) {
            return NextResponse.json(
                { error: "Username is required" },
                { status: 400 }
            );
        }

        const courses = await Course.find({ username }).select('name description term year username _id');
        console.log('Found courses:', courses); // Debug log
        return NextResponse.json(courses);

    } catch (error) {
        console.error("Error fetching courses:", error);
        return NextResponse.json(
            { error: "An error occurred while fetching courses" },
            { status: 500 }
        );
    }
}

export async function POST(req) {
    try {
        await connectDB();
        const courseData = await req.json();
        
        console.log('Received course data:', courseData); // Debug log
        
        // Ensure year is a number
        const courseToSave = {
            ...courseData,
            year: parseInt(courseData.year, 10)
        };

        const existingCourse = await Course.findOne({
            name: courseToSave.name,
            username: courseToSave.username,
            term: courseToSave.term,
            year: courseToSave.year
        });

        if (existingCourse) {
            return NextResponse.json(
                { error: "This course has already been added." },
                { status: 400 }
            );
        }

        console.log('Saving course:', courseToSave); // Debug log
        const newCourse = await Course.create(courseToSave);
        console.log('Saved course:', newCourse); // Debug log
        
        return NextResponse.json(newCourse, { status: 201 });

    } catch (error) {
        console.error("Error creating course:", error);
        return NextResponse.json(
            { error: "An error occurred while creating the course" },
            { status: 500 }
        );
    }
} 
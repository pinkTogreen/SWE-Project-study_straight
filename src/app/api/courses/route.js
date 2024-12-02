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

        const courses = await Course.find({ username });
        return NextResponse.json(courses);

    } catch (error) {
        console.error("Error fetching courses:", error);
        return NextResponse.json(
            { error: "An error occurred while fetching courses" },
            { status: 500 }
        );
    }
} 
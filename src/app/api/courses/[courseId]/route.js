import { connectDB } from '@/lib/mongodb';
import Course from '@/models/Course';
import { NextResponse } from 'next/server';

export async function DELETE(req, { params }) {
    try {
        await connectDB();
        const { courseId } = params;

        const deletedCourse = await Course.findByIdAndDelete(courseId);

        if (!deletedCourse) {
            return NextResponse.json(
                { error: "Course not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: "Course deleted successfully" },
            { status: 200 }
        );

    } catch (error) {
        console.error("Error deleting course:", error);
        return NextResponse.json(
            { error: "An error occurred while deleting the course" },
            { status: 500 }
        );
    }
} 
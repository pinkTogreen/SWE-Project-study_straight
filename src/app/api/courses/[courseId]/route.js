import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Course from '@/models/Course';

export async function DELETE(request, { params }) {
    try {
        await dbConnect();
        const { courseId } = params;
        
        const deletedCourse = await Course.findByIdAndDelete(courseId);
        
        if (!deletedCourse) {
            return NextResponse.json(
                { error: 'Course not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: 'Course deleted successfully' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error deleting course:', error);
        return NextResponse.json(
            { error: 'Failed to delete course' },
            { status: 500 }
        );
    }
} 
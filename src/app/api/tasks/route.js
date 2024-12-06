import { connectDB } from '@/lib/mongodb';
import Task from '@/models/Task';
import { NextResponse } from 'next/server';

// Handle GET, POST, PUT, DELETE for tasks
export async function GET(req) {
    try {
        await connectDB();
        console.log('Connected to MongoDB');

        let url = new URL(req.url);
        let params = new URLSearchParams(url.searchParams)
        let username = params.get('username');

        const tasks = await Task.find({ user: username });
       
        if (tasks.length === 0) {
            return NextResponse.json({ error: 'No tasks found for this user' }, { status: 404 });
        }

        return NextResponse.json(tasks, { status: 200 });
    } catch (error) {
        console.error('Error retrieving tasks:', error);
        return NextResponse.json(
            { error: 'An error occurred while fetching tasks' },
            { status: 500 }
        );
    }
}

export async function POST(req) {
    try {
        await connectDB();
        const taskData = await req.json();
        console.log('Task data received:', taskData);

        // Create new task from the request body
        const newTask = new Task(taskData);

        await newTask.save();
        console.log('New task saved:', newTask);

        return NextResponse.json({ success: true, task: newTask }, { status: 201 });
    } catch (error) {
        console.error('Error adding task:', error);
        return NextResponse.json(
            { error: 'An error occurred while adding the task' },
            { status: 500 }
        );
    }
}

export async function PUT(req) {
    try {
        await connectDB();
        const { taskId, updateData } = await req.json();
        console.log('Updating task:', taskId);

        const updatedTask = await Task.findByIdAndUpdate(taskId, updateData, {
            new: true,
        });

        if (!updatedTask) {
            return NextResponse.json({ error: 'Task not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, task: updatedTask }, { status: 200 });
    } catch (error) {
        console.error('Error updating task:', error);
        return NextResponse.json(
            { error: 'An error occurred while updating the task' },
            { status: 500 }
        );
    }
}

export async function DELETE(req) {
    try {
        await connectDB();
        const { taskId } = await req.json();
        console.log('Deleting task:', taskId);

        const deletedTask = await Task.findByIdAndDelete(taskId);

        if (!deletedTask) {
            return NextResponse.json({ error: 'Task not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: 'Task deleted successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error deleting task:', error);
        return NextResponse.json(
            { error: 'An error occurred while deleting the task' },
            { status: 500 }
        );
    }
}

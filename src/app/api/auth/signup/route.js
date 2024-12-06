import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';
import { NextResponse } from 'next/server';
// GET: Check if a username already exists
export async function GET(req) {
    try {
        await connectDB();
        console.log('Connected to MongoDB');

        let url = new URL(req.url);
        let params = new URLSearchParams(url.searchParams)
        let username = params.get('username');

        const user = await User.findOne({ username });
        console.log('User found:', !!user);

        if (user) {
            return NextResponse.json(
                { message: "This username already exists.", exists: true },
                { status: 400 } // Bad request because the username exists
            );
        }

        return NextResponse.json(
            { message: "This username is available."},
            { status: 200 } // OK, username is available
        );
    } catch (error) {
        console.error('Error checking username:', error);
        return NextResponse.json(
            { error: 'An error occurred while checking the username' },
            { status: 500 } // Internal server error
        );
    }
}

// POST: Add a new user
export async function POST(req) {
    try {
        const userData = await req.json();
        console.log('Adding new user:', userData.username);

        await connectDB();
        console.log('Connected to MongoDB');

        // Check if the username already exists
        const existingUser = await User.findOne({ username: userData.username });
        if (existingUser) {
            return NextResponse.json(
                { error: "Username already taken" },
                { status: 400 } // Bad request
            );
        }

        // Create a new user and save to the database
        const newUser = new User(userData);
        await newUser.save();
        console.log('User successfully added:', newUser);

        return NextResponse.json(
            { success: true, user: newUser },
            { status: 201 } // Created
        );
    } catch (error) {
        console.error('Error adding user:', error);
        return NextResponse.json(
            { error: 'An error occurred while adding the user' },
            { status: 500 } // Internal server error
        );
    }
}

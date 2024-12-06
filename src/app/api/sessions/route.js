import { connectDB } from '@/lib/mongodb';
import Session from '@/models/Session';
import { NextResponse } from 'next/server';

// GET: Fetch all sessions for a specific user
export async function GET(req) {
    try {
        await connectDB();
        const { username } = await req.json();
        console.log('Fetching sessions for user:', username);

        
        console.log('Connected to MongoDB');

        const sessions = await Session.find({ user: username });
        console.log('Sessions fetched:', sessions);

        if (!sessions.length) {
            return NextResponse.json({ error: 'No sessions found for the user' }, { status: 404 });
        }

        return NextResponse.json({ success: true, sessions }, { status: 200 });
    } catch (error) {
        console.error('Error fetching sessions:', error);
        return NextResponse.json(
            { error: 'An error occurred while fetching sessions' },
            { status: 500 }
        );
    }
}

// POST: Add a new session
export async function POST(req) {
    try {
        await connectDB();
        const sessionDetails = await req.json();
        console.log('Adding new session:', sessionDetails);
        
        console.log("session", sessionDetails);

        const newSession = new Session(sessionDetails);
        await newSession.save();
        console.log('Session successfully added:', newSession);

        return NextResponse.json({ success: true, session: newSession }, { status: 201 });
    } catch (error) {
        console.error('Error adding session:', error);
        return NextResponse.json(
            { error: 'An error occurred while adding the session' },
            { status: 500 }
        );
    }
}

// PUT: Update an existing session
export async function PUT(req) {
    try {
        const { sessionId, updateData } = await req.json();
        console.log('Updating session:', sessionId);

        await connectDB();
        console.log('Connected to MongoDB');

        const updatedSession = await Session.findByIdAndUpdate(
            sessionId, // Filter by session ID
            { $set: updateData }, // Update the session details
            { new: true } // Return the updated session
        );

        if (!updatedSession) {
            return NextResponse.json({ error: 'Session not found' }, { status: 404 });
        }

        console.log('Session successfully updated:', updatedSession);
        return NextResponse.json({ success: true, session: updatedSession }, { status: 200 });
    } catch (error) {
        console.error('Error updating session:', error);
        return NextResponse.json(
            { error: 'An error occurred while updating the session' },
            { status: 500 }
        );
    }
}

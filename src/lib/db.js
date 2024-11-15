import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
	throw new Error(
		'Please define the MONGODB_URI environment variable inside .env.local'
	)
}

let cached = global.mongoose

if (!cached) {
	cached = global.mongoose = { conn: null, promise: null }
}

async function dbConnect() {
	try {
		if (cached.conn) {
			return cached.conn
		}

		if (!cached.promise) {
			const opts = {
				bufferCommands: false,
			}

			cached.promise = mongoose.connect(MONGODB_URI, opts)
				.then((mongoose) => {
					console.log('Successfully connected to MongoDB')
					return mongoose
				})
		}

		cached.conn = await cached.promise
		return cached.conn
	} catch (error) {
		console.error('MongoDB connection error:', error)
		cached.promise = null
		throw error
	}
}

export default dbConnect

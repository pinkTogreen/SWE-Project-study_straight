//specifies document contents for courses
import mongoose from 'mongoose'

const courseSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
    description: {
		type: String, //a description of the course, if needed
	},

    //semester information
    term: {
		type: String,
        enum: ['Fall', 'Spring', 'Summer'],
		required: true,
	},
    year: {
		type: Number, //must be a number
		required: true,
	},

})

export default mongoose.models.Course || mongoose.model('Course', courseSchema)

//specifies document contents for courses
import mongoose from 'mongoose'

const courseSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
    description: {
		type: String,
		required: true,
	},

    //semester information
    term: {
		type: String,
		required: true,
	},
    username: {
		type: String,
		required: true,
	},

})

export default mongoose.models.Course || mongoose.model('Course', courseSchema)

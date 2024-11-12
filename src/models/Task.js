//Specifies document contents for tasks
import mongoose from 'mongoose'

const taskSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
    priority:{
        type: String,
        enum:["LOW", "MED", "HIGH"],
    },
	description: {
		type: String,
	},
    date: {
        type: String,
        required: true
    },
    completed:{
        type: Boolean,
        required: true
    },
    userId: { // Who is the task associated with?
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', //referencing the course schema
    },
    courseId: { //Which course is the task associated with?
        // type: mongoose.Schema.Types.ObjectId,
        type: String,
        // ref: 'Course', //referencing the course schema
    },
})

export default mongoose.models.Task || mongoose.model('Task', taskSchema)

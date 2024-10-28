//Specifies document contents for tasks
import mongoose from 'mongoose'

const taskSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
	},
    date: {
        date: {type: Int8Array}, //contains month, day, year
        time: {type: Int8Array},
    },
    status:{
        type: String,
        required: true,
    },
})

export default mongoose.models.Task || mongoose.model('Task', taskSchema)

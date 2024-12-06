//specifies document contents for sessions
import mongoose from 'mongoose'

const sessSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	Notes: {
		type: String,
        default: '',
	},
    date: {
        type: Date,
        required: true
    },
    duration: {
		type: Number,
	},
    completed:{
        type: Boolean,
        default: false,
    },
    tasks: [ // What tasks are the user trying to complete during the session?
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Task', // Referencing the Task schema
        },
    ],
    user: {
        type: String,
        requred: true
    },
    // userId: { // Who is the session associated with?
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User', // Referencing the Task schema
    // },
})

export default mongoose.models.Session || mongoose.model('Session', sessSchema)

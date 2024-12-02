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
    year: {
        type: Number,
        required: true,
    },
    username: {
		type: String,
		required: true,
	},

}, { 
    versionKey: false // This will prevent the __v field from being added
});

// Add this to see what's happening during save
courseSchema.pre('save', function(next) {
    console.log('Saving course with data:', this.toObject());
    next();
});

// Clear the model if it exists to prevent schema changes from being ignored
mongoose.models = {};

export default mongoose.model('Course', courseSchema);

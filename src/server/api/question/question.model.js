// load the packages
import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';

var Schema = mongoose.Schema;

// schema
var QuestionModel = new Schema({
	category: { type: Number, required: true },
	approved: { type: Boolean, default: false },
	
});

// export the schema
export default mongoose.model('Question', QuestionModel);
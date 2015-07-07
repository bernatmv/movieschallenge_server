// load the packages
import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';
import random from 'mongoose-random';

var Schema = mongoose.Schema;

// schema
var QuestionModel = new Schema({
	category: { type: Number, required: true },
	approved: { type: Number, default: 0 },
	difficulty: { type: Number, default: 1 },
	quote: { type: String, required: true },
	correctAnswer: { type: String, required: true },
	otherAnswers: [String],
}).index({ category: 1, approved: -1, difficulty: -1 });

QuestionModel.plugin(random);

// export the schema
export default mongoose.model('Question', QuestionModel);

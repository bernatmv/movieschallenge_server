// load the packages
import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';

var Schema = mongoose.Schema;

// schema
var QuestionModel = new Schema({
});

// export the schema
export default mongoose.model('Question', QuestionModel);
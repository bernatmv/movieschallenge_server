// load the packages
import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';

var Schema = mongoose.Schema;

// schema
var FunFactModel = new Schema({
	text: { type: String, required: true },
	source: String,	
});

// export the schema
export default mongoose.model('FunFact', FunFactModel);
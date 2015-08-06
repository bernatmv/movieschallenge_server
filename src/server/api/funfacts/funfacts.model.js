// load the packages
import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';
import random from 'mongoose-random';

var Schema = mongoose.Schema;

// schema
var FunFactModel = new Schema({
	text: { type: String, required: true },
	source: String,
});

FunFactModel.plugin(random);

// export the schema
export default mongoose.model('FunFact', FunFactModel);

// load the packages
import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';

var Schema = mongoose.Schema;

// schema
var GameModel = new Schema({
	turn: { type: Number, min: 1, required: true },
	players: {
		challenger: { username: String, categoriesProgress: [Number], questionsAnswered: [Schema.Types.ObjectId] },
		challenged: { username: String, categoriesProgress: [Number], questionsAnswered: [Schema.Types.ObjectId] },
	},
	plays: [],
	thisTurn: String,
	ended: { type: Boolean, required: true },
	lastPlay: { type: Date },
	winner: String,
	creator: String,
	challenger: String,
	challenged: String,
}).index({ lastPlay: -1, ended: 1, thisTurn: 1, creator: 1, challenger: 1, challenged: 1 });

// export the schema
export default mongoose.model('Game', GameModel);

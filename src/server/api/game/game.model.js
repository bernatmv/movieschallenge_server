// load the packages
import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';

var Schema = mongoose.Schema;

// schema
var GameModel = new Schema({
});

// export the schema
export default mongoose.model('Game', GameModel);
// load the packages
import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';

var Schema = mongoose.Schema;

// schema
var UserModel = new Schema({
	email: { type: String, required: true },
	username: { type: String, required: true},
	password: { type: String, required: true, select: false },
	admin: { type: Number, default: 0 },
	ranking: { type: Number, default: 0 },
}).index({ username: 1 }, { unique: true });

// hash de password before saving the document
UserModel.pre('save', function(next) {
	var user = this;
	// hash the password only if it's a new user or a modified one
	if (!user.isModified('password')) {
		return next();
	}
	// generate the hash
	bcrypt.hash(user.password, null, null, (err, hash) => {
		if (err) {
			return next(err);
		}
		else {
			user.password = hash;
			next();
		}
	});
});

// methods
UserModel.methods.comparePassword = function(password) {
	var user = this;
	// compare with stored password
	return bcrypt.compareSync(password, user.password);
}

// export the schema
export default mongoose.model('User', UserModel);

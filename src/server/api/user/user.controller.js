import UserModel from './user.model';

class UserController {

  	createUser(req, res) {
		// create model and fill data
		var user = UserController.__fillModel(req);
		// save to db
		user.save((err, reg) => {
			if (err) {
				UserController.__processError(err, res);
			}
			else {
				res.json({ success: true, id: reg._id });
			}
		});
	}

	getUser(req, res) {
		UserModel.findById(req.params.userId, (err, user) => {
			(err) ? res.send(err) : res.json(user);
		});
	}

	getAllUsers(req, res) {
		UserModel.find((err, users) => {
			(err) ? res.send(err) : res.json(users);
		});
	}

	getAuthenticatedUserInfo(req, res) {
		res.send(req.decodedToken);
	}

	static __processError(err, res) {
		// duplicate entry
		if (err.code == 11000) {
			res.json({ success: false, message: 'A register with this id already exists'});
		}
		else {
			res.send(err);
		}
	}

	static __fillModel(req) {
		var user = new UserModel();
		user.email = req.body.email;
		user.username = req.body.username;
		user.password = req.body.password;
		return user;
	}
}

export default UserController;
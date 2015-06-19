import UserModel from './user.model';

class UserController {

	createUser(req, res) {
		var user = new UserModel();
		user.name = req.body.name;
		user.username = req.body.username;
		user.password = req.body.password;
		user.save(function(err) {
			if (err) {
				// duplicate entry
				if (err.code == 11000) {
					return res.json({ success: false, message: 'A register with this id already exists'});
				}
				else {
					return res.send(err);
				}
			}
			// user created
			res.json({ username: req.body.username });
		});
	}

	getUser(req, res) {
		res.send(`retrieve user ${req.params.username} data`);
	}
}

export default UserController;
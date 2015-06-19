import UserModel from './user.model';

class UserController {

	createUser(req, res) {
		res.send('create new user');
	}

	getUser(req, res) {
		res.send(`retrieve user ${req.params.username} data`);
	}
}

export default UserController;
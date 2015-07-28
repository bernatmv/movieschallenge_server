import UserModel from './user.model'
import LoginController from '../authentication/login.controller'

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
                LoginController.__authResponse(res, reg);
				//res.json({ success: true, id: reg._id });
			}
		});
	}

	getUser(req, res) {
		UserModel.findById(req.params.userId, (err, user) => {
			(err) ? res.status(500).send(err) : res.json(UserController.__private(user));
		});
	}

	getAllUsers(req, res) {
		UserModel.find((err, users) => {
//			(err) ? res.status(500).send(err) : res.json(users);
			(err) ? res.status(500).send(err) : res.status(500).json({message: "Not allowed to recover all users"});
		});
	}

	getAuthenticatedUserInfo(req, res) {
		res.send(req.decodedToken);
	}

    getUserInfo(req, res) {
        UserModel.find({ username: req.params.username.toLowerCase()})
            .exec((err, user) => {
		        (err) ? res.status(500).send(err) : res.json(UserController.__private(user));
		    });
	}

	static __processError(err, res) {
		// duplicate entry
		if (err.code == 11000) {
			res.json({ success: false, message: 'A register with this id already exists'});
		}
		else {
			res.status(500).send(err);
		}
	}

	static __fillModel(req) {
		var user = new UserModel();
		user.email = req.body.email;
		user.username = req.body.username.toLowerCase();
		user.password = req.body.password;
		return user;
	}

    static __private(user) {
        user.email = "private";
        return user;
    }
}

export default UserController;

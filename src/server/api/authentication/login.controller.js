import UserModel from '../user/user.model'
import jwt from 'jsonwebtoken';
import config from '../../config/config'

class LoginController {

	authenticate(req, res) {
		UserModel.findOne({
				username: req.body.username
			})
			.select('email username password admin')
			.exec((err, user) => {
				if (err) throw err;
				// no user found that matched the query
				if (!user) {
					res.json({ success: false, message: 'Authentication failed, no user found'});
				}
				else {
					// check if password matches
					if (!user.comparePassword(req.body.password)) {
						res.json({ success: false, message: 'Authentication failed, wrong password'});
					}
					else {
						console.log(user.admin)
						console.log({
							username: user.username,
							email: user.email,
							admin: user.admin
						})
						// create token
						var token = jwt.sign({
							username: user.username,
							email: user.email,
							admin: user.admin
						}, config.secret, {
							expiresInMinutes: 1440,	// expires in 24h
						});
						// send token
						res.json({ success: true, token: token });
					}
				}
			});
	}

	forgotPassword(req, res) {
		// TODO: do it!
		res.send(`user ${req.params.userId} forgot password`);
	}
}

export default LoginController;

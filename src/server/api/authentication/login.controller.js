import UserModel from '../user/user.model';
import jwt from 'jsonwebtoken';
import config from '../../config/config'

class LoginController {

	authenticate(req, res) {
		UserModel.findOne({ 
				username: req.body.username 
			})
			.select('email username password')
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
						// create token
						var token = jwt.sign({
							username: user.username,
							email: user.email,
							admin: false,
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
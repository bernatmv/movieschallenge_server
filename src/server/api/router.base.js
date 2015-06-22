import express from 'express';
import config from '../config/config';
import jwt from 'jsonwebtoken';

class BaseRouter {

	constructor() {
		this.router = express.Router();
	}

	addRoutes() {
		// overwritten by the derivates classes
	}

	getRoutes() {
		return this.router;
	}

	authenticated() {
		this.router.use(this.__tokenAuthentication);
		// return this for piping
		return this;
	}

	__tokenAuthentication(req, res, next) {
		// check header, url or post parameters looking for the token
		var token = req.body.token || req.query.token || req.headers['x-access-token'];
		// decode token
		if (token) {
			// verify secret
			jwt.verify(token, config.secret, (err, decodedToken) => {
				if (err) {
					// Unauthorized
					return res.status(403).send({ success: false, message: 'Failed to authenticate token' });
				}
				else {
					// save decoded token
					req.decodedToken = decodedToken;
					// proceed with routing
					next();
				}
			});
		}
		else {
			// Unauthorized
			return res.status(403).send({ success: false, message: 'No token provided' });
		}
	}
}

export default BaseRouter;
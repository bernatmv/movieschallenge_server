import express from 'express';
import BaseRouter from '../router.base'
import LoginController from './login.controller';

const loginController = new LoginController();

class AuthenticationRouter extends BaseRouter {

	addRoutes() {
		super.addRoutes();
		// add routes
		this.router.post('/authenticate', loginController.authenticate);
		this.router.post('/forgot/:userId', loginController.forgotPassword);
	}
}

export default new AuthenticationRouter();
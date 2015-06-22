import BaseRouter from '../router.base'
import UserController from './user.controller';

const userController = new UserController();

class UserRouter extends BaseRouter {

	addRoutes() {
		super.addRoutes();
		// add routes
		this.router.post('/user', userController.createUser);
		this.router.get('/users', userController.getAllUsers);
		this.router.get('/user/:userId', userController.getUser);
		this.router.get('/me', userController.getAuthenticatedUserInfo);
	}
}

export default new UserRouter();
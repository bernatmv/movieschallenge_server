import express from 'express';
import UserController from './user.controller';

const router = express.Router(),
	userController = new UserController();

router.post('/user/', userController.createUser);
router.get('/user/:userId', userController.getUser);


export default router;
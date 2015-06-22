import express from 'express';
import UserRouter from '../api/user';
import GameRouter from '../api/game';
import QuestionRouter from '../api/question';
//import FunFactsRouter from '../api/funfacts';

const router = express.Router();

// router middleware
router.use((req, res, next) => {
	// authenticate users
	
	// continue with the routing
	next();
});

/*
router.param('username', (req, res, next, username) => {
	// actions
	console.log(`Param: ${username}`);
	// save the param in the request
	req.username = username;
	// proceed with the routing
	next();
});
*/

// creates routes for the app
router.route('/login')
	.get((req, res) => {
		res.json({ message: 'yahoo!', payload: 1 });
	})
	.post((req, res) => {
		res.send('login action method post');
	});

export default function(app) {
	app.use('/api', router);
	app.use('/api', UserRouter);
	app.use('/api', GameRouter);
	app.use('/api', QuestionRouter);
	//app.use('/api', FunFactsRouter);
};
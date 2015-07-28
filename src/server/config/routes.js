import express from 'express';
import UserRouter from '../api/user';
import GameRouter from '../api/game';
import QuestionRouter from '../api/question';
//import FunFactsRouter from '../api/funfacts';
import AuthenticationRouter from '../api/authentication';

// add authentication, controls and routes
AuthenticationRouter.addRoutes();
UserRouter.addRoutes();
// from this point everything needs to be authenticated
GameRouter.authenticated().addRoutes();
QuestionRouter.addRoutes();

// apply routes to the app
export default function(app) {
	app.use('/api', AuthenticationRouter.getRoutes());
	app.use('/api', UserRouter.getRoutes());
	app.use('/api', GameRouter.getRoutes());
	app.use('/api', QuestionRouter.getRoutes());
	//app.use('/api', FunFactsRouter);
};

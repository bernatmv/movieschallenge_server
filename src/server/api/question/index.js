import express from 'express';
import BaseRouter from '../router.base'
import QuestionController from './question.controller';

const questionController = new QuestionController();

class QuestionRouter extends BaseRouter {

	addRoutes() {
		super.addRoutes();
		// add routes
		this.router.get('/questions', questionController.getAllQuestions);
		this.router.get('/question/:questionId', questionController.getQuestion);
		this.router.post('/question', questionController.createQuestion);
		this.router.post('/question/:questionId/answer', questionController.answerQuestion);
	}
}

export default new QuestionRouter();
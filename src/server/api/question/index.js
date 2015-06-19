import express from 'express';
import QuestionController from './question.controller';

const router = express.Router(),
	questionController = new QuestionController();

router.get('/questions', questionController.getAllQuestions);
router.get('/question/:questionId', questionController.getQuestion);
router.post('/question', questionController.createQuestion);
router.post('/question/:questionId/answer', questionController.answerQuestion);

export default router;
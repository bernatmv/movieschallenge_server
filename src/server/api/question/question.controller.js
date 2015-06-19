import QuestionModel from './question.model';

class QuestionController {

	createQuestion(req, res) {
		res.send('create new question');
	}

	getAllQuestions(req, res) {
		res.send('get all questions');
	}
 
 	getQuestion(req, res) {
		res.send(`get question ${req.params.questionId} data`);
	}

	answerQuestion(req, res) {
		res.send(`answer question ${req.params.questionId}`);
	}
}

export default QuestionController;
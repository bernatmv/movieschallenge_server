import QuestionModel from './question.model'

class QuestionController {

  	createQuestion(req, res) {
		// create model and fill data
		var question = QuestionController.__fillModel(req);
		// save to db
		question.save((err, reg) => {
			return (err) ?	res.send(err) : res.json({ success: true, id: reg._id });
		});
	}

	getAllQuestions(req, res) {
		QuestionModel.find((err, questions) => {
			(err) ? res.send(err) : res.json(questions);
		});
	}

    getAllPendingQuestions(req, res) {
		QuestionModel.find({ approved: false })
            .exec((err, questions) => {
    			(err) ? res.send(err) : res.json(questions);
    		});
	}

	getQuestion(req, res) {
		QuestionModel.findById(req.params.questionId, (err, question) => {
			(err) ? res.send(err) : res.json(question);
		});
	}

	answerQuestion(req, res) {
		res.send(`answer question ${req.params.questionId}`);
	}

	static __fillModel(req) {
		var question = new QuestionModel();
		question.category = req.body.category;
		question.difficulty = req.body.difficulty;
		question.quote = req.body.quote;
		question.correctAnswer = req.body.correctAnswer;
		question.otherAnswers = req.body.otherAnswers;
		return question;
	}
}

export default QuestionController;

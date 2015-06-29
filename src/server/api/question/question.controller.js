import QuestionModel from './question.model'

class QuestionController {

  	createQuestion(req, res) {
        // update question
        if (req.body._id) {
            QuestionModel.findById(req.body._id, function(err, question) {
                question.category = req.body.category;
        		question.difficulty = req.body.difficulty;
        		question.quote = req.body.quote;
        		question.correctAnswer = req.body.correctAnswer;
        		question.otherAnswers = req.body.otherAnswers;
                question.approved = req.body.approved;
                // save to db
        		question.save((err, reg) => {
        			return (err) ?	res.send(err) : res.json({ success: true, id: reg._id, message: 'Question updated!' });
        		});
            });
        }
        // create question
        else {
            // create model and fill data
    		var question = QuestionController.__fillModel(req);
    		// save to db
    		question.save((err, reg) => {
    			return (err) ?	res.send(err) : res.json({ success: true, id: reg._id, message: 'Question created!' });
    		});
        }
	}

	getAllQuestions(req, res) {
		QuestionModel.find((err, questions) => {
			(err) ? res.send(err) : res.json(questions);
		});
	}

    getAllPendingQuestions(req, res) {
		QuestionModel.find({ approved: 0 })
            .exec((err, questions) => {
    			(err) ? res.send(err) : res.json(questions);
    		});
	}

	getQuestion(req, res) {
		QuestionModel.findById(req.params.questionId, (err, question) => {
			(err) ? res.send(err) : res.json(question);
		});
	}

    deleteQuestion(req, res) {
		QuestionModel.findById(req.params.questionId).remove().exec();
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

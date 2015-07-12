import GameModel from './game.model'
import QuestionModel from '../question/question.model'

class GameController {

	createGame(req, res) {
		// create model and fill data
		var game = GameController.__fillModel(req);
		// save to db
		game.save((err, reg) => {
			(err) ?	res.status(500).send(err) : res.json({ success: true, id: reg._id });
		});
	}

	getAllGames(req, res) {
		GameModel.find((err, games) => {
			(err) ? res.status(500).send(err) : res.json(games);
		});
	}

	getGame(req, res) {
		GameModel.findById(req.params.gameId, (err, game) => {
			(err) ? res.status(500).send(err) : res.json(game);
		});
	}

	playGame(req, res) {
/*
		// to sync existing databases
		QuestionModel.syncRandom(function (err, result) {
  			console.log(result.updated);
		});
*/
		// get the game
		GameModel.findById(req.params.gameId, (err, game) => {
			if (err) {
				res.send(err);
			}
			else {
				// check that is the user's turn
				if (game.thisTurn === req.decodedToken.username) {
					// get a question from a category not completed, that has been approved,
					// the right difficulty and that has not previously appeared in this match
					var player = (req.decodedToken.username === game.players.challenger.username) ? game.players.challenger : game.players.challenged;
					var categories = GameController.calculateNotCompletedCategories(player.categoriesProgress);
					QuestionModel.findRandom({
							approved: 1,
			                difficulty: 1,
			                category: categories[Math.floor(Math.random()*categories.length)],
							_id: {
								$not: { $in: player.questionsAnswered }
							}
						})
						.limit(1)
			            .exec((err, questions) => {
			    			(err) ? res.send(err) : res.json(questions.pop());
			    		});
				}
				else {
					res.status(500).send({ success: false, message: 'Not the current user turn' });
				}
			}
		});
	}

	answerQuestion (req, res) {
		const currentUser = req.decodedToken.username;
		// get the game
		GameModel.findById(req.params.gameId, (err, game) => {
			if (err) {
				res.status(500).send(err);
			}
			else {
				const whoIsPlayer = (currentUser == game.players.challenger.username) ? 'challenger' : 'challenged';
				const whoIsRival = (currentUser == game.players.challenger.username) ? 'challenged' : 'challenger';
				const rivalPlayer = game.players[whoIsRival].username
				// check that is the user's turn
				if (game.thisTurn === req.decodedToken.username) {
					// get the question being answered
					QuestionModel.findById(req.params.questionId, (err, question) => {
						if (err) {
							res.status(500).send(err);	
						}
						else {
							// if the answer is correct
							if (question.correctAnswer == req.body.answer) {
								// add play to the play array
								games.plays.push({ question: question._id, category: question.category, difficulty: question.difficulty, correct: true });
								// change last play date
								game.lastPlay = new Date();								
								// update category progress
								game.players[whoIsPlayer].categoriesProgress[question.category]++;
								// add question to questions answered
								game.players[whoIsPlayer].questionsAnswered.push(question._id);
								// if needed load the category star question

								// if needed end the game and set the winner
								
							}
							// if the answer is not correct, switch turn
							else {
								// add play to the play array
								game.plays.push({ question: question._id, category: question.category, difficulty: question.difficulty, player: currentUser, correct: false });
								// increment turn
								game.turn++;
								// change turn
								game.thisTurn = rivalPlayer;
								// change last play date
								game.lastPlay = new Date();
								// if the category progress is at 3 and the question is failed (it was a question for the star), reset progress to 0
								if (game.players[whoIsPlayer].categoriesProgress[question.category] == 3) {
									game.players[whoIsPlayer].categoriesProgress[question.category] = 0;
								}
								// add question to questions answered
								game.players[whoIsPlayer].questionsAnswered.push(question._id);
							}
							// save the game and return the updated register
							game.save((err, reg) => {
								(err) ?	res.status(500).send(err) : res.json(reg);
							});
						}
					});
				}
				else {
					res.status(500).send({ success: false, message: 'Not the current user turn' });
				}
			}
		});
		//res.send({ game: req.params.gameId, question: req.params.questionId, correct: req.body.correct, answer: req.body.answer, position: req.body.position });
	}

	static calculateNotCompletedCategories(progress) {
		var categories = [];
		for (var i = 0, j = progress.length; i < j; i++) {
			if (progress[i] < 4) {
				categories.push(i + 1);
			}
		}
		return categories;
	}

	static __fillModel(req) {
		var game = new GameModel();
		game.turn = 1;
		game.players = {
			challenger: {
				username: req.body.challenger,
				categoriesProgress: [0, 0, 0, 0, 0, 0],
				questionsAnswered: [],
			},
			challenged: {
				username: req.body.challenged,
				categoriesProgress: [0, 0, 0, 0, 0, 0],
				questionsAnswered: [],
			},
		};
		game.plays = [];
		game.thisTurn = req.body.challenger;
		game.ended = false;
		game.lastPlay = new Date();
		game.creator = req.decodedToken.username;
		return game;
	}
}

export default GameController;

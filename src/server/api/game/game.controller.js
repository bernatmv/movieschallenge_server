import GameModel from './game.model'
import QuestionModel from '../question/question.model'
import UserModel from '../user/user.model'

class GameController {

	createGame(req, res) {
		if (req.body.challenged != req.body.challenger) {
			// check that the challenged user exists
			UserModel.count({username: req.body.challenged}, function (err, count) {
			    if (count > 0) {
					// create model and fill data
					var game = GameController.__fillModel(req.decodedToken.username, req.body.challenged);
					// save to db
					game.save((err, reg) => {
						(err) ?	res.status(500).send(err) : res.json({ success: true, id: reg._id });
					});
			    }
				else {
					res.send({ success: false, errorCode: 404, message: 'The specified challenged user does not exist in the DB' });
				}
			});
		}
	}

	createGameRandom(req, res) {
		// check that the challenged user exists
		UserModel.findRandom({
				username: {
					$not: { $in: [req.decodedToken.username] }
				}
			})
			.limit(1)
			.exec(function (err, users) {
				var challenged = users.pop();
				// create model and fill data
				var game = GameController.__fillModel(req.decodedToken.username, challenged.username);
				// save to db
				game.save((err, reg) => {
					(err) ?	res.status(500).send(err) : res.json({ success: true, id: reg._id });
				});
			});
	}

	getAllGames(req, res) {
		GameModel
			.find({
				$or: [
					{ challenger: req.decodedToken.username },
					{ challenged: req.decodedToken.username }
				]
			})
			.sort({ ended: 1, lastPlay: -1 })
			.exec((err, games) => {
				(err) ? res.status(500).send(err) : res.json(games);
			});
	}

	getGame(req, res) {
		GameModel.findById(req.params.gameId, (err, game) => {
			(err) ? res.status(500).send(err) : res.json(game);
		});
	}

	playGame(req, res) {
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
			    			(err) ? res.status(500).send(err) : res.json(questions.pop());
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
								game.plays.push({ question: question._id, category: question.category, difficulty: question.difficulty, correct: true });
								// change last play date
								game.lastPlay = new Date();
								// update category progress
								game.players[whoIsPlayer].categoriesProgress[question.category - 1]++;
								// add question to questions answered
								game.players[whoIsPlayer].questionsAnswered.push(question._id);
								// if the progress reach lvl 3, the game will launch a star question the next time it updates state
								// if all the categories progress reach lvl 4, the game will launch the final round the next time it updates state
								// if needed end the game and set the winner
								if (GameController.calculateNotCompletedCategories(game.players[whoIsPlayer].categoriesProgress) === []) {
									game.winner = currentUser;
									game.ended = true;
								}
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
								if (game.players[whoIsPlayer].categoriesProgress[question.category - 1] == 3) {
									game.players[whoIsPlayer].categoriesProgress[question.category - 1] = 0;
								}
								// add question to questions answered
								game.players[whoIsPlayer].questionsAnswered.push(question._id);
							}
							// save the game and return the updated register
							game.markModified('players');
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

	endGameSuccess (req, res) {
		const currentUser = req.decodedToken.username;
		// get the game
		GameModel.findById(req.params.gameId, (err, game) => {
			if (err) {
				res.status(500).send(err);
			}
			else {
				// check that is the user's turn
				if (game.thisTurn === currentUser) {
					// end game
					game.ended = true;
					game.winner = currentUser;
					game.lastPlay = new Date();
					// save modified game
					game.save((err, reg) => {
						(err) ?	res.status(500).send(err) : res.json(reg);
					});
				}
				else {
					res.status(500).send({ success: false, message: 'Not the current user turn' });
				}
			}
		});
	}

	endGameFail (req, res) {
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
				if (game.thisTurn === currentUser) {
					// change turn
					game.turn++;
					game.thisTurn = rivalPlayer;
					game.lastPlay = new Date();
					// save modified game
					game.save((err, reg) => {
						(err) ?	res.status(500).send(err) : res.json(reg);
					});
				}
				else {
					res.status(500).send({ success: false, message: 'Not the current user turn' });
				}
			}
		});
	}

	finalRound (req, res) {
		var questions = [];
		const currentUser = req.decodedToken.username;
		// get the game
		GameModel.findById(req.params.gameId, (err, game) => {
			if (err) {
				res.status(500).send(err);
			}
			else {
				// check that is the user's turn
				if (game.thisTurn === req.decodedToken.username) {
					GameController.getFinalRoundQuestions(questions, GameController.sendFinalRound, res);
				}
				else {
					res.status(500).send({ success: false, message: 'Not the current user turn' });
				}
			}
		});
	}

	static sendFinalRound(questions, res) {
		if (questions.length == 6) {
			res.json(questions);
		}
	}

	static getFinalRoundQuestions(questions, callback, res) {
		for (var category = 1; category <= 6; category++) {
	        QuestionModel.findRandom({
	                approved: 1,
	                difficulty: 3,
	                category: category
	            })
	            .limit(1)
	            .exec((err, results) => {
	                if (err) {
	                	res.status(500).send(err);
	                }
	                else {
	                	questions.push(results.pop());
	                	callback(questions, res);
	                }
	            });
		}
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

	static __fillModel(challenger, challenged) {
		var game = new GameModel();
		game.turn = 1;
		game.players = {
			challenger: {
				username: challenger,
				categoriesProgress: [0, 0, 0, 0, 0, 0],
				questionsAnswered: [],
			},
			challenged: {
				username: challenged,
				categoriesProgress: [0, 0, 0, 0, 0, 0],
				questionsAnswered: [],
			},
		};
		game.plays = [];
		game.thisTurn = challenger;
		game.ended = false;
		game.lastPlay = new Date();
		game.creator = challenger;
		game.challenger = challenger;
		game.challenged = challenged;
		return game;
	}
}

export default GameController;

/*
		// to sync existing databases
		UserModel.syncRandom(function (err, result) {
  			console.log(result.updated);
		});
		QuestionModel.syncRandom(function (err, result) {
  			console.log(result.updated);
		});
*/

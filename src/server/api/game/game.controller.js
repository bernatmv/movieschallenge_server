import GameModel from './game.model'
import QuestionModel from '../question/question.model'

class GameController {

	createGame(req, res) {
		// create model and fill data
		var game = GameController.__fillModel(req);
		// save to db
		game.save((err, reg) => {
			(err) ?	res.send(err) : res.json({ success: true, id: reg._id });
		});
	}

	getAllGames(req, res) {
		GameModel.find((err, games) => {
			(err) ? res.send(err) : res.json(games);
		});
	}

	getGame(req, res) {
		GameModel.findById(req.params.gameId, (err, game) => {
			(err) ? res.send(err) : res.json(game);
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
					QuestionModel.findRandom({
							approved: 1,
			                difficulty: 1,
			                category: { $in: GameController.calculateNotCompletedCategories(player.categoriesProgress) },
							_id: {
								$not: { $in: player.questionsAnswered }
							}
						})
			            .exec((err, questions) => {
			    			(err) ? res.send(err) : res.json(questions.pop());
			    		});
				}
				else {
					res.send({ success: false, message: 'Not the current user turn' });
				}
			}
		});
	}

	static calculateNotCompletedCategories(progress) {
		var categories = [];
		for (var i = 0, j = progress.length; i < j; i++) {
			if (progress[i] < 3) {
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
		return game;
	}
}

export default GameController;

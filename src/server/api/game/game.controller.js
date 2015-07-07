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
		// get the game
		GameModel.findById(req.params.gameId, (err, game) => {
			if (err) {
				res.send(err);
			}
			else {
				console.log(req.decodedToken)
				console.log(game.players.challenger)
				console.log(game.players.challenged)
				console.log(game)
				// check that is the user's turn
				if (game.thisTurn === req.decodedToken.username) {
					// get a question from a category not completed, that has been approved,
					// the right difficulty and that has not previously appeared in this match
					var player = (req.decodedToken.username === game.players.challenger.username) ? game.players.challenger : game.players.challenged;
					QuestionModel.find({
							approved: 1,
			                difficulty: 1,
			                category: { $in: GameController.calculateNotCompletedCategories(player.categoriesProgress) },
							_id: {
								$not: { $in: player.questionsAnswered }
							}
						})
			            .exec((err, questions) => {
			    			(err) ? res.send(err) : res.json(questions);
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
/*
<option value="0">Assign a category</option>
<option value="1">History / Action</option>
<option value="2">Romantic</option>
<option value="3">Fantasy / SiFi</option>
<option value="4">Humor</option>
<option value="5">Family</option>
<option value="6">Other</option>

turn: { type: Number, min: 1, required: true },
players: {
	challenger: { username: String, categoriesProgress: [Number], questionsAnswered: [Schema.Types.ObjectId] },
	challenged: { username: String, categoriesProgress: [Number], questionsAnswered: [Schema.Types.ObjectId] },
},
plays: [],
thisTurn: String,
ended: { type: Boolean, required: true },
lastPlay: { type: Date },
winner: String,
*/
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

import GameModel from './game.model'
import QuestionModel from '../question/game.model'

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
		GameModel.findById(req.params.gameId, (err, game) => {
			(err) ? res.send(err) : res.json(game);
		});
		QuestionModel.find({ approved: 0 })
            .exec((err, questions) => {
    			(err) ? res.send(err) : res.json(questions);
    		});
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

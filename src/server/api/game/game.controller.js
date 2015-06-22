import GameModel from './game.model';

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
		// TODO: do it!
		res.send(`play game ${req.params.gameId} turn`);
	}

	static __fillModel(req) {
		var game = new GameModel();
		game.turn = 1;
		game.players = {
			challenger: {
				id: req.body.challenger,
				categoriesProgress: [0, 0, 0, 0, 0, 0],
				questionsAnswered: [],
			},
			challenged: {
				id: req.body.challenged,
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
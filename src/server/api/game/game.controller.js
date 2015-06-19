import GameModel from './game.model';

class GameController {

	createGame(req, res) {
		res.send('create new game');
	}

	getGame(req, res) {
		res.send(`retrieve game ${req.params.gameId} data`);
	}

	playGame(req, res) {
		res.send(`play game ${req.params.gameId} turn`);
	}
}

export default GameController;

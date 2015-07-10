import BaseRouter from '../router.base'
import GameController from './game.controller';

const gameController = new GameController();

class GameRouter extends BaseRouter {

	addRoutes() {
		super.addRoutes();
		// add routes
		this.router.get('/games', gameController.getAllGames);
		this.router.post('/game', gameController.createGame);
		this.router.get('/game/:gameId', gameController.getGame);
		this.router.get('/game/:gameId/play', gameController.playGame);
		this.router.post('/game/:gameId/answer/:questionId', gameController.answerQuestion);
	}
}

export default new GameRouter();

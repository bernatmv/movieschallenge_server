import express from 'express';
import GameController from './game.controller';

const router = express.Router(),
	gameController = new GameController();

router.post('/game/', gameController.createGame);
router.get('/game/:gameId', gameController.getGame);
router.post('/game/:gameId/play', gameController.playGame);

export default router;
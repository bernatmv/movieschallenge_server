import express from 'express';
import FunFactsController from './funfacts.controller';

const router = express.Router(),
	funfactsController = new FunFactsController();

router.get('/funfacts', funfactsController.getAllFacts);
router.get('/funfact/:factId', funfactsController.getFact);
router.post('/funfact', funfactsController.createFact);

export default router;